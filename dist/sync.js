// dist/sync.js - Kinh tế chính trị Mác – Lênin Exhibition Real-Time Room & Leaderboard Sync
(function (global) {
  const BC_NAME = "mln_exhibition_sync_v2";
  const KVDB_BUCKET = "ADkjsg26cP3urgwo94ctcg";
  const KVDB_BASE = "https://kvdb.io/" + KVDB_BUCKET + "/";

  const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel(BC_NAME) : null;
  const subscribers = new Set();

  function dispatch(event) {
    subscribers.forEach((cb) => {
      try { cb(event); } catch (e) { console.warn("Sync listener error:", e); }
    });
  }

  if (channel) {
    channel.onmessage = (e) => {
      if (e.data) dispatch(e.data);
    };
  }

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (!e.key) return;
      if (e.key.startsWith("mln_room_") || e.key === "mln_active_room" || e.key === "mln_leaderboard") {
        try {
          const val = e.newValue ? JSON.parse(e.newValue) : null;
          dispatch({ type: "STORAGE_CHANGE", key: e.key, value: val });
        } catch (_) {}
      }
    });
  }

  // Safe fetch helper with AbortController timeout to guarantee UI never freezes
  async function safeFetch(url, options = {}, timeoutMs = 2500) {
    if (typeof fetch === "undefined") return null;
    try {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      let timer = null;
      if (controller) {
        timer = setTimeout(() => {
          try { controller.abort(); } catch (_) {}
        }, timeoutMs);
      }
      const opts = { ...options, cache: "no-store" };
      if (controller) opts.signal = controller.signal;
      const res = await fetch(url, opts);
      if (timer) clearTimeout(timer);
      return res;
    } catch (_) {
      return null;
    }
  }

  const RoomSync = {
    subscribe(callback) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },

    broadcast(data) {
      if (channel) {
        try { channel.postMessage(data); } catch (_) {}
      }
    },

    // Save or update room (Admin created room or player joined)
    async saveRoom(room) {
      if (!room || !room.code) return false;
      const code = String(room.code).trim();
      room.code = code;

      // Dedup players by trimmed name
      if (Array.isArray(room.players)) {
        const seen = new Set();
        const clean = [];
        room.players.forEach(p => {
          if (p && p.name && !seen.has(p.name.trim())) {
            seen.add(p.name.trim());
            clean.push(p);
          }
        });
        room.players = clean;
      }

      // Ensure timestamp is strictly increasing
      let maxExistingTs = 0;
      try {
        const raw = localStorage.getItem("mln_room_" + code);
        if (raw) {
          const ex = JSON.parse(raw);
          maxExistingTs = Math.max(Number(ex.updatedAt) || 0, Number(ex.createdAt) || 0);
        }
      } catch (_) {}

      room.updatedAt = Math.max(Date.now(), maxExistingTs + 100);

      // 1. Instantly save to LocalStorage (0ms)
      try {
        localStorage.setItem("mln_room_" + code, JSON.stringify(room));
        if (room.status !== "ENDED") {
          localStorage.setItem("mln_active_room", JSON.stringify({ code: code, status: room.status, updatedAt: room.updatedAt }));
        }
      } catch (_) {}

      // 2. Broadcast to other tabs immediately
      this.broadcast({ type: "ROOM_UPDATE", room });

      // 3. Fast Cloud Relay via kvdb.io (cross-device: phone <-> laptop)
      const payload = JSON.stringify(room);
      const cloudPromises = [
        safeFetch(KVDB_BASE + "mln_room_" + code, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload
        }, 2000)
      ];

      if (room.status !== "ENDED") {
        cloudPromises.push(
          safeFetch(KVDB_BASE + "mln_active_room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code, status: room.status, updatedAt: room.updatedAt })
          }, 2000)
        );
      }

      // Wait up to 500ms for network, then resolve so UI is always buttery smooth
      try {
        await Promise.race([
          Promise.allSettled(cloudPromises),
          new Promise(r => setTimeout(r, 500))
        ]);
      } catch (_) {}

      return true;
    },

    // Retrieve room
    async getRoom(code) {
      if (!code) return null;
      code = String(code).trim();

      // 1. Check LocalStorage first (instant)
      let localRoom = null;
      try {
        const raw = localStorage.getItem("mln_room_" + code);
        if (raw) localRoom = JSON.parse(raw);
      } catch (_) {}

      // 2. Fetch from Cloud Relay
      try {
        const res = await safeFetch(KVDB_BASE + "mln_room_" + code, { method: "GET" }, 2000);
        if (res && res.ok) {
          const cloudRoom = await res.json();
          if (cloudRoom && String(cloudRoom.code).trim() === code) {
            const cloudTs = Number(cloudRoom.updatedAt) || Number(cloudRoom.createdAt) || 0;
            const localTs = localRoom ? (Number(localRoom.updatedAt) || Number(localRoom.createdAt) || 0) : 0;

            if (!localRoom || cloudTs >= localTs) {
              try { localStorage.setItem("mln_room_" + code, JSON.stringify(cloudRoom)); } catch (_) {}
              return cloudRoom;
            } else {
              return localRoom;
            }
          }
        }
      } catch (_) {}

      return localRoom;
    },

    // Get active room (used when Admin opens dashboard)
    async getActiveRoom() {
      // 1. Check LocalStorage first
      let activeCode = null;
      try {
        const raw = localStorage.getItem("mln_active_room");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.status !== "ENDED") activeCode = parsed.code;
        }
      } catch (_) {}

      if (activeCode) {
        const r = await this.getRoom(activeCode);
        if (r && r.status !== "ENDED") return r;
      }

      // 2. Check Cloud Relay
      try {
        const res = await safeFetch(KVDB_BASE + "mln_active_room", { method: "GET" }, 2000);
        if (res && res.ok) {
          const activeObj = await res.json();
          if (activeObj && activeObj.code && activeObj.status !== "ENDED") {
            const r = await this.getRoom(activeObj.code);
            if (r && r.status !== "ENDED") {
              try { localStorage.setItem("mln_active_room", JSON.stringify(activeObj)); } catch (_) {}
              return r;
            }
          }
        }
      } catch (_) {}

      return null;
    },

    // Close or terminate room
    async closeRoom(code) {
      if (!code) return;
      code = String(code).trim();

      const endedRoom = { code, status: "ENDED", updatedAt: Date.now() };

      try {
        localStorage.removeItem("mln_active_room");
        localStorage.setItem("mln_room_" + code, JSON.stringify(endedRoom));
      } catch (_) {}

      this.broadcast({ type: "ROOM_CLOSED", code, room: endedRoom });

      try {
        safeFetch(KVDB_BASE + "mln_room_" + code, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(endedRoom)
        }, 2000);

        safeFetch(KVDB_BASE + "mln_active_room", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: null, status: "ENDED", updatedAt: Date.now() })
        }, 2000);
      } catch (_) {}
    },

    // Retrieve leaderboard
    async getLeaderboard() {
      let localBoard = [];
      let localTs = 0;
      try {
        const raw = localStorage.getItem("mln_leaderboard");
        if (raw) localBoard = JSON.parse(raw);
        localTs = Number(localStorage.getItem("mln_leaderboard_ts")) || 0;
      } catch (_) {}

      try {
        const res = await safeFetch(KVDB_BASE + "mln_leaderboard", { method: "GET" }, 2000);
        if (res && res.ok) {
          const rawCloud = await res.json();
          let cloudBoard = [];
          let cloudTs = 0;

          if (Array.isArray(rawCloud)) {
            cloudBoard = rawCloud;
            cloudTs = cloudBoard.length > 0 ? 1 : 0;
          } else if (rawCloud && typeof rawCloud === "object" && Array.isArray(rawCloud.list)) {
            cloudBoard = rawCloud.list;
            cloudTs = Number(rawCloud.updatedAt) || 0;
          }

          if (cloudTs >= localTs) {
            try {
              localStorage.setItem("mln_leaderboard", JSON.stringify(cloudBoard));
              localStorage.setItem("mln_leaderboard_ts", String(cloudTs));
            } catch (_) {}
            return cloudBoard;
          }
        }
      } catch (_) {}

      return Array.isArray(localBoard) ? localBoard : [];
    },

    // Save leaderboard
    async saveLeaderboard(board) {
      if (!Array.isArray(board)) return;
      const ts = Date.now();
      const payload = { list: board, updatedAt: ts };

      try {
        localStorage.setItem("mln_leaderboard", JSON.stringify(board));
        localStorage.setItem("mln_leaderboard_ts", String(ts));
      } catch (_) {}

      this.broadcast({ type: "LEADERBOARD_UPDATE", leaderboard: board, updatedAt: ts });

      try {
        safeFetch(KVDB_BASE + "mln_leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }, 2000);
      } catch (_) {}
    },

    // Clear leaderboard
    async clearLeaderboard() {
      const ts = Date.now() + 100;
      const payload = { list: [], updatedAt: ts };

      try {
        localStorage.setItem("mln_leaderboard", "[]");
        localStorage.setItem("mln_leaderboard_ts", String(ts));
      } catch (_) {}

      this.broadcast({ type: "LEADERBOARD_UPDATE", leaderboard: [], updatedAt: ts });

      try {
        await safeFetch(KVDB_BASE + "mln_leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }, 2000);
      } catch (_) {}
    }
  };

  global.RoomSync = RoomSync;
})(typeof window !== "undefined" ? window : globalThis);
