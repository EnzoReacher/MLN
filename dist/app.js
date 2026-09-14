/* THE STATE / Exhibition 01 — lightweight 3D gallery game. */
(() => {
  "use strict";

  const canvas = document.getElementById("game-canvas");
  const titleScreen = document.getElementById("title-screen");
  const gameUi = document.getElementById("game-ui");
  const dialogue = document.getElementById("dialogue");
  const endingScreen = document.getElementById("ending-screen");
  const quitScreen = document.getElementById("quit-screen");
  const runtimeError = document.getElementById("runtime-error");
  const runtimeErrorMessage = document.getElementById("runtime-error-message");
  const runtimeReloadButton = document.getElementById("runtime-reload-button");
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
  const viewerImageStage = document.querySelector(".viewer-image-stage");
  const viewerLayout = document.querySelector(".viewer-layout");
  const viewerVisual = document.querySelector(".viewer-visual");
  const viewerCaption = document.getElementById("viewer-caption");
  const viewerImageCount = document.getElementById("viewer-image-count");
  const viewerPrevImage = document.getElementById("viewer-prev-image");
  const viewerNextImage = document.getElementById("viewer-next-image");
  const viewerImageControls = document.querySelector(".image-controls");
  const viewerNote = document.getElementById("viewer-note");
  const viewerNext = document.getElementById("viewer-next");
  const viewerClose = document.getElementById("viewer-close");
  const imageLightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  const THREE = window.THREE || null;
  const keys = new Set();
  const PLAYER = { height: 1.65, speed: 5.2 };
  const PERFORMANCE = { maxPixelRatio: 1.25, uiInterval: .05 };
  const GALLERY = { halfWidth: 7, roomHeight: 5.5, minZ: -88, maxZ: 9 };

  const rooms = [
    {
      id: "base", index: "01", name: "ĐIỀU KIỆN VẬT CHẤT", label: "THE BASE", centerZ: 0, zBack: 10, zFront: -10,
      color: "#c67b53", accent: "#e1b46d", artwork: "production", artworkImage: "./assets/ch01-engels.webp",
      artworks: [
        { image: "./assets/ch01-engels.webp", wall: "left", zOffset: 0, height: 3.55, maxWidth: 3.15 },
        { image: "./assets/ch01-lenin.webp", wall: "right", zOffset: -5.4, height: 3.2, maxWidth: 3.05 },
        { image: "./assets/ch01-state-institutions.webp", wall: "right", zOffset: 5.4, height: 2.65, maxWidth: 4.85 }
      ]
    },
    {
      id: "class", index: "02", name: "GIAI CẤP & SỞ HỮU", label: "THE SPLIT", centerZ: -24, zBack: -14, zFront: -34,
      color: "#d6a75e", accent: "#f0d394", artwork: "class", artworkImage: "./assets/ch02-state-functions.webp",
      artworks: [
        { image: "./assets/ch02-state-functions.webp", wall: "left", zOffset: 0, height: 1.7, maxWidth: 5.3 },
        { image: "./assets/ch02-state-form.webp", wall: "right", zOffset: -5.4, height: 2.55, maxWidth: 4.25 },
        { image: "./assets/ch02-slave-state.webp", wall: "right", zOffset: 5.4, height: 2.8, maxWidth: 4.35 }
      ]
    },
    {
      id: "state", index: "03", name: "NHÀ NƯỚC & QUYỀN LỰC", label: "THE STATE", centerZ: -48, zBack: -38, zFront: -58,
      color: "#b9c0b3", accent: "#e6d9bd", artwork: "state", artworkImage: "./assets/ch03-marx.webp",
      artworks: [
        { image: "./assets/ch03-marx.webp", wall: "left", zOffset: 0, height: 3.45, maxWidth: 3.15 },
        { image: "./assets/ch03-vietnam-socialism.webp", wall: "right", zOffset: -5.4, height: 2.8, maxWidth: 4.65 },
        { image: "./assets/ch03-vietnam-state.webp", wall: "right", zOffset: 5.4, height: 2.55, maxWidth: 4.4 }
      ]
    },
    {
      id: "revolt", index: "04", name: "MÂU THUẪN & CHUYỂN HÓA", label: "THE FAULTLINE", centerZ: -72, zBack: -62, zFront: -82,
      color: "#c95e62", accent: "#f1b07d", artwork: "revolt", artworkImage: "./assets/ch04-revolution-origin.webp",
      artworks: [
        { image: "./assets/ch04-revolution-origin.webp", wall: "left", zOffset: 0, height: 3.45, maxWidth: 5.25 },
        { image: "./assets/ch04-revolution-force.webp", wall: "right", zOffset: -5.4, height: 2.55, maxWidth: 4.25 },
        { image: "./assets/ch04-revolution-method.webp", wall: "right", zOffset: 5.4, height: 2.55, maxWidth: 4.25 }
      ]
    }
  ];

  const ROOM_PLANTS = {
    base: [{ side: -1, zOffset: 8.25 }, { side: 1, zOffset: -8.25 }],
    class: [{ side: -1, zOffset: 8.25 }, { side: 1, zOffset: -8.25 }],
    state: [{ side: -1, zOffset: 8.25 }, { side: 1, zOffset: -8.25 }],
    revolt: [{ side: -1, zOffset: 8.25 }, { side: 1, zOffset: -8.25 }]
  };

  const ROOM_HONORS = Object.freeze({
    base: { image: "./assets/ch01-engels.webp", name: "Friedrich Engels", role: "NGUỒN GỐC XÃ HỘI" },
    class: { image: "./assets/ch03-marx.webp", name: "Karl Marx", role: "GIAI CẤP & SỞ HỮU" },
    state: { image: "./assets/ch03-ho-chi-minh.webp", name: "Hồ Chí Minh", role: "NHÀ NƯỚC CỦA DÂN" },
    revolt: { image: "./assets/ch01-lenin.webp", name: "Vladimir Ilyich Lenin", role: "CÁCH MẠNG XÃ HỘI" }
  });

  const gates = [
    { id: "gate-class", x: 0, z: -12, radius: 2.5, kind: "gate", requiredEvidence: "base", target: "GIAI CẤP & SỞ HỮU", title: "Cổng chương 02", type: "GATE / 02", number: "02 / 04" },
    { id: "gate-state", x: 0, z: -36, radius: 2.5, kind: "gate", requiredEvidence: "class", target: "NHÀ NƯỚC & QUYỀN LỰC", title: "Cổng chương 03", type: "GATE / 03", number: "03 / 04" },
    { id: "gate-revolt", x: 0, z: -60, radius: 2.5, kind: "gate", requiredEvidence: "state", target: "MÂU THUẪN & CHUYỂN HÓA", title: "Cổng chương 04", type: "GATE / 04", number: "04 / 04" },
    { id: "gate-end", x: 0, z: -84, radius: 2.5, kind: "gate", requiredEvidence: "revolt", final: true, title: "Cánh cửa cuối", type: "EXIT / FIELD REPORT", number: "END" }
  ];

  const interactables = [
    { id: "curator", x: -4.3, z: 6.6, radius: 1.8, kind: "curator", title: "Người lưu trữ", type: "WELCOME", number: "00 / 04", body: "Đây là một tuyến triển lãm có thứ tự. Đi tới từng bức tranh, nhấn E để đọc hồ sơ và xem ảnh. Khi hoàn tất một chương, cổng tiếp theo sẽ mở." },
    ...rooms.map((room) => ({
      id: room.id,
      x: room.artworks[0].wall === "right" ? 5.15 : -5.15,
      z: room.centerZ + room.artworks[0].zOffset,
      radius: 1.9,
      kind: "exhibit",
      chapterId: room.id,
      sectionIndex: 0,
      artworkIndex: 0,
      isPrimary: true,
      artworkImage: room.artworks[0].image,
      title: `Tranh 01 — ${room.name.toLowerCase()}`,
      type: `ARCHIVE / ${room.index}`,
      number: `${room.index} / 04`,
      artworkNumber: "01 / 03"
    })),
    ...rooms.flatMap((room) => room.artworks.slice(1).map((artwork, offset) => ({
      id: `${room.id}-artwork-${offset + 2}`,
      x: artwork.wall === "right" ? 5.15 : -5.15,
      z: room.centerZ + (artwork.zOffset || 0),
      radius: 1.9,
      kind: "exhibit",
      chapterId: room.id,
      sectionIndex: offset + 1,
      artworkIndex: offset + 1,
      isPrimary: false,
      artworkImage: artwork.image,
      title: `Tranh ${String(offset + 2).padStart(2, "0")} — ${room.name.toLowerCase()}`,
      type: `ARCHIVE / ${room.index} / ${String(offset + 2).padStart(2, "0")}`,
      number: `${room.index} / 04`,
      artworkNumber: `${String(offset + 2).padStart(2, "0")} / 03`
    }))),
    ...gates
  ];

  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const content = (Array.isArray(window.THE_STATE_CONTENT) ? window.THE_STATE_CONTENT : []).map(normaliseChapter);
  const contentById = new Map(content.map((chapter) => [chapter.id, chapter]));

  const state = {
    running: false,
    frameRequested: false,
    lastTime: 0,
    time: 0,
    player: { x: 0, z: 7 },
    look: { yaw: 0, pitch: 0 },
    evidence: new Set(),
    passedGates: new Set(),
    viewedPages: new Set(),
    imagesViewed: new Set(),
    currentInteractable: null,
    dialogueOpen: false,
    viewerOpen: false,
    viewerChapter: null,
    viewerPage: 0,
    viewerArtworkIndex: 0,
    viewerImage: 0,
    uiAccumulator: 0
  };

  let renderer = null;
  let scene = null;
  let camera = null;
  let worldGroup = null;
  let clock = null;
  let textureLoader = null;
  let gateMeshes = new Map();

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
      images,
      contentOnly: section?.contentOnly === true
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

  function viewport() {
    return { width: window.innerWidth || 1280, height: window.innerHeight || 720 };
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function gateUnlocked(item) {
    return item.kind !== "gate" || !item.requiredEvidence || state.evidence.has(item.requiredEvidence);
  }

  function gatePassed(item) {
    return state.passedGates.has(item.id);
  }

  function canMove(x, z) {
    if (x < -6.1 || x > 6.1 || z > GALLERY.maxZ || z < GALLERY.minZ) return false;
    for (const gate of gates) {
      if (!gatePassed(gate) && state.player.z > gate.z + 0.85 && z < gate.z + 0.85) return false;
    }
    return true;
  }

  function move(dx, dz, dt) {
    const length = Math.hypot(dx, dz) || 1;
    const amount = PLAYER.speed * dt;
    const nextX = state.player.x + (dx / length) * amount;
    const nextZ = state.player.z + (dz / length) * amount;
    if (canMove(nextX, nextZ)) {
      state.player.x = nextX;
      state.player.z = nextZ;
    } else {
      if (canMove(nextX, state.player.z)) state.player.x = nextX;
      if (canMove(state.player.x, nextZ)) state.player.z = nextZ;
    }
  }

  function currentRoom() {
    return rooms.find((room) => state.player.z <= room.zBack && state.player.z >= room.zFront) ?? null;
  }

  function nearestInteractable() {
    let nearest = null;
    let distance = Infinity;
    for (const item of interactables) {
      const currentDistance = Math.hypot(state.player.x - item.x, state.player.z - item.z);
      if (currentDistance < item.radius && currentDistance < distance) {
        nearest = item;
        distance = currentDistance;
      }
    }
    return nearest;
  }

  function nextExhibit() {
    return rooms.map((room) => interactables.find((item) => item.id === room.id)).find((item) => item && !state.evidence.has(item.id)) ?? null;
  }

  function chapterAvailable(chapterId) {
    const index = rooms.findIndex((room) => room.id === chapterId);
    return index <= 0 || state.evidence.has(rooms[index - 1].id);
  }

  function updateUi() {
    const room = currentRoom();
    const next = nextExhibit();
    const item = nearestInteractable();
    const completedCount = state.evidence.size;

    zoneName.textContent = room?.name ?? "HÀNH LANG CHUYỂN TIẾP";
    zoneIndex.textContent = room?.index ?? "—";
    evidenceCount.textContent = completedCount;
    objectiveText.textContent = completedCount === rooms.length
      ? "Tới cánh cửa cuối để khép lại hồ sơ"
      : next
        ? `Tới tranh lớn chương ${next.number.slice(0, 2)} và đọc hồ sơ`
        : "Đi theo tuyến triển lãm";

    state.currentInteractable = item;
    prompt.classList.toggle("hidden", !item || state.dialogueOpen || state.viewerOpen);
    prompt.classList.toggle("locked", Boolean(item?.kind === "gate" && !gateUnlocked(item)));
    if (item) {
      if (item.kind === "curator") promptText.textContent = "E — XEM HƯỚNG DẪN TUYẾN";
      else if (item.kind === "gate") promptText.textContent = gateUnlocked(item)
        ? item.final ? "E — KẾT THÚC TRIỂN LÃM" : `E — MỞ CỔNG SANG ${item.target}`
        : `CỔNG KHÓA — HOÀN TẤT ${item.requiredEvidence.toUpperCase()}`;
      else {
        const panelRead = state.viewedPages.has(`${item.chapterId}:${item.sectionIndex}`);
        promptText.textContent = panelRead ? `E — XEM LẠI TRANH ${item.artworkNumber}` : `E — XEM TRANH ${item.artworkNumber}`;
      }
    }

    statusText.textContent = completedCount === rooms.length
      ? "Bốn chương đã được ghi nhận. Cánh cửa cuối đang chờ."
      : next
        ? `Đọc đủ hồ sơ ${next.number.slice(0, 2)} để mở cổng kế tiếp.`
        : "Đi theo tuyến triển lãm.";

    const progress = clamp((7 - state.player.z) / (7 - GALLERY.minZ), 0, 1);
    miniPlayer.style.left = `${8 + progress * 135}px`;
    miniPlayer.style.top = "49px";
  }

  function resetState() {
    keys.clear();
    state.running = true;
    state.lastTime = performance.now();
    state.time = 0;
    state.player = { x: 0, z: 7 };
    state.look = { yaw: 0, pitch: 0 };
    state.evidence.clear();
    state.passedGates.clear();
    state.viewedPages.clear();
    state.imagesViewed.clear();
    state.currentInteractable = null;
    state.dialogueOpen = false;
    state.viewerOpen = false;
    state.viewerChapter = null;
    state.viewerPage = 0;
    state.viewerArtworkIndex = 0;
    state.viewerImage = 0;
    state.uiAccumulator = 0;
    runtimeError?.classList.add("hidden");
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
    initThreeGallery();
    scheduleLoop();
  }

  function reportRuntimeError(message) {
    state.running = false;
    state.frameRequested = false;
    keys.clear();
    document.exitPointerLock?.();
    if (runtimeErrorMessage) runtimeErrorMessage.textContent = message;
    runtimeError?.classList.remove("hidden");
    prompt.classList.add("hidden");
    statusText.textContent = "Không gian 3D chưa sẵn sàng.";
  }

  function openDialogue(item) {
    const lockedGate = item.kind === "gate" && !gateUnlocked(item);
    state.dialogueOpen = true;
    document.exitPointerLock?.();
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
  function activeSection() { return activeChapter()?.sections[state.viewerPage] ?? null; }
  function imageKey() { return `${state.viewerChapter}:${state.viewerPage}:${state.viewerImage}`; }
  function pageKey() { return `${state.viewerChapter}:${state.viewerPage}`; }

  function syncViewerImageFrame() {
    const width = Number(viewerImage?.naturalWidth);
    const height = Number(viewerImage?.naturalHeight);
    if (!viewerImageStage || !(width > 0) || !(height > 0)) return;
    viewerImageStage.style.setProperty("--viewer-image-ratio", `${width} / ${height}`);
    viewerImageStage.dataset.orientation = width >= height ? "landscape" : "portrait";
  }

  function resetViewerImageFrame() {
    viewerImageStage?.style.removeProperty("--viewer-image-ratio");
    if (viewerImageStage) delete viewerImageStage.dataset.orientation;
  }

  function setViewerButtonLabel(label) {
    const buttonLabel = viewerNext.querySelector("span");
    if (buttonLabel) buttonLabel.textContent = label;
    else viewerNext.textContent = label;
  }

  function renderViewerImage(section) {
    const images = section?.images ?? [];
    const image = images[state.viewerImage] ?? null;
    const contentOnly = Boolean(section?.contentOnly);
    viewerImageControls?.classList.toggle("hidden", contentOnly || images.length < 2);
    viewerImageCount.textContent = images.length ? `${state.viewerImage + 1} / ${images.length}` : "0 / 0";
    viewerPrevImage.disabled = images.length < 2;
    viewerNextImage.disabled = images.length < 2;
    viewerCaption.textContent = "";
    viewerImage.classList.add("hidden");
    viewerImagePlaceholder.classList.remove("hidden");
    resetViewerImageFrame();
    viewerImage.onerror = null;
    viewerImage.onload = null;

    if (contentOnly) {
      viewerImage.src = "";
      viewerImage.classList.add("hidden");
      viewerImagePlaceholder.classList.add("hidden");
      return;
    }

    if (!image) {
      viewerImagePlaceholder.innerHTML = "<span>IMAGE SLOT</span><strong>Ảnh tư liệu sẽ được đặt tại đây</strong><small>Khung này đã sẵn sàng nhận ảnh của chương.</small>";
      return;
    }

    viewerImagePlaceholder.innerHTML = "<span>LOADING IMAGE</span><strong>Đang mở ảnh tư liệu…</strong><small>Nếu ảnh chưa có trong thư mục assets, khung sẽ tự chuyển về trạng thái chờ.</small>";
    viewerImage.alt = image.alt;
    viewerImage.onerror = () => {
      viewerImage.classList.add("hidden");
      viewerImagePlaceholder.classList.remove("hidden");
      resetViewerImageFrame();
      viewerImagePlaceholder.innerHTML = "<span>IMAGE SLOT</span><strong>Chưa tải được ảnh này</strong><small>Kiểm tra lại đường dẫn trong content.js khi nhóm thêm ảnh.</small>";
      viewerCaption.textContent = image.caption;
    };
    viewerImage.onload = () => {
      viewerImagePlaceholder.classList.add("hidden");
      viewerImage.classList.remove("hidden");
      syncViewerImageFrame();
      state.imagesViewed.add(imageKey());
    };
    viewerImage.src = image.src;
    viewerImage.classList.remove("hidden");
    viewerImagePlaceholder.classList.add("hidden");
    syncViewerImageFrame();
    viewerCaption.textContent = image.caption;
  }

  function renderViewer() {
    const chapter = activeChapter();
    if (!chapter) return;
    const sections = chapter.sections;
    state.viewerArtworkIndex = clamp(state.viewerArtworkIndex, 0, sections.length - 1);
    state.viewerPage = state.viewerArtworkIndex;
    const section = activeSection();
    if (!section) return;

    state.viewedPages.add(pageKey());
    viewerKicker.textContent = `ARCHIVE ${chapter.code} / TRANH ${String(state.viewerArtworkIndex + 1).padStart(2, "0")} / ${chapter.label}`;
    viewerTitle.textContent = chapter.title;
    viewerPage.textContent = String(state.viewerPage + 1).padStart(2, "0");
    viewerPageTotal.textContent = String(sections.length).padStart(2, "0");
    viewerProgressBar.style.width = `${((state.viewerPage + 1) / sections.length) * 100}%`;
    viewerSectionLabel.textContent = section.label;
    viewerSectionTitle.textContent = section.title;
    viewerLead.textContent = section.lead;
    const contentOnly = Boolean(section.contentOnly);
    viewerLayout?.classList.toggle("content-only", contentOnly);
    viewerVisual?.classList.toggle("hidden", contentOnly);
    viewerParagraphs.innerHTML = "";
    section.paragraphs.forEach((paragraph) => {
      const node = document.createElement("p");
      node.textContent = paragraph;
      viewerParagraphs.append(node);
    });
    state.viewerImage = clamp(state.viewerImage, 0, Math.max(0, section.images.length - 1));
    renderViewerImage(section);

    const isPrimary = state.viewerArtworkIndex === 0;
    setViewerButtonLabel(isPrimary ? "GHI NHẬN & ĐÓNG" : "ĐÓNG TRANH");
    viewerNote.textContent = isPrimary
      ? "Đây là tranh chính của phòng. Đọc hồ sơ này rồi ghi nhận để mở cổng tiếp theo."
      : "Hồ sơ bổ sung của riêng bức tranh này. Đóng lại để tiếp tục tham quan phòng.";
    updateUi();
  }

  function openContentViewer(chapterId, sectionIndex = 0) {
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
    state.viewerArtworkIndex = clamp(Number.isInteger(sectionIndex) ? sectionIndex : 0, 0, chapter.sections.length - 1);
    state.viewerPage = state.viewerArtworkIndex;
    state.viewerImage = 0;
    document.exitPointerLock?.();
    contentViewer.classList.remove("hidden");
    renderViewer();
    return true;
  }

  function closeContentViewer() {
    state.viewerOpen = false;
    state.viewerChapter = null;
    state.viewerPage = 0;
    state.viewerArtworkIndex = 0;
    state.viewerImage = 0;
    contentViewer.classList.add("hidden");
    closeLightbox();
    updateUi();
  }

  function completeChapter(chapterId) {
    const chapter = contentById.get(chapterId);
    if (!chapter || !state.viewedPages.has(`${chapterId}:0`)) return false;
    state.evidence.add(chapterId);
    updateGateMeshes();
    updateUi();
    return true;
  }

  function nextViewerPage() {
    const chapter = activeChapter();
    if (!chapter) return;
    if (state.viewerArtworkIndex === 0 && !state.evidence.has(chapter.id)) completeChapter(chapter.id);
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
      state.passedGates.add(item.id);
      state.player.z = item.z - 2.4;
      updateGateMeshes();
      updateUi();
      return;
    }
    if (item.kind === "curator") {
      openDialogue(item);
      return;
    }
    openContentViewer(item.chapterId, item.sectionIndex ?? 0);
  }

  function makeArtworkTexture(room) {
    if (!THREE) return null;
    const artCanvas = document.createElement("canvas");
    const logicalWidth = 900;
    const logicalHeight = 560;
    artCanvas.width = 720;
    artCanvas.height = 448;
    const art = artCanvas.getContext("2d");
    art.scale(.8, .8);
    const palette = {
      production: ["#242326", "#bd6b4e", "#dda967", "#e6d7bd"],
      class: ["#27252a", "#d2a35e", "#9e504b", "#f1dfbd"],
      state: ["#283235", "#8da69e", "#d4b478", "#f0e5d0"],
      revolt: ["#29262a", "#bd4e58", "#e8a06c", "#f2d1a0"]
    }[room.artwork];
    art.fillStyle = palette[0];
    art.fillRect(0, 0, logicalWidth, logicalHeight);
    const wash = art.createLinearGradient(0, 0, logicalWidth, logicalHeight);
    wash.addColorStop(0, `${palette[1]}cc`);
    wash.addColorStop(.48, `${palette[0]}00`);
    wash.addColorStop(1, `${palette[2]}bb`);
    art.fillStyle = wash;
    art.fillRect(0, 0, logicalWidth, logicalHeight);
    art.globalAlpha = .34;
    for (let index = 0; index < 13; index += 1) {
      art.fillStyle = index % 2 ? palette[2] : palette[1];
      art.fillRect(30 + index * 73, 35 + (index % 4) * 56, 180 + (index % 3) * 85, 20 + (index % 3) * 16);
    }
    art.globalAlpha = .9;
    art.strokeStyle = palette[3];
    art.lineWidth = 8;
    art.beginPath();
    if (room.artwork === "production") {
      art.moveTo(60, 410); art.lineTo(250, 180); art.lineTo(420, 370); art.lineTo(635, 120); art.lineTo(840, 300);
      art.stroke();
      art.fillStyle = palette[2]; art.fillRect(110, 430, 700, 42);
    } else if (room.artwork === "class") {
      art.moveTo(450, 32); art.lineTo(450, 525); art.stroke();
      art.fillStyle = `${palette[1]}d9`; art.fillRect(58, 120, 270, 310);
      art.fillStyle = `${palette[2]}d9`; art.fillRect(575, 208, 270, 222);
      art.strokeStyle = palette[3]; art.lineWidth = 5; art.strokeRect(58, 120, 270, 310); art.strokeRect(575, 208, 270, 222);
    } else if (room.artwork === "state") {
      art.fillStyle = `${palette[1]}b8`;
      art.fillRect(90, 120, 110, 330); art.fillRect(285, 72, 110, 378); art.fillRect(480, 155, 110, 295); art.fillRect(675, 98, 110, 352);
      art.strokeStyle = palette[3]; art.lineWidth = 5; art.beginPath(); art.moveTo(42, 458); art.lineTo(855, 458); art.stroke();
    } else {
      art.strokeStyle = palette[2]; art.lineWidth = 12; art.beginPath();
      art.moveTo(450, 8); art.lineTo(390, 142); art.lineTo(505, 254); art.lineTo(365, 378); art.lineTo(470, 548); art.stroke();
      art.fillStyle = `${palette[1]}aa`; art.fillRect(50, 410, 280, 70); art.fillRect(590, 88, 250, 70);
    }
    art.globalAlpha = 1;
    art.strokeStyle = "rgba(255,247,233,.7)";
    art.lineWidth = 10;
    art.strokeRect(18, 18, logicalWidth - 36, logicalHeight - 36);
    const texture = new THREE.CanvasTexture(artCanvas);
    if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.anisotropy = 1;
    return texture;
  }

  function addBox(size, position, material, options = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    worldGroup.add(mesh);
    return mesh;
  }

  const ARTWORK_ASPECTS = Object.freeze({
    "./assets/ch01-engels.webp": 384 / 522,
    "./assets/ch01-lenin.webp": 660 / 892,
    "./assets/ch01-state-institutions.webp": 888 / 578,
    "./assets/ch02-state-functions.webp": 1280 / 244,
    "./assets/ch02-state-form.webp": 1272 / 850,
    "./assets/ch02-slave-state.webp": 1024 / 680,
    "./assets/ch02-bourgeois-transition.webp": 1140 / 814,
    "./assets/ch03-marx.webp": 482 / 622,
    "./assets/ch03-soviet-state.webp": 1040 / 818,
    "./assets/ch03-ho-chi-minh.webp": 884 / 738,
    "./assets/ch03-vietnam-socialism.webp": 926 / 570,
    "./assets/ch03-vietnam-state.webp": 904 / 508,
    "./assets/ch04-revolution-origin.webp": 938 / 632,
    "./assets/ch04-revolution-force.webp": 1086 / 738,
    "./assets/ch04-revolution-method.webp": 1158 / 718
  });

  function paintingDimensions(spec, aspect = ARTWORK_ASPECTS[spec.image] || 1.6) {
    const maxHeight = spec.height || 3.2;
    const maxWidth = spec.maxWidth || 4.8;
    let width = Math.min(maxWidth, maxHeight * aspect);
    let height = width / aspect;
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }
    return { width, height };
  }

  function addPainting(room, spec, index) {
    const dimensions = paintingDimensions(spec);
    const rightWall = spec.wall === "right";
    const frameX = rightWall ? 6.82 : -6.82;
    const surfaceX = rightWall ? 6.64 : -6.64;
    const backingX = rightWall ? 6.655 : -6.655;
    const rotation = rightWall ? -Math.PI / 2 : Math.PI / 2;
    const artworkY = spec.y || 3.15;
    const artworkZ = room.centerZ + (spec.zOffset || 0);
    const frameMaterial = new THREE.MeshLambertMaterial({ color: Number.parseInt(room.accent.slice(1), 16) });
    const frame = addBox([.28, dimensions.height + .44, dimensions.width + .44], [frameX, artworkY, artworkZ], frameMaterial);
    frame.name = `frame-${room.id}-${index + 1}`;
    const artworkBacking = new THREE.Mesh(
      new THREE.PlaneGeometry(dimensions.width, dimensions.height),
      new THREE.MeshBasicMaterial({ color: 0x171516, side: THREE.DoubleSide })
    );
    artworkBacking.position.set(backingX, artworkY, artworkZ);
    artworkBacking.rotation.y = rotation;
    worldGroup.add(artworkBacking);
    const artworkMaterial = new THREE.MeshBasicMaterial({ map: makeArtworkTexture(room), side: THREE.DoubleSide });
    const artwork = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width, dimensions.height), artworkMaterial);
    artwork.name = `artwork-${room.id}-${index + 1}`;
    artwork.position.set(surfaceX, artworkY, artworkZ);
    artwork.rotation.y = rotation;
    artwork.castShadow = false;
    worldGroup.add(artwork);
    const ledge = addBox(
      [.22, .18, dimensions.width * .72],
      [rightWall ? 6.58 : -6.58, artworkY - dimensions.height / 2 - .30, artworkZ],
      frameMaterial
    );

    const fitArtworkToFrame = (texture) => {
      const width = Number(texture?.image?.width) || 900;
      const height = Number(texture?.image?.height) || 560;
      const nextDimensions = paintingDimensions(spec, width / Math.max(1, height));
      frame.geometry.dispose();
      frame.geometry = new THREE.BoxGeometry(.28, nextDimensions.height + .44, nextDimensions.width + .44);
      artworkBacking.geometry.dispose();
      artworkBacking.geometry = new THREE.PlaneGeometry(nextDimensions.width, nextDimensions.height);
      artwork.geometry.dispose();
      artwork.geometry = new THREE.PlaneGeometry(nextDimensions.width, nextDimensions.height);
      ledge.geometry.dispose();
      ledge.geometry = new THREE.BoxGeometry(.22, .18, nextDimensions.width * .72);
      ledge.position.y = artworkY - nextDimensions.height / 2 - .30;
    };
    if (spec.image && textureLoader) {
      textureLoader.load(spec.image, (texture) => {
        if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.anisotropy = 1;
        artworkMaterial.map = texture;
        artworkMaterial.needsUpdate = true;
        fitArtworkToFrame(texture);
      }, undefined, (error) => console.warn(`THE STATE artwork fallback: ${room.id}-${index + 1}`, error));
    }
  }

  function makeHonorPlaqueTexture(honor) {
    const plaqueCanvas = document.createElement("canvas");
    plaqueCanvas.width = 640;
    plaqueCanvas.height = 128;
    const plaque = plaqueCanvas.getContext("2d");
    plaque.fillStyle = "#2f292a";
    plaque.fillRect(0, 0, plaqueCanvas.width, plaqueCanvas.height);
    plaque.strokeStyle = "#d6ae6c";
    plaque.lineWidth = 3;
    plaque.strokeRect(8, 8, plaqueCanvas.width - 16, plaqueCanvas.height - 16);
    plaque.fillStyle = "#f4ecdf";
    plaque.font = "600 25px 'DM Sans', sans-serif";
    plaque.fillText(honor.name.toUpperCase(), 30, 53);
    plaque.fillStyle = "#d6ae6c";
    plaque.font = "500 17px 'DM Mono', monospace";
    plaque.fillText(honor.role, 30, 91);
    const texture = new THREE.CanvasTexture(plaqueCanvas);
    if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.anisotropy = 1;
    return texture;
  }

  function addHonorPortrait(room) {
    const honor = ROOM_HONORS[room.id];
    if (!honor) return;
    const group = new THREE.Group();
    group.name = `honor-display-${room.id}`;
    group.position.set(0, 0, room.centerZ + .65);

    const frameMaterial = new THREE.MeshLambertMaterial({ color: Number.parseInt(room.accent.slice(1), 16) });
    const pedestalMaterial = new THREE.MeshLambertMaterial({ color: 0x403a38 });
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x171516, side: THREE.DoubleSide });
    const portraitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, toneMapped: false });
    const dimensions = paintingDimensions({ image: honor.image, height: 2.2, maxWidth: 2.15 });
    const portraitY = 1.10 + dimensions.height / 2;
    const plaqueWidth = Math.min(2.7, dimensions.width + .70);

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.95, .24, 1.16), pedestalMaterial);
    plinth.position.set(0, .12, 0);
    group.add(plinth);
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(1.42, .72, .88), pedestalMaterial);
    pedestal.position.set(0, .60, 0);
    group.add(pedestal);
    const pedestalCap = new THREE.Mesh(new THREE.BoxGeometry(1.62, .10, 1.00), frameMaterial);
    pedestalCap.position.set(0, .99, 0);
    group.add(pedestalCap);

    const frame = new THREE.Mesh(new THREE.BoxGeometry(dimensions.width + .34, dimensions.height + .34, .16), frameMaterial);
    frame.position.set(0, portraitY, -.10);
    group.add(frame);
    const backing = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width, dimensions.height), darkMaterial);
    backing.position.set(0, portraitY, -.20);
    group.add(backing);
    const portrait = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width, dimensions.height), portraitMaterial);
    portrait.name = `honor-portrait-${room.id}`;
    portrait.position.set(0, portraitY, .01);
    group.add(portrait);

    const plaqueBase = new THREE.Mesh(new THREE.BoxGeometry(plaqueWidth, .24, .07), frameMaterial);
    plaqueBase.position.set(0, 1.16, .25);
    group.add(plaqueBase);
    const plaqueMaterial = new THREE.MeshBasicMaterial({ map: makeHonorPlaqueTexture(honor), side: THREE.DoubleSide });
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(plaqueWidth - .08, .20), plaqueMaterial);
    plaque.name = `honor-plaque-${room.id}`;
    plaque.position.set(0, 1.16, .292);
    group.add(plaque);

    if (textureLoader) {
      textureLoader.load(honor.image, (texture) => {
        if ("colorSpace" in texture && THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = 1;
        portraitMaterial.map = texture;
        portraitMaterial.needsUpdate = true;
      }, undefined, (error) => console.warn(`THE STATE honor portrait fallback: ${room.id}`, error));
    }
    worldGroup.add(group);
  }

  function addRoomDecor(room) {
    const length = room.zBack - room.zFront;
    const carpetLength = Math.max(6, length - 1.4);
    const carpetMaterial = new THREE.MeshLambertMaterial({ color: 0x65232d });
    const carpetTrimMaterial = new THREE.MeshLambertMaterial({ color: 0x9a754e });
    const roomTrimMaterial = new THREE.MeshLambertMaterial({ color: Number.parseInt(room.accent.slice(1), 16) });

    const carpet = addBox([2.8, .055, carpetLength], [0, .145, room.centerZ], carpetMaterial);
    carpet.name = `carpet-${room.id}`;
    [-1.29, 1.29].forEach((x) => {
      const edge = addBox([.055, .07, carpetLength], [x, .185, room.centerZ], carpetTrimMaterial);
      edge.name = `carpet-edge-${room.id}`;
    });
    [room.zFront + .72, room.zBack - .72].forEach((z) => {
      const end = addBox([2.8, .07, .055], [0, .185, z], carpetTrimMaterial);
      end.name = `carpet-end-${room.id}`;
    });

    room.artworks.forEach((artwork, index) => {
      const rightWall = artwork.wall === "right";
      const plaque = addBox(
        [.08, .10, .82],
        [rightWall ? 6.35 : -6.35, .19, room.centerZ + (artwork.zOffset || 0)],
        roomTrimMaterial
      );
      plaque.name = `plaque-${room.id}-${index + 1}`;
    });
  }

  function addPlant(room, spec, index) {
    const group = new THREE.Group();
    group.name = `plant-${room.id}-${index + 1}`;
    group.position.set(spec.side * 5.85, 0, room.centerZ + spec.zOffset);

    const potMaterial = new THREE.MeshLambertMaterial({ color: index % 2 ? 0x8b5144 : 0x6f413d });
    const potRimMaterial = new THREE.MeshLambertMaterial({ color: index % 2 ? 0xb87558 : 0x9f604d });
    const plinthMaterial = new THREE.MeshLambertMaterial({ color: 0x403a38 });
    const soilMaterial = new THREE.MeshLambertMaterial({ color: 0x25201f });
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x5a4032 });
    const foliageMaterials = [
      new THREE.MeshLambertMaterial({ color: index % 2 ? 0x466b55 : 0x385b49 }),
      new THREE.MeshLambertMaterial({ color: index % 2 ? 0x62816a : 0x53745e }),
      new THREE.MeshLambertMaterial({ color: index % 2 ? 0x789276 : 0x6a876f })
    ];

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(.72, .78, .12, 10), plinthMaterial);
    plinth.name = `plant-plinth-${room.id}-${index + 1}`;
    plinth.position.y = .17;
    group.add(plinth);
    const plinthCap = new THREE.Mesh(new THREE.CylinderGeometry(.61, .61, .08, 10), potRimMaterial);
    plinthCap.position.y = .27;
    group.add(plinthCap);

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(.54, .42, .62, 10), potMaterial);
    pot.name = `plant-pot-${room.id}-${index + 1}`;
    pot.position.y = .68;
    group.add(pot);
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(.61, .61, .11, 10), potRimMaterial);
    rim.position.y = 1.045;
    group.add(rim);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(.49, .49, .035, 10), soilMaterial);
    soil.position.y = 1.115;
    group.add(soil);

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.12, .18, 1.34, 7), trunkMaterial);
    trunk.position.y = 1.79;
    group.add(trunk);
    const branches = [
      { x: -.27, y: 2.27, z: 0, length: .82, rotationZ: -.56, rotationX: 0 },
      { x: .27, y: 2.30, z: .02, length: .88, rotationZ: .54, rotationX: 0 },
      { x: 0, y: 2.45, z: .20, length: .68, rotationZ: 0, rotationX: -.52 }
    ];
    branches.forEach((branch) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(.055, .095, branch.length, 6), trunkMaterial);
      mesh.position.set(branch.x, branch.y, branch.z);
      mesh.rotation.z = branch.rotationZ;
      mesh.rotation.x = branch.rotationX;
      group.add(mesh);
    });

    const canopy = [
      { x: 0, y: 2.72, z: 0, scale: [1.08, .76, .90], rotation: 0 },
      { x: -.48, y: 2.70, z: .02, scale: [.86, .68, .72], rotation: -.16 },
      { x: .50, y: 2.74, z: -.02, scale: [.88, .70, .74], rotation: .14 },
      { x: 0, y: 3.12, z: .03, scale: [.82, .70, .72], rotation: 0 },
      { x: -.28, y: 2.96, z: -.30, scale: [.70, .58, .62], rotation: -.18 },
      { x: .30, y: 2.98, z: -.28, scale: [.72, .60, .64], rotation: .18 }
    ];
    canopy.forEach((leaf, leafIndex) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(.48, 8, 6), foliageMaterials[leafIndex % foliageMaterials.length]);
      mesh.name = `plant-canopy-${room.id}-${index + 1}-${leafIndex + 1}`;
      mesh.position.set(leaf.x, leaf.y, leaf.z);
      mesh.scale.set(leaf.scale[0], leaf.scale[1], leaf.scale[2]);
      mesh.rotation.z = leaf.rotation;
      group.add(mesh);
    });
    worldGroup.add(group);
  }

  function addRoomPlants(room) {
    const plants = ROOM_PLANTS[room.id] ?? [];
    plants.forEach((plant, index) => addPlant(room, plant, index));
  }

  function addRoom(room) {
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x665954 });
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x514845 });
    const trimMaterial = new THREE.MeshLambertMaterial({ color: Number.parseInt(room.color.slice(1), 16) });
    const length = room.zBack - room.zFront;
    addBox([14, .22, length], [0, 0, room.centerZ], floorMaterial, { receiveShadow: true });
    addBox([.26, 5.5, length], [-7, 2.75, room.centerZ], wallMaterial);
    addBox([.26, 5.5, length], [7, 2.75, room.centerZ], wallMaterial);
    addBox([14, .22, length], [0, 5.6, room.centerZ], new THREE.MeshLambertMaterial({ color: 0x3c3738 }));
    addBox([4.3, 5.5, .28], [-4.55, 2.75, room.zFront], wallMaterial);
    addBox([4.3, 5.5, .28], [4.55, 2.75, room.zFront], wallMaterial);
    addBox([4.4, .95, .28], [0, 5.08, room.zFront], wallMaterial);
    addBox([.06, .08, length - .6], [0, .13, room.centerZ], new THREE.MeshLambertMaterial({ color: 0x806e61 }));
    addBox([.12, .12, length - .6], [-6.82, .18, room.centerZ], trimMaterial);
    addBox([.12, .12, length - .6], [6.82, .18, room.centerZ], trimMaterial);
    addRoomDecor(room);
    addHonorPortrait(room);
    addRoomPlants(room);
    room.artworks.forEach((artwork, index) => addPainting(room, artwork, index));
  }

  function addGate(gate) {
    const material = new THREE.MeshLambertMaterial({ color: 0x492f34, emissive: 0x210e13, emissiveIntensity: .28 });
    const accentMaterial = new THREE.MeshLambertMaterial({ color: 0xc67b53, emissive: 0x2c1515, emissiveIntensity: .35 });
    addBox([.38, 4.65, .46], [-2.35, 2.35, gate.z], accentMaterial);
    addBox([.38, 4.65, .46], [2.35, 2.35, gate.z], accentMaterial);
    addBox([5.08, .38, .46], [0, 4.55, gate.z], accentMaterial);
    const door = addBox([4.25, 4.25, .10], [0, 2.15, gate.z], material);
    gateMeshes.set(gate.id, { door, accentMaterial, gate });
  }

  function updateGateMeshes() {
    for (const entry of gateMeshes.values()) {
      const open = gatePassed(entry.gate);
      entry.door.visible = !open;
      const color = gateUnlocked(entry.gate) ? 0xd6ae6c : 0xbd5c5d;
      entry.accentMaterial.color.setHex(color);
      entry.accentMaterial.emissive.setHex(gateUnlocked(entry.gate) ? 0x4a3016 : 0x3d1118);
    }
  }

  function initThreeGallery() {
    if (renderer) return;
    if (!THREE) {
      if (typeof canvas?.getContext === "function") {
        reportRuntimeError("Không tải được bộ máy Three.js local. Kiểm tra dist/vendor/three.min.js rồi tải lại trang.");
      }
      return;
    }
    try {
      const size = viewport();
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PERFORMANCE.maxPixelRatio));
      renderer.setSize(size.width, size.height, false);
      if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = false;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x302d2e);
      scene.fog = new THREE.Fog(0x302d2e, 28, 104);
      camera = new THREE.PerspectiveCamera(72, size.width / size.height, .1, 130);
      camera.rotation.order = "YXZ";
      clock = new THREE.Clock();
      worldGroup = new THREE.Group();
      scene.add(worldGroup);
      textureLoader = new THREE.TextureLoader();
      scene.add(new THREE.HemisphereLight(0xf5e6d0, 0x332c2b, 1.4));
      const keyLight = new THREE.DirectionalLight(0xffe8c3, 1.0);
      keyLight.position.set(-5, 10, 8);
      scene.add(keyLight);
      rooms.forEach(addRoom);
      gates.forEach(addGate);
      updateGateMeshes();
      updateCamera();
    } catch (error) {
      renderer = null;
      reportRuntimeError("Trình duyệt không khởi tạo được WebGL cho không gian này. Hãy thử tải lại hoặc dùng Chrome/Brave với WebGL được bật.");
      console.warn("THE STATE WebGL fallback:", error);
    }
  }

  function updateCamera() {
    if (!camera) return;
    camera.position.set(state.player.x, PLAYER.height, state.player.z);
    camera.rotation.set(state.look.pitch, state.look.yaw, 0);
  }

  function renderFrame() {
    if (!renderer || !scene || !camera) return;
    updateCamera();
    renderer.render(scene, camera);
  }

  function scheduleLoop() {
    if (state.frameRequested || !state.running) return;
    state.frameRequested = true;
    requestAnimationFrame(loop);
  }

  function loop(timestamp) {
    state.frameRequested = false;
    if (!state.running) return;
    const dt = Math.min((timestamp - state.lastTime) / 1000, .05);
    state.lastTime = timestamp;
    state.time += dt;
    if (!state.dialogueOpen && !state.viewerOpen) {
      let forward = 0;
      let strafe = 0;
      if (keys.has("w") || keys.has("arrowup")) forward += 1;
      if (keys.has("s") || keys.has("arrowdown")) forward -= 1;
      if (keys.has("a") || keys.has("arrowleft")) strafe -= 1;
      if (keys.has("d") || keys.has("arrowright")) strafe += 1;
      if (forward || strafe) {
        const sin = Math.sin(state.look.yaw);
        const cos = Math.cos(state.look.yaw);
        move(strafe * cos - forward * sin, -strafe * sin - forward * cos, dt);
      }
      state.uiAccumulator += dt;
      if (state.uiAccumulator >= PERFORMANCE.uiInterval) {
        state.uiAccumulator = 0;
        updateUi();
      }
    }
    renderFrame();
    scheduleLoop();
  }

  function showEnding() {
    state.running = false;
    state.viewerOpen = false;
    state.dialogueOpen = false;
    document.exitPointerLock?.();
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
    document.exitPointerLock?.();
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
    document.exitPointerLock?.();
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
    else if (key === "escape") document.exitPointerLock?.();
    else keys.add(key);
  }

  function handleKeyUp(event) { keys.delete(event.key.toLowerCase()); }

  function handleMouseMove(event) {
    if (!state.running || state.dialogueOpen || state.viewerOpen || document.pointerLockElement !== canvas) return;
    state.look.yaw -= event.movementX * .0024;
    state.look.pitch = clamp(state.look.pitch - event.movementY * .0021, -1.25, 1.25);
  }

  function resize() {
    if (!renderer || !camera) return;
    const size = viewport();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PERFORMANCE.maxPixelRatio));
    renderer.setSize(size.width, size.height, false);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }

  canvas.addEventListener("click", () => {
    if (state.running && !state.dialogueOpen && !state.viewerOpen) canvas.requestPointerLock?.();
  });
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    reportRuntimeError("WebGL vừa bị mất kết nối. Hãy tải lại trang để khôi phục không gian 3D.");
  });
  document.addEventListener?.("pointerlockchange", updateUi);
  document.addEventListener?.("mousemove", handleMouseMove);
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("blur", () => keys.clear());
  document.getElementById("start-button").addEventListener("click", start);
  document.getElementById("restart-button").addEventListener("click", start);
  document.getElementById("quit-button").addEventListener("click", quitGame);
  document.getElementById("ending-exit-button").addEventListener("click", quitGame);
  document.getElementById("return-title-button").addEventListener("click", returnToTitle);
  runtimeReloadButton?.addEventListener("click", () => window.location.reload());
  document.getElementById("theory-button").addEventListener("click", () => theoryNote.classList.toggle("hidden"));
  dialogueClose.addEventListener("click", closeDialogue);
  viewerClose.addEventListener("click", closeContentViewer);
  viewerNext.addEventListener("click", nextViewerPage);
  viewerPrevImage.addEventListener("click", () => cycleImage(-1));
  viewerNextImage.addEventListener("click", () => cycleImage(1));
  viewerImage.addEventListener("click", openLightbox);
  lightboxClose.addEventListener("click", closeLightbox);
  imageLightbox.querySelector(".image-lightbox-backdrop")?.addEventListener("click", closeLightbox);

  updateUi();

  window.__THE_STATE__ = {
    state,
    rooms,
    roomPlants: ROOM_PLANTS,
    roomHonors: ROOM_HONORS,
    gates,
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
    drawWorld: renderFrame,
    updateUi
  };
})();
