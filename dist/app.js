/* THE STATE / Exhibition 01 — content-first canvas exploration game. */
(() => {
  "use strict";

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const titleScreen = document.getElementById("title-screen");
  const gameUi = document.getElementById("game-ui");
  const dialogue = document.getElementById("dialogue");
  const endingScreen = document.getElementById("ending-screen");
  const quitScreen = document.getElementById("quit-screen");
  const prompt = document.getElementById("interaction-prompt");
  const promptText = document.getElementById("prompt-text");
  const zoneName = document.getElementById("zone-name");
  const zoneIndex = document.getElementById("zone-index");
  const statusText = document.getElementById("status-text");
  const evidenceCount = document.getElementById("evidence-count");
  const objectiveText = document.getElementById("objective-text");
  const dialogueTitle = document.getElementById("dialogue-title");
  const dialogueBody = document.getElementById("dialogue-body");
  const dialogueType = document.getElementById("dialogue-type");
  const dialogueNumber = document.getElementById("dialogue-number");
  const dialogueClose = document.getElementById("dialogue-close");
  const miniPlayer = document.querySelector(".mini-player");
  const theoryNote = document.getElementById("theory-note");

  const contentViewer = document.getElementById("content-viewer");
  const viewerKicker = document.getElementById("viewer-kicker");
  const viewerTitle = document.getElementById("viewer-title");
  const viewerPage = document.getElementById("viewer-page");
  const viewerPageTotal = document.getElementById("viewer-page-total");
  const viewerProgressBar = document.getElementById("viewer-progress-bar");
  const viewerSectionLabel = document.getElementById("viewer-section-label");
  const viewerSectionTitle = document.getElementById("viewer-section-title");
  const viewerLead = document.getElementById("viewer-lead");
  const viewerParagraphs = document.getElementById("viewer-paragraphs");
  const viewerImagePlaceholder = document.getElementById("viewer-image-placeholder");
  const viewerImage = document.getElementById("viewer-image");
  const viewerCaption = document.getElementById("viewer-caption");
  const viewerImageCount = document.getElementById("viewer-image-count");
  const viewerPrevImage = document.getElementById("viewer-prev-image");
  const viewerNextImage = document.getElementById("viewer-next-image");
  const viewerNote = document.getElementById("viewer-note");
  const viewerNext = document.getElementById("viewer-next");
  const viewerClose = document.getElementById("viewer-close");

  const imageLightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  const keys = new Set();
  const WORLD = { width: 5300, height: 1400 };
  const CAMERA_ZOOM = 1.24;
  const PLAYER = { radius: 17, speed: 245 };

  function normaliseImage(image) {
    if (typeof image === "string") return { src: image, alt: "Ảnh tư liệu", caption: "" };
    if (!image || typeof image.src !== "string" || !image.src.trim()) return null;
    return {
      src: image.src.trim(),
      alt: typeof image.alt === "string" && image.alt.trim() ? image.alt.trim() : "Ảnh tư liệu",
      caption: typeof image.caption === "string" ? image.caption : ""
    };
  }

  function normaliseSection(section, index) {
    const paragraphs = Array.isArray(section?.paragraphs)
      ? section.paragraphs.filter((paragraph) => typeof paragraph === "string" && paragraph.trim())
      : [];
    const images = Array.isArray(section?.images) ? section.images.map(normaliseImage).filter(Boolean) : [];
    return {
      label: typeof section?.label === "string" && section.label.trim() ? section.label.trim() : `SECTION ${String(index + 1).padStart(2, "0")}`,
      title: typeof section?.title === "string" && section.title.trim() ? section.title.trim() : "Nội dung chương",
      lead: typeof section?.lead === "string" ? section.lead.trim() : "",
      paragraphs: paragraphs.length ? paragraphs : ["Nội dung chi tiết của mục này đang được chuẩn bị."],
      images
    };
  }

  function normaliseChapter(chapter, index) {
    const sections = Array.isArray(chapter?.sections) ? chapter.sections.map(normaliseSection) : [];
    return {
      id: typeof chapter?.id === "string" && chapter.id.trim() ? chapter.id.trim() : `chapter-${index + 1}`,
      code: typeof chapter?.code === "string" && chapter.code.trim() ? chapter.code.trim() : String(index + 1).padStart(2, "0"),
      label: typeof chapter?.label === "string" ? chapter.label.trim() : "ARCHIVE",
      title: typeof chapter?.title === "string" ? chapter.title.trim() : "Chương triển lãm",
      sections: sections.length ? sections : [normaliseSection({}, 0)]
    };
  }

  const rawContent = Array.isArray(window.THE_STATE_CONTENT) ? window.THE_STATE_CONTENT : [];
  const content = rawContent.map(normaliseChapter);
  const contentById = new Map(content.map((chapter) => [chapter.id, chapter]));

  const state = {
    running: false,
    frameRequested: false,
    lastTime: 0,
    time: 0,
    camera: { x: 0, y: 0 },
    player: { x: 220, y: 650 },
    evidence: new Set(),
    viewedPages: new Set(),
    imagesViewed: new Set(),
    currentInteractable: null,
    dialogueOpen: false,
    viewerOpen: false,
    viewerChapter: null,
    viewerPage: 0,
    viewerImage: 0
  };

  const rooms = [
    { id: "base", index: "01", name: "ĐIỀU KIỆN VẬT CHẤT", x: 100, y: 120, w: 1050, h: 1160, color: "#c75b58", label: "THE BASE", artifact: "TƯ LIỆU SẢN XUẤT" },
    { id: "class", index: "02", name: "GIAI CẤP & SỞ HỮU", x: 1450, y: 120, w: 1050, h: 1160, color: "#d3a95f", label: "THE SPLIT", artifact: "GIAI CẤP" },
    { id: "state", index: "03", name: "NHÀ NƯỚC & QUYỀN LỰC", x: 2800, y: 120, w: 1050, h: 1160, color: "#c8c0ae", label: "THE STATE", artifact: "THIẾT CHẾ NHÀ NƯỚC" },
    { id: "revolt", index: "04", name: "MÂU THUẪN & CHUYỂN HÓA", x: 4150, y: 120, w: 1050, h: 1160, color: "#c75b68", label: "THE FAULTLINE", artifact: "CÁCH MẠNG XÃ HỘI" }
  ];

  const walls = [
    { x: 0, y: 0, w: WORLD.width, h: 50 },
    { x: 0, y: WORLD.height - 50, w: WORLD.width, h: 50 },
    { x: 0, y: 0, w: 50, h: WORLD.height },
    { x: WORLD.width - 50, y: 0, w: 50, h: WORLD.height },
    { x: 1150, y: 50, w: 300, h: 510 },
    { x: 1150, y: 760, w: 300, h: 590 },
    { x: 2500, y: 50, w: 300, h: 510 },
    { x: 2500, y: 760, w: 300, h: 590 },
    { x: 3850, y: 50, w: 300, h: 510 },
    { x: 3850, y: 760, w: 300, h: 590 }
  ];

  const interactables = [
    { id: "curator", x: 220, y: 650, radius: 74, kind: "curator", title: "Người lưu trữ", type: "WELCOME", number: "00 / 04", body: "Đây là một tuyến triển lãm có thứ tự. Đi tới từng hiện vật, nhấn E để đọc hồ sơ và xem ảnh. Khi hoàn tất một chương, cổng tiếp theo sẽ mở." },
    { id: "base", x: 625, y: 700, radius: 105, kind: "exhibit", chapterId: "base", title: "Hồ sơ điều kiện vật chất", type: "ARCHIVE 01", number: "01 / 04" },
    { id: "gate-class", x: 1300, y: 650, radius: 105, kind: "gate", requiredEvidence: "base", target: "GIAI CẤP & SỞ HỮU", title: "Cổng chương 02", type: "GATE / 02", number: "02 / 04" },
    { id: "class", x: 1975, y: 700, radius: 105, kind: "exhibit", chapterId: "class", title: "Hồ sơ giai cấp và sở hữu", type: "ARCHIVE 02", number: "02 / 04" },
    { id: "gate-state", x: 2650, y: 650, radius: 105, kind: "gate", requiredEvidence: "class", target: "NHÀ NƯỚC & QUYỀN LỰC", title: "Cổng chương 03", type: "GATE / 03", number: "03 / 04" },
    { id: "state", x: 3325, y: 700, radius: 105, kind: "exhibit", chapterId: "state", title: "Hồ sơ Nhà nước và quyền lực", type: "ARCHIVE 03", number: "03 / 04" },
    { id: "gate-revolt", x: 4000, y: 650, radius: 105, kind: "gate", requiredEvidence: "state", target: "MÂU THUẪN & CHUYỂN HÓA", title: "Cổng chương 04", type: "GATE / 04", number: "04 / 04" },
    { id: "revolt", x: 4675, y: 700, radius: 105, kind: "exhibit", chapterId: "revolt", title: "Hồ sơ mâu thuẫn và chuyển hóa", type: "ARCHIVE 04", number: "04 / 04" },
    { id: "gate-end", x: 5000, y: 1040, radius: 110, kind: "gate", requiredEvidence: "revolt", final: true, title: "Cánh cửa cuối", type: "EXIT / FIELD REPORT", number: "END" }
  ];

  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const exhibitById = new Map(interactables.filter((item) => item.kind === "exhibit").map((item) => [item.id, item]));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resetState() {
    keys.clear();
    state.running = true;
    state.lastTime = performance.now();
    state.time = 0;
    state.player = { x: 220, y: 650 };
    state.camera = { x: 0, y: 0 };
    state.evidence.clear();
    state.viewedPages.clear();
    state.imagesViewed.clear();
    state.currentInteractable = null;
    state.dialogueOpen = false;
    state.viewerOpen = false;
    state.viewerChapter = null;
    state.viewerPage = 0;
    state.viewerImage = 0;
    updateCamera();
    updateUi();
  }

  function start() {
    resetState();
    titleScreen.classList.add("hidden");
    endingScreen.classList.add("hidden");
    quitScreen.classList.add("hidden");
    gameUi.classList.remove("hidden");
    dialogue.classList.add("hidden");
    contentViewer.classList.add("hidden");
    imageLightbox.classList.add("hidden");
    theoryNote.classList.add("hidden");
    scheduleLoop();
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function rectCircleCollision(circle, rect) {
    const x = clamp(circle.x, rect.x, rect.x + rect.w);
    const y = clamp(circle.y, rect.y, rect.y + rect.h);
    return Math.hypot(circle.x - x, circle.y - y) < circle.radius;
  }

  function gateUnlocked(item) {
    return item.kind !== "gate" || !item.requiredEvidence || state.evidence.has(item.requiredEvidence);
  }

  function canMove(x, y) {
    const circle = { x, y, radius: PLAYER.radius };
    const lockedGateCollision = interactables.some((item) => item.kind === "gate" && !gateUnlocked(item) && rectCircleCollision(circle, { x: item.x - 60, y: item.y - 80, w: 120, h: 160 }));
    return x > 65 && y > 65 && x < WORLD.width - 65 && y < WORLD.height - 65 && !walls.some((wall) => rectCircleCollision(circle, wall)) && !lockedGateCollision;
  }

  function move(dx, dy, dt) {
    const length = Math.hypot(dx, dy) || 1;
    const amount = PLAYER.speed * dt;
    const nextX = state.player.x + (dx / length) * amount;
    const nextY = state.player.y + (dy / length) * amount;
    if (canMove(nextX, state.player.y)) state.player.x = nextX;
    if (canMove(state.player.x, nextY)) state.player.y = nextY;
  }

  function nearestInteractable() {
    let nearest = null;
    let distance = Infinity;
    for (const item of interactables) {
      const currentDistance = Math.hypot(state.player.x - item.x, state.player.y - item.y);
      if (currentDistance < item.radius && currentDistance < distance) {
        nearest = item;
        distance = currentDistance;
      }
    }
    return nearest;
  }

  function currentRoom() {
    return rooms.find((room) => state.player.x > room.x && state.player.x < room.x + room.w && state.player.y > room.y && state.player.y < room.y + room.h) ?? null;
  }

  function nextExhibit() {
    return rooms.map((room) => exhibitById.get(room.id)).find((item) => item && !state.evidence.has(item.id)) ?? null;
  }

  function chapterAvailable(chapterId) {
    const index = rooms.findIndex((room) => room.id === chapterId);
    return index <= 0 || state.evidence.has(rooms[index - 1].id);
  }

  function updateUi() {
    const room = currentRoom();
    const next = nextExhibit();
    const item = nearestInteractable();
    const chapterCount = rooms.length;
    const completedCount = state.evidence.size;

    zoneName.textContent = room?.name ?? "HÀNH LANG CHUYỂN TIẾP";
    zoneIndex.textContent = room?.index ?? "—";
    evidenceCount.textContent = completedCount;
    objectiveText.textContent = completedCount === chapterCount
      ? "Tới cánh cửa cuối để khép lại hồ sơ"
      : next
        ? `Tới hiện vật chương ${next.number.slice(0, 2)} và đọc hồ sơ`
        : "Đi theo tuyến triển lãm";

    state.currentInteractable = item;
    prompt.classList.toggle("hidden", !item || state.dialogueOpen || state.viewerOpen);
    prompt.classList.toggle("locked", Boolean(item?.kind === "gate" && !gateUnlocked(item)));
    if (item) {
      if (item.kind === "curator") promptText.textContent = "E — XEM HƯỚNG DẪN TUYẾN";
      else if (item.kind === "gate") promptText.textContent = gateUnlocked(item)
        ? item.final ? "E — KẾT THÚC TRIỂN LÃM" : `E — QUA CỔNG SANG ${item.target}`
        : `CỔNG KHÓA — HOÀN TẤT ${item.requiredEvidence.toUpperCase()}`;
      else promptText.textContent = state.evidence.has(item.id) ? "E — XEM LẠI HỒ SƠ" : `E — MỞ HỒ SƠ ${item.number.slice(0, 2)}`;
    }

    statusText.textContent = completedCount === chapterCount
      ? "Bốn chương đã được ghi nhận. Cánh cửa cuối đang chờ."
      : next
        ? `Đọc đủ hồ sơ ${next.number.slice(0, 2)} để mở cổng kế tiếp.`
        : "Đi theo tuyến triển lãm.";

    const miniX = clamp(8 + (state.player.x / WORLD.width) * 130, 8, 143);
    const miniY = clamp(9 + (state.player.y / WORLD.height) * 76, 9, 82);
    miniPlayer.style.left = `${miniX}px`;
    miniPlayer.style.top = `${miniY}px`;
  }

  function openDialogue(item) {
    const lockedGate = item.kind === "gate" && !gateUnlocked(item);
    state.dialogueOpen = true;
    dialogue.classList.remove("hidden");
    dialogueTitle.textContent = lockedGate ? "Cổng đang khóa" : item.title;
    dialogueBody.textContent = lockedGate
      ? `Bạn phải hoàn tất chương ${item.requiredEvidence.toUpperCase()} trước khi sang ${item.target}.`
      : item.body;
    dialogueType.textContent = lockedGate ? "GATE / LOCKED" : item.type;
    dialogueNumber.textContent = item.number;
    dialogueClose.classList.remove("hidden");
    dialogueClose.textContent = "ĐÓNG HỒ SƠ";
    updateUi();
  }

  function closeDialogue() {
    state.dialogueOpen = false;
    dialogue.classList.add("hidden");
    updateUi();
  }

  function activeChapter() { return state.viewerChapter ? contentById.get(state.viewerChapter) : null; }

  function activeSection() {
    const chapter = activeChapter();
    return chapter?.sections[state.viewerPage] ?? null;
  }

  function imageKey() { return `${state.viewerChapter}:${state.viewerPage}:${state.viewerImage}`; }
  function pageKey() { return `${state.viewerChapter}:${state.viewerPage}`; }

  function setViewerButtonLabel(label) {
    const buttonLabel = viewerNext.querySelector("span");
    if (buttonLabel) buttonLabel.textContent = label;
    else viewerNext.textContent = label;
  }

  function renderViewerImage(section) {
    const images = section?.images ?? [];
    const image = images[state.viewerImage] ?? null;
    viewerImageCount.textContent = images.length ? `${state.viewerImage + 1} / ${images.length}` : "0 / 0";
    viewerPrevImage.disabled = images.length < 2;
    viewerNextImage.disabled = images.length < 2;
    viewerCaption.textContent = "";
    viewerImage.classList.add("hidden");
    viewerImagePlaceholder.classList.remove("hidden");
    viewerImage.onerror = null;
    viewerImage.onload = null;

    if (!image) {
      viewerImagePlaceholder.innerHTML = "<span>IMAGE SLOT</span><strong>Ảnh tư liệu sẽ được đặt tại đây</strong><small>Khung này đã sẵn sàng nhận ảnh của chương.</small>";
      return;
    }

    viewerImagePlaceholder.innerHTML = "<span>LOADING IMAGE</span><strong>Đang mở ảnh tư liệu…</strong><small>Nếu ảnh chưa có trong thư mục assets, khung sẽ tự chuyển về trạng thái chờ.</small>";
    viewerImage.alt = image.alt;
    viewerImage.onerror = () => {
      viewerImage.classList.add("hidden");
      viewerImagePlaceholder.classList.remove("hidden");
      viewerImagePlaceholder.innerHTML = "<span>IMAGE SLOT</span><strong>Chưa tải được ảnh này</strong><small>Kiểm tra lại đường dẫn trong content.js khi nhóm thêm ảnh.</small>";
      viewerCaption.textContent = image.caption;
    };
    viewerImage.onload = () => {
      viewerImagePlaceholder.classList.add("hidden");
      viewerImage.classList.remove("hidden");
      state.imagesViewed.add(imageKey());
    };
    viewerImage.src = image.src;
    viewerImage.classList.remove("hidden");
    viewerImagePlaceholder.classList.add("hidden");
    viewerCaption.textContent = image.caption;
  }

  function renderViewer() {
    const chapter = activeChapter();
    if (!chapter) return;
    const sections = chapter.sections;
    state.viewerPage = clamp(state.viewerPage, 0, sections.length - 1);
    const section = activeSection();
    if (!section) return;

    state.viewedPages.add(pageKey());
    viewerKicker.textContent = `ARCHIVE ${chapter.code} / ${chapter.label}`;
    viewerTitle.textContent = chapter.title;
    viewerPage.textContent = String(state.viewerPage + 1).padStart(2, "0");
    viewerPageTotal.textContent = String(sections.length).padStart(2, "0");
    viewerProgressBar.style.width = `${((state.viewerPage + 1) / sections.length) * 100}%`;
    viewerSectionLabel.textContent = section.label;
    viewerSectionTitle.textContent = section.title;
    viewerLead.textContent = section.lead;
    viewerParagraphs.innerHTML = "";
    section.paragraphs.forEach((paragraph) => {
      const node = document.createElement("p");
      node.textContent = paragraph;
      viewerParagraphs.append(node);
    });
    state.viewerImage = clamp(state.viewerImage, 0, Math.max(0, section.images.length - 1));
    renderViewerImage(section);

    const lastPage = state.viewerPage === sections.length - 1;
    if (lastPage) {
      setViewerButtonLabel(state.evidence.has(chapter.id) ? "ĐÓNG HỒ SƠ" : `HOÀN TẤT CHƯƠNG ${chapter.code}`);
      viewerNote.textContent = state.evidence.has(chapter.id)
        ? "Hồ sơ đã được ghi nhận. Bạn có thể đóng hoặc xem lại các mục."
        : "Bạn đã tới trang cuối. Ghi nhận chương để mở cổng tiếp theo.";
    } else {
      setViewerButtonLabel("MỤC TIẾP THEO");
      viewerNote.textContent = section.images.length
        ? "Đọc mục này và nhấn vào ảnh để xem lớn; dùng mũi tên để đổi ảnh."
        : "Đọc kỹ mục này rồi chuyển sang mục tiếp theo.";
    }
    updateUi();
  }

  function openContentViewer(chapterId) {
    const chapter = contentById.get(chapterId);
    if (!chapter) {
      openDialogue({ id: chapterId, kind: "curator", title: "Hồ sơ đang chờ nội dung", type: "ARCHIVE / EMPTY", number: "—", body: "Chương này chưa có dữ liệu trong content.js." });
      return false;
    }
    if (!chapterAvailable(chapterId)) return false;
    state.dialogueOpen = false;
    dialogue.classList.add("hidden");
    state.viewerOpen = true;
    state.viewerChapter = chapterId;
    state.viewerPage = 0;
    state.viewerImage = 0;
    contentViewer.classList.remove("hidden");
    renderViewer();
    return true;
  }

  function closeContentViewer() {
    state.viewerOpen = false;
    state.viewerChapter = null;
    state.viewerPage = 0;
    state.viewerImage = 0;
    contentViewer.classList.add("hidden");
    closeLightbox();
    updateUi();
  }

  function completeChapter(chapterId) {
    if (!contentById.has(chapterId)) return false;
    state.evidence.add(chapterId);
    updateUi();
    return true;
  }

  function nextViewerPage() {
    const chapter = activeChapter();
    if (!chapter) return;
    if (state.viewerPage < chapter.sections.length - 1) {
      state.viewerPage += 1;
      state.viewerImage = 0;
      renderViewer();
      return;
    }
    if (!state.evidence.has(chapter.id)) completeChapter(chapter.id);
    closeContentViewer();
  }

  function cycleImage(delta) {
    const section = activeSection();
    const images = section?.images ?? [];
    if (images.length < 2) return;
    state.viewerImage = (state.viewerImage + delta + images.length) % images.length;
    renderViewerImage(section);
  }

  function openLightbox() {
    const section = activeSection();
    const image = section?.images?.[state.viewerImage];
    if (!image || viewerImage.classList.contains("hidden")) return;
    lightboxImage.alt = image.alt;
    lightboxImage.src = image.src;
    lightboxCaption.textContent = image.caption;
    imageLightbox.classList.remove("hidden");
  }

  function closeLightbox() {
    imageLightbox.classList.add("hidden");
    lightboxImage.src = "";
  }

  function interact() {
    if (state.dialogueOpen || state.viewerOpen) return;
    const item = nearestInteractable();
    if (!item) return;
    if (item.kind === "gate") {
      if (!gateUnlocked(item)) {
        openDialogue(item);
        return;
      }
      if (item.final) {
        showEnding();
        return;
      }
      state.player.x = clamp(state.player.x + 170, 70, WORLD.width - 70);
      updateCamera();
      updateUi();
      return;
    }
    if (item.kind === "curator") {
      openDialogue(item);
      return;
    }
    openContentViewer(item.chapterId);
  }

  function drawWorld() {
    const width = innerWidth;
    const height = innerHeight;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.scale(CAMERA_ZOOM, CAMERA_ZOOM);
    ctx.translate(-state.camera.x, -state.camera.y);
    ctx.fillStyle = "#2b292a";
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    drawFloor();
    rooms.forEach(drawRoom);
    drawWalls();
    interactables.forEach(drawInteractable);
    drawPlayer();
    drawParticles();
    ctx.restore();
    drawVignette(width, height);
  }

  function drawFloor() {
    ctx.fillStyle = "#343131";
    ctx.fillRect(50, 50, WORLD.width - 100, WORLD.height - 100);
    const glow = ctx.createRadialGradient(WORLD.width / 2, 610, 80, WORLD.width / 2, 610, 2100);
    glow.addColorStop(0, "rgba(224,190,133,.10)");
    glow.addColorStop(1, "rgba(43,41,42,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(50, 50, WORLD.width - 100, WORLD.height - 100);
    ctx.fillStyle = "rgba(240,224,203,.045)";
    ctx.fillRect(50, 613, WORLD.width - 100, 74);
    ctx.strokeStyle = "rgba(247,239,227,.045)";
    ctx.lineWidth = 1;
    for (let x = 90; x < WORLD.width - 50; x += 260) {
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, WORLD.height - 50);
      ctx.stroke();
    }
    for (let y = 90; y < WORLD.height - 50; y += 180) {
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(WORLD.width - 50, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(240,224,203,.12)";
    ctx.beginPath();
    ctx.moveTo(50, 613);
    ctx.lineTo(WORLD.width - 50, 613);
    ctx.moveTo(50, 687);
    ctx.lineTo(WORLD.width - 50, 687);
    ctx.stroke();
  }

  function drawRoom(room) {
    const collected = state.evidence.has(room.id);
    ctx.fillStyle = collected ? `${room.color}14` : "rgba(247,239,227,.018)";
    ctx.fillRect(room.x, room.y, room.w, room.h);
    ctx.strokeStyle = collected ? `${room.color}d0` : `${room.color}86`;
    ctx.lineWidth = collected ? 2.5 : 1.5;
    ctx.strokeRect(room.x, room.y, room.w, room.h);
    ctx.fillStyle = "rgba(247,239,227,.028)";
    ctx.fillRect(room.x + 28, room.y + 92, room.w - 56, room.h - 120);
    ctx.strokeStyle = "rgba(247,239,227,.09)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(room.x + 30, room.y + 78);
    ctx.lineTo(room.x + room.w - 30, room.y + 78);
    ctx.stroke();
    ctx.font = "16px 'Space Grotesk', system-ui, sans-serif";
    ctx.fillStyle = "#f1e7d8";
    ctx.fillText(room.name, room.x + 32, room.y + 42);
    ctx.font = "11px 'DM Mono', monospace";
    ctx.fillStyle = `${room.color}e6`;
    ctx.fillText(`${room.index} / ${room.label}`, room.x + 32, room.y + 64);
    ctx.fillStyle = `${room.color}cc`;
    ctx.fillRect(room.x + 32, room.y + room.h - 34, 76, 3);
    ctx.fillStyle = "rgba(247,239,227,.18)";
    ctx.fillRect(room.x + room.w - 108, room.y + room.h - 34, 76, 3);
  }

  function drawChapterObject(item) {
    const room = roomById.get(item.id);
    const color = room?.color || "#d3a95f";
    const collected = state.evidence.has(item.id);
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.globalAlpha = collected ? 0.52 : 1;
    const light = ctx.createRadialGradient(0, 12, 20, 0, 12, 270);
    light.addColorStop(0, `${color}20`);
    light.addColorStop(1, `${color}00`);
    ctx.fillStyle = light;
    ctx.fillRect(-270, -220, 540, 440);
    ctx.shadowColor = `${color}66`;
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#4a4240";
    ctx.fillRect(-160, 76, 320, 14);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `${color}c8`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-160, 76, 320, 14);
    ctx.fillStyle = color;
    ctx.fillRect(-160, 91, 10, 7);
    ctx.fillRect(150, 91, 10, 7);

    if (item.id === "base") {
      ctx.fillStyle = "#514846";
      ctx.fillRect(-124, -45, 248, 112);
      ctx.strokeStyle = color;
      ctx.strokeRect(-124, -45, 248, 112);
      ctx.fillStyle = "#eee1cd";
      ctx.fillRect(-88, -20, 176, 20);
      ctx.fillStyle = `${color}a8`;
      ctx.fillRect(-88, 9, 126, 9);
      ctx.fillRect(-88, 27, 160, 9);
      ctx.fillRect(-88, 45, 94, 9);
      ctx.fillStyle = color;
      ctx.fillRect(-105, -66, 72, 16);
      ctx.fillRect(-20, -66, 52, 16);
      ctx.fillRect(45, -66, 60, 16);
    } else if (item.id === "class") {
      ctx.fillStyle = "#544a45";
      ctx.fillRect(-128, -62, 112, 129);
      ctx.fillRect(16, -15, 112, 82);
      ctx.strokeStyle = color;
      ctx.strokeRect(-128, -62, 112, 129);
      ctx.strokeRect(16, -15, 112, 82);
      ctx.fillStyle = "#efe1c9";
      ctx.fillRect(-103, -38, 62, 12);
      ctx.fillRect(41, 9, 62, 12);
      ctx.fillStyle = `${color}aa`;
      ctx.fillRect(-103, -14, 59, 8);
      ctx.fillRect(41, 33, 58, 8);
      ctx.fillRect(-103, 4, 41, 8);
      ctx.fillRect(41, 51, 42, 8);
    } else if (item.id === "state") {
      ctx.fillStyle = "#514b47";
      ctx.fillRect(-112, -76, 224, 143);
      ctx.strokeStyle = color;
      ctx.strokeRect(-112, -76, 224, 143);
      ctx.fillStyle = "#eee4d4";
      ctx.fillRect(-83, -46, 166, 20);
      ctx.fillStyle = `${color}b0`;
      ctx.fillRect(-83, -9, 166, 8);
      ctx.fillRect(-83, 12, 122, 8);
      ctx.fillRect(-83, 33, 145, 8);
      ctx.fillStyle = color;
      ctx.fillRect(-83, 51, 46, 7);
      ctx.fillRect(-28, 51, 78, 7);
      ctx.fillRect(59, 51, 24, 7);
    } else if (item.id === "revolt") {
      ctx.fillStyle = "#514244";
      ctx.fillRect(-132, -64, 264, 131);
      ctx.strokeStyle = color;
      ctx.strokeRect(-132, -64, 264, 131);
      ctx.fillStyle = `${color}aa`;
      ctx.fillRect(-104, -33, 66, 10);
      ctx.fillRect(38, -33, 72, 10);
      ctx.fillRect(-104, -9, 88, 8);
      ctx.fillRect(16, -9, 94, 8);
      ctx.fillRect(-104, 14, 52, 8);
      ctx.fillRect(8, 14, 60, 8);
      ctx.strokeStyle = "#f0d7a7";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-10, -64);
      ctx.lineTo(-27, -32);
      ctx.lineTo(4, -7);
      ctx.lineTo(-18, 22);
      ctx.lineTo(14, 66);
      ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.fillRect(-15, -112, 30, 5);
    ctx.fillRect(-2, -107, 4, 14);
    ctx.restore();
  }

  function drawWalls() {
    ctx.fillStyle = "#292729";
    ctx.strokeStyle = "rgba(240,224,203,.18)";
    ctx.lineWidth = 1;
    walls.forEach((wall) => {
      ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
      ctx.strokeRect(wall.x, wall.y, wall.w, wall.h);
    });
  }

  function drawInteractable(item) {
    const color = item.kind === "curator" ? "#d3a95f" : item.kind === "gate" ? "#c75b58" : roomById.get(item.id)?.color || "#d3a95f";
    if (item.kind === "exhibit") {
      drawChapterObject(item);
      return;
    }

    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    if (item.kind === "gate") {
      const unlocked = gateUnlocked(item);
      ctx.fillStyle = unlocked ? "rgba(211,169,95,.12)" : "rgba(199,91,88,.14)";
      ctx.fillRect(-54, -82, 108, 164);
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#343031";
      ctx.fillRect(-42, -69, 84, 138);
      ctx.strokeStyle = unlocked ? "#d3a95f" : color;
      ctx.lineWidth = 2;
      ctx.strokeRect(-54, -82, 108, 164);
      ctx.beginPath();
      ctx.moveTo(-27, 58);
      ctx.lineTo(-27, -20);
      ctx.quadraticCurveTo(0, -55, 27, -20);
      ctx.lineTo(27, 58);
      ctx.stroke();
      ctx.font = "12px 'DM Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = unlocked ? "#f0d7a7" : color;
      ctx.fillText(unlocked ? item.final ? "EXIT" : "OPEN" : "LOCKED", 0, 103);
      ctx.restore();
      return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 26 + Math.sin(state.time * 2) * 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  }

  function drawPlayer() {
    const player = state.player;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.shadowColor = "#e2b45d";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#e2b45d";
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#f7df9b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#160b0d";
    ctx.beginPath();
    ctx.arc(4, -3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawParticles() {
    for (let index = 0; index < 18; index += 1) {
      const x = (index * 487 + 160) % WORLD.width;
      const y = (index * 241 + 110) % WORLD.height;
      const alpha = 0.035 + (Math.sin(state.time * 0.35 + index) + 1) * 0.018;
      ctx.fillStyle = `rgba(240,224,203,${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }

  function drawVignette(width, height) {
    const gradient = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.25, width / 2, height / 2, Math.max(width, height) * 0.78);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "rgba(20,18,19,.22)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  function updateCamera() {
    const viewWidth = innerWidth / CAMERA_ZOOM;
    const viewHeight = innerHeight / CAMERA_ZOOM;
    state.camera.x = clamp(state.player.x - viewWidth * 0.5, 0, Math.max(0, WORLD.width - viewWidth));
    state.camera.y = clamp(state.player.y - viewHeight * 0.56, 0, Math.max(0, WORLD.height - viewHeight));
  }

  function scheduleLoop() {
    if (state.frameRequested || !state.running) return;
    state.frameRequested = true;
    requestAnimationFrame(loop);
  }

  function loop(timestamp) {
    state.frameRequested = false;
    if (!state.running) return;
    const dt = Math.min((timestamp - state.lastTime) / 1000, 0.05);
    state.lastTime = timestamp;
    state.time += dt;
    if (!state.dialogueOpen && !state.viewerOpen) {
      let dx = 0;
      let dy = 0;
      if (keys.has("w") || keys.has("arrowup")) dy -= 1;
      if (keys.has("s") || keys.has("arrowdown")) dy += 1;
      if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
      if (keys.has("d") || keys.has("arrowright")) dx += 1;
      if (dx || dy) move(dx, dy, dt);
      updateCamera();
      updateUi();
    }
    drawWorld();
    scheduleLoop();
  }

  function showEnding() {
    state.running = false;
    state.viewerOpen = false;
    state.dialogueOpen = false;
    contentViewer.classList.add("hidden");
    dialogue.classList.add("hidden");
    endingScreen.classList.remove("hidden");
    document.getElementById("ending-evidence").textContent = `${state.evidence.size}/${rooms.length}`;
    document.getElementById("ending-pages").textContent = String(state.viewedPages.size);
    document.getElementById("ending-images").textContent = String(state.imagesViewed.size);
    document.getElementById("ending-copy").textContent = "Bạn đã đi hết tuyến triển lãm. Các điều kiện vật chất, quan hệ sở hữu, thiết chế Nhà nước và mâu thuẫn xã hội hiện lên như một chuỗi liên tục—được đọc bằng những hồ sơ bạn đã mở, không phải bằng một đáp án có sẵn.";
  }

  function quitGame() {
    state.running = false;
    state.frameRequested = false;
    keys.clear();
    state.dialogueOpen = false;
    state.viewerOpen = false;
    dialogue.classList.add("hidden");
    contentViewer.classList.add("hidden");
    closeLightbox();
    gameUi.classList.add("hidden");
    endingScreen.classList.add("hidden");
    quitScreen.classList.remove("hidden");
  }

  function returnToTitle() {
    state.running = false;
    state.frameRequested = false;
    keys.clear();
    state.dialogueOpen = false;
    state.viewerOpen = false;
    closeLightbox();
    quitScreen.classList.add("hidden");
    endingScreen.classList.add("hidden");
    gameUi.classList.add("hidden");
    titleScreen.classList.remove("hidden");
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const handledKeys = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "e", "escape", "enter", " "];
    if (handledKeys.includes(key)) event.preventDefault();

    if (imageLightbox && !imageLightbox.classList.contains("hidden")) {
      if (key === "escape" || key === "e") closeLightbox();
      else if (key === "arrowleft") cycleImage(-1);
      else if (key === "arrowright") cycleImage(1);
      return;
    }
    if (state.viewerOpen) {
      if (key === "escape") closeContentViewer();
      else if (key === "enter" || key === " ") nextViewerPage();
      else if (key === "arrowleft") cycleImage(-1);
      else if (key === "arrowright") cycleImage(1);
      return;
    }
    if (state.dialogueOpen) {
      if (key === "escape" || key === "e" || key === "enter" || key === " ") closeDialogue();
      return;
    }
    if (key === "e") interact();
    else keys.add(key);
  }

  function handleKeyUp(event) { keys.delete(event.key.toLowerCase()); }

  document.getElementById("start-button").addEventListener("click", start);
  document.getElementById("restart-button").addEventListener("click", start);
  document.getElementById("quit-button").addEventListener("click", quitGame);
  document.getElementById("ending-exit-button").addEventListener("click", quitGame);
  document.getElementById("return-title-button").addEventListener("click", returnToTitle);
  document.getElementById("theory-button").addEventListener("click", () => theoryNote.classList.toggle("hidden"));
  dialogueClose.addEventListener("click", closeDialogue);
  viewerClose.addEventListener("click", closeContentViewer);
  viewerNext.addEventListener("click", nextViewerPage);
  viewerPrevImage.addEventListener("click", () => cycleImage(-1));
  viewerNextImage.addEventListener("click", () => cycleImage(1));
  viewerImage.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);
  imageLightbox.querySelector(".image-lightbox-backdrop")?.addEventListener("click", closeLightbox);
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", () => keys.clear());
  resize();

  window.__THE_STATE__ = {
    state,
    rooms,
    walls,
    interactables,
    content,
    contentById,
    resetState,
    start,
    interact,
    openDialogue,
    closeDialogue,
    openContentViewer,
    closeContentViewer,
    nextViewerPage,
    cycleImage,
    completeChapter,
    showEnding,
    quitGame,
    returnToTitle,
    canMove,
    drawWorld,
    updateUi
  };
})();
