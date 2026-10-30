// dist/sync.js - Kinh tế chính trị Mác – Lênin Exhibition Real-Time Room & Leaderboard Sync
(function (global) {
  const BC_NAME = "mln_exhibition_sync_v2";
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

    // Save or update room
    async saveRoom(room) {
      if (!room || !room.code) return false;
      const code = String(room.code).trim();
      room.code = code;

      // Ensure timestamp is strictly higher than any existing state
      let maxExistingTs = 0;
      try {
        const raw = localStorage.getItem("mln_room_" + code);
        if (raw) {
          const ex = JSON.parse(raw);
          maxExistingTs = Math.max(Number(ex.updatedAt) || 0, Number(ex.createdAt) || 0);
        }
      } catch (_) {}

      room.updatedAt = Math.max(Date.now(), maxExistingTs + 100);

      // 1. LocalStorage
      try {
        localStorage.setItem("mln_room_" + code, JSON.stringify(room));
        if (room.status !== "ENDED") {
          localStorage.setItem("mln_active_room", JSON.stringify({ code: code, updatedAt: room.updatedAt }));
        }
      } catch (_) {}

      // 2. BroadcastChannel
      this.broadcast({ type: "ROOM_UPDATE", room });

      // 3. Cloud Relay (ntfy.sh - no 429 rate limit, retains latest message)
      try {
        await fetch("https://ntfy.sh/mln_state_room_" + code, {
          method: "POST",
          headers: { "X-Cache": "yes", "Title": "ROOM_UPDATE" },
          body: JSON.stringify(room)
        });
        if (room.status !== "ENDED") {
          await fetch("https://ntfy.sh/mln_state_active_room", {
            method: "POST",
            headers: { "X-Cache": "yes", "Title": "ACTIVE_ROOM" },
            body: JSON.stringify({ code: code, updatedAt: room.updatedAt })
          });
        }
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

      // 2. Check Cloud Relay
      try {
        const res = await fetch("https://ntfy.sh/mln_state_room_" + code + "/json?poll=1", { cache: "no-store" });
        if (res.ok) {
          const text = (await res.text()).trim();
          if (text) {
            const lines = text.split("\n").filter(Boolean);
            let cloudRoom = null;
            let maxTs = 0;
            for (const line of lines) {
              try {
                const item = JSON.parse(line);
                const parsed = typeof item.message === "string" ? JSON.parse(item.message) : item.message;
                if (parsed && String(parsed.code).trim() === code) {
                  const ts = Number(parsed.updatedAt) || Number(parsed.createdAt) || (Number(item.time) * 1000) || 0;
                  if (ts >= maxTs) {
                    maxTs = ts;
                    cloudRoom = parsed;
                  }
                }
              } catch (_) {}
            }

            if (cloudRoom) {
              const localTs = localRoom ? (Number(localRoom.updatedAt) || Number(localRoom.createdAt) || 0) : 0;
              if (!localRoom || maxTs >= localTs) {
                try { localStorage.setItem("mln_room_" + code, JSON.stringify(cloudRoom)); } catch (_) {}
                return cloudRoom;
              } else {
                return localRoom;
              }
            }
          }
        }
      } catch (_) {}

      return localRoom;
    },

    // Get active room (used when Admin opens dashboard)
    async getActiveRoom() {
      // 1. Check LocalStorage
      let activeCode = null;
      try {
        const raw = localStorage.getItem("mln_active_room");
        if (raw) activeCode = JSON.parse(raw).code;
      } catch (_) {}
      if (activeCode) {
        const r = await this.getRoom(activeCode);
        if (r && r.status !== "ENDED") return r;
      }

      // 2. Check Cloud Relay
      try {
        const res = await fetch("https://ntfy.sh/mln_state_active_room/json?poll=1", { cache: "no-store" });
        if (res.ok) {
          const text = (await res.text()).trim();
          if (text) {
            const lines = text.split("\n").filter(Boolean);
            let cloudActive = null;
            let maxTs = 0;
            for (const line of lines) {
              try {
                const item = JSON.parse(line);
                const parsed = typeof item.message === "string" ? JSON.parse(item.message) : item.message;
                if (parsed) {
                  const ts = Number(parsed.updatedAt) || (Number(item.time) * 1000) || 0;
                  if (ts >= maxTs) {
                    maxTs = ts;
                    cloudActive = parsed;
                  }
                }
              } catch (_) {}
            }
            if (cloudActive && cloudActive.code) {
              const r = await this.getRoom(cloudActive.code);
              if (r && r.status !== "ENDED") return r;
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
      let maxExistingTs = 0;
      try {
        const raw = localStorage.getItem("mln_room_" + code);
        if (raw) {
          const ex = JSON.parse(raw);
          maxExistingTs = Math.max(Number(ex.updatedAt) || 0, Number(ex.createdAt) || 0);
        }
      } catch (_) {}

      const endedRoom = { code, status: "ENDED", updatedAt: Math.max(Date.now(), maxExistingTs + 100) };

      try {
        localStorage.removeItem("mln_active_room");
        localStorage.setItem("mln_room_" + code, JSON.stringify(endedRoom));
      } catch (_) {}

      this.broadcast({ type: "ROOM_CLOSED", code, room: endedRoom });

      try {
        await fetch("https://ntfy.sh/mln_state_room_" + code, {
          method: "POST",
          headers: { "X-Cache": "yes", "Title": "ROOM_CLOSED" },
          body: JSON.stringify(endedRoom)
        });
        await fetch("https://ntfy.sh/mln_state_active_room", {
          method: "POST",
          headers: { "X-Cache": "yes", "Title": "ACTIVE_ROOM_CLOSED" },
          body: JSON.stringify({ code: null, status: "ENDED", updatedAt: endedRoom.updatedAt })
        });
      } catch (_) {}
    },

    // Retrieve leaderboard
    async getLeaderboard() {
      let localBoard = [];
      try {
        const raw = localStorage.getItem("mln_leaderboard");
        if (raw) localBoard = JSON.parse(raw);
      } catch (_) {}

      try {
        const res = await fetch("https://ntfy.sh/mln_state_leaderboard/json?poll=1", { cache: "no-store" });
        if (res.ok) {
          const text = (await res.text()).trim();
          if (text) {
            const lines = text.split("\n").filter(Boolean);
            const last = JSON.parse(lines[lines.length - 1]);
            const cloudBoard = typeof last.message === "string" ? JSON.parse(last.message) : last.message;
            if (Array.isArray(cloudBoard)) {
              if (cloudBoard.length >= localBoard.length) {
                try { localStorage.setItem("mln_leaderboard", JSON.stringify(cloudBoard)); } catch (_) {}
                return cloudBoard;
              }
            }
          }
        }
      } catch (_) {}

      return localBoard;
    },

    // Save leaderboard
    async saveLeaderboard(board) {
      if (!Array.isArray(board)) return;

      try {
        localStorage.setItem("mln_leaderboard", JSON.stringify(board));
      } catch (_) {}

      this.broadcast({ type: "LEADERBOARD_UPDATE", leaderboard: board });

      try {
        await fetch("https://ntfy.sh/mln_state_leaderboard", {
          method: "POST",
          headers: { "X-Cache": "yes" },
          body: JSON.stringify(board)
        });
      } catch (_) {}
    },

    // Clear leaderboard
    async clearLeaderboard() {
      try {
        localStorage.setItem("mln_leaderboard", "[]");
      } catch (_) {}

      this.broadcast({ type: "LEADERBOARD_UPDATE", leaderboard: [] });

      try {
        await fetch("https://ntfy.sh/mln_state_leaderboard", {
          method: "POST",
          headers: { "X-Cache": "yes" },
          body: "[]"
        });
      } catch (_) {}
    }
  };

  global.RoomSync = RoomSync;
})(typeof window !== "undefined" ? window : globalThis);
