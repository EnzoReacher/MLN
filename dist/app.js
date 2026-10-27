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

  // Gamification DOM
  const starCount = document.getElementById("star-count");
  const gameToast = document.getElementById("game-toast");
  let toastTimer = null;

  function showToast(text, duration = 3000) {
    if (!gameToast) return;
    gameToast.textContent = text;
    gameToast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      gameToast.classList.add("hidden");
    }, duration);
  }

  function playStarSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.52);
    } catch (e) { }
  }

  const quizUi = document.getElementById("quiz-ui");
  const quizTitle = document.getElementById("quiz-title");
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizCloseButton = document.getElementById("quiz-close-button");

  const numpadUi = document.getElementById("numpad-ui");
  const numpadDisplay = document.getElementById("numpad-display");
  const numpadBtns = typeof document.querySelectorAll === "function" ? document.querySelectorAll(".numpad-btn[data-val]") : [];
  const numpadClear = document.getElementById("numpad-clear");
  const numpadSubmit = document.getElementById("numpad-submit");
  const numpadFeedback = document.getElementById("numpad-feedback");
  const numpadCloseButton = document.getElementById("numpad-close-button");
  const numpadHintText = document.getElementById("numpad-hint-text");
  const numpadRequestHint = document.getElementById("numpad-request-hint");
  let numpadInput = "";

  // Multiplayer Lobby DOM Elements
  const startRoomInput = document.getElementById("start-room-input");
  const roomInputError = document.getElementById("room-input-error");
  const backToMenuButton = document.getElementById("back-to-menu-button");
  const waitingLobby = document.getElementById("waiting-lobby");
  const lobbyRoomCode = document.getElementById("lobby-room-code");
  const lobbyPlayerName = document.getElementById("lobby-player-name");
  const lobbyStatusText = document.getElementById("lobby-status-text");
  const lobbyPlayerCount = document.getElementById("lobby-player-count");
  const lobbyPlayerList = document.getElementById("lobby-player-list");
  const leaveLobbyButton = document.getElementById("leave-lobby-button");

  let currentRoomCode = null;
  let lobbyPollInterval = null;

  const endingTime = document.getElementById("ending-time");
  const endingScore = document.getElementById("ending-score");
  const leaderboardSection = document.getElementById("leaderboard-section");
  const leaderboardFormContainer = document.getElementById("leaderboard-form-container");
  const playerNameInput = document.getElementById("player-name-input");
  const submitScoreButton = document.getElementById("submit-score-button");
  const leaderboardLoading = document.getElementById("leaderboard-loading");
  const leaderboardList = document.getElementById("leaderboard-list");

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
  const testModeBadge = document.getElementById("test-mode-badge");

  const setInterval = typeof globalThis !== "undefined" && typeof globalThis.setInterval === "function"
    ? globalThis.setInterval
    : (typeof window !== "undefined" && typeof window.setInterval === "function" ? window.setInterval : () => null);
  const clearInterval = typeof globalThis !== "undefined" && typeof globalThis.clearInterval === "function"
    ? globalThis.clearInterval
    : (typeof window !== "undefined" && typeof window.clearInterval === "function" ? window.clearInterval : () => {});

  const THREE = window.THREE || null;
  const TEST_MODE = typeof URLSearchParams === "function"
    && typeof window.location?.search === "string"
    && ["1", "true", "yes"].includes(new URLSearchParams(window.location.search).get("test")?.toLowerCase());
  const TEST_BOUNDS = { halfWidth: 20, minZ: -105, maxZ: 24 };
  const keys = new Set();
  const PLAYER = { height: 1.65, speed: 5.2 };
  const PERFORMANCE = { maxPixelRatio: 1.25, uiInterval: .05 };
  const GALLERY = { halfWidth: 7, roomHeight: 5.5, minZ: -88, maxZ: 9 };
  const KVDB_BUCKET = "ADkjsg26cP3urgwo94ctcg";

  const QUIZZES = {
    "gate-class": [
      {
        question: "1/4: Nền kinh tế thị trường được hiểu một cách chính xác là gì?",
        options: [
          "Nền kinh tế hoàn toàn do Nhà nước chỉ huy phân bổ hiện vật",
          "Nền kinh tế hàng hóa phát triển cao, vận hành theo cơ chế thị trường",
          "Nền kinh tế tự cấp tự túc khép kín của từng hộ gia đình",
          "Nền kinh tế chỉ trao đổi sản phẩm dư thừa không thông qua tiền tệ"
        ],
        correct: 1
      },
      {
        question: "2/4: Động lực trực tiếp của các chủ thể sản xuất kinh doanh trong nền KTTT là gì?",
        options: [
          "Lợi nhuận và các lợi ích kinh tế - xã hội",
          "Sự bao cấp tuyệt đối từ ngân sách nhà nước",
          "Chỉ nhằm mục tiêu quảng bá danh tiếng cá nhân",
          "Chỉ phân phát miễn phí hàng hóa cho cộng đồng"
        ],
        correct: 0
      },
      {
        question: "3/4: Khuyết tật nào của kinh tế thị trường mà tự nó KHÔNG THỂ tự khắc phục được?",
        options: [
          "Cạn kiệt tài nguyên, suy thoái môi trường và phân hóa giàu nghèo sâu sắc",
          "Năng suất lao động xã hội tăng quá nhanh",
          "Chủng loại hàng hóa và dịch vụ ngày càng phong phú",
          "Kích thích sự sáng tạo và đổi mới của các chủ thể kinh doanh"
        ],
        correct: 0
      },
      {
        question: "4/4: Vì sao trong thực tế luôn cần sự can thiệp và điều tiết của Nhà nước?",
        options: [
          "Để triệt tiêu hoàn toàn quyền tự do kinh doanh của người dân",
          "Để sửa chữa những thất bại của thị trường và bảo đảm ổn định kinh tế vĩ mô",
          "Để áp đặt chế độ bao cấp tuyệt đối như thời kỳ kinh tế tự nhiên",
          "Để xóa bỏ các quy luật kinh tế khách quan của thị trường"
        ],
        correct: 1
      }
    ],
    "gate-state": {
      question: "Đặc trưng cơ bản của Nhà nước là gì?",
      options: ["Quản lý dân cư theo lãnh thổ", "Dựa vào quan hệ huyết thống", "Tự nguyện nộp thuế", "Chỉ có chức năng bảo vệ"],
      correct: 0
    },
    "gate-revolt": [
      {
        question: "Theo quy luật cung – cầu, khi cung lớn hơn cầu thì quan hệ giữa giá cả và giá trị sẽ như thế nào?",
        options: [
          "Giá cả thấp hơn giá trị",
          "Giá cả cao hơn giá trị",
          "Giá cả bằng giá trị",
          "Giá cả tăng cao độc lập với giá trị"
        ],
        correct: 0
      },
      {
        question: "Theo quy luật lưu thông tiền tệ (M = P.Q / V), lượng tiền cần thiết (M) có mối quan hệ gì với tổng giá cả (P.Q) và tốc độ lưu thông (V)?",
        options: [
          "Tỷ lệ thuận với tổng giá cả hàng hóa và tỷ lệ nghịch với tốc độ lưu thông tiền tệ",
          "Tỷ lệ nghịch với tổng giá cả hàng hóa và tỷ lệ thuận với tốc độ lưu thông tiền tệ",
          "Tỷ lệ thuận với cả tổng giá cả hàng hóa và tốc độ lưu thông tiền tệ",
          "Không phụ thuộc vào lưu thông hàng hóa mà do quy định chủ quan của nhà nước"
        ],
        correct: 0
      },
      {
        question: "Hậu quả tất yếu khi tiền giấy được in và phát hành vượt quá yêu cầu của lưu thông hàng hóa là gì?",
        options: [
          "Đồng tiền mất giá trị, giá cả hàng hóa leo thang dẫn tới lạm phát",
          "Sức mua của người tiêu dùng tăng mạnh và thúc đẩy tăng trưởng vượt bậc",
          "Làm giảm chi phí sản xuất và cân bằng lại cung cầu tức thì",
          "Không có tác động gì vì tiền giấy lưu hành theo luật định"
        ],
        correct: 0
      }
    ],
    "gate-end": {
      question: "Vận dụng: Kinh tế số có còn tuân theo quy luật cung – cầu truyền thống?",
      options: [
        "Vẫn tuân theo bản chất, nhưng biểu hiện linh hoạt và tốc độ phản ứng nhanh hơn nhờ dữ liệu và thuật toán số",
        "Không còn tuân theo, vì kinh tế số đã xóa bỏ hoàn toàn mối quan hệ cung – cầu của thị trường truyền thống",
        "Hoàn toàn rập khuôn như truyền thống, công nghệ không làm thay đổi tốc độ hay phương thức điều tiết giá cả",
        "Không, vì thuật toán trên nền tảng số tự ý ấn định giá độc quyền mà không phụ thuộc nhu cầu thực tế"
      ],
      correct: 0
    }
  };

  const STARS_POSITIONS = [
    // Room 1: Điều kiện vật chất (centerZ = 0)
    { id: "star-1", x: -4.2, z: -4.5, y: 0.16, room: "base", hint: "Dưới gầm ghế băng ngắm tranh" },
    { id: "star-2", x: -6.4, z: 8.25, y: 0.28, room: "base", hint: "Góc khuất chậu cây cảnh" },
    // Room 2: Giai cấp & Sở hữu (centerZ = -24)
    { id: "star-3", x: -6.4, z: -15.75, y: 0.28, room: "class", hint: "Góc khuất chậu cây cảnh" },
    { id: "star-4", x: 3.8, z: -27.2, y: 0.16, room: "class", hint: "Dưới gầm ghế băng ngắm tranh" },
    // Room 3: Nhà nước & Quyền lực (centerZ = -48)
    { id: "star-5", x: -6.4, z: -39.75, y: 0.28, room: "state", hint: "Góc khuất chậu cây cảnh" },
    { id: "star-6", x: 5.2, z: -40.5, y: 0.28, room: "state", hint: "Khuất sau bệ tượng đồng điêu khắc" },
    // Room 4: Mâu thuẫn & Chuyển hóa (centerZ = -72)
    { id: "star-7", x: 0, z: -72.8, y: 0.15, room: "revolt", hint: "Nằm sát đất phía sau đế bức tranh" },
    { id: "star-8", x: -3.8, z: -75.8, y: 0.16, room: "revolt", hint: "Dưới gầm ghế băng ngắm tranh" }
  ];

  const rooms = [
    {
      id: "base", index: "01", name: "KINH TẾ THỊ TRƯỜNG", label: "MARKET ECONOMY", centerZ: 0, zBack: 10, zFront: -10,
      color: "#c67b53", accent: "#e1b46d", artwork: "production", artworkImage: "./assets/ktct-ch01-market-concept.webp",
      artworks: [
        { image: "./assets/ktct-ch01-market-concept.webp", wall: "left", zOffset: 0, height: 2.85, maxWidth: 4.8 },
        { image: "./assets/ktct-ch01-market-failure.webp", wall: "right", zOffset: -5.4, height: 2.9, maxWidth: 4.7 },
        { image: "./assets/ktct-ch01-state-regulation.webp", wall: "right", zOffset: 5.4, height: 2.65, maxWidth: 4.85 }
      ]
    },
    {
      id: "class", index: "02", name: "QUY LUẬT GIÁ TRỊ", label: "LAW OF VALUE", centerZ: -24, zBack: -14, zFront: -34,
      color: "#d6a75e", accent: "#f0d394", artwork: "class", artworkImage: "./assets/ktct-ch02-law-of-value.webp",
      artworks: [
        { image: "./assets/ktct-ch02-law-of-value.webp", wall: "left", zOffset: 0, height: 2.85, maxWidth: 4.8 },
        { image: "./assets/ktct-ch02-value-regulation.webp", wall: "right", zOffset: -5.4, height: 2.75, maxWidth: 4.5 },
        { image: "./assets/ktct-ch02-tech-innovation.webp", wall: "right", zOffset: 5.4, height: 2.8, maxWidth: 4.6 }
      ]
    },
    {
      id: "state", index: "03", name: "CUNG - CẦU & TIỀN TỆ", label: "SUPPLY, DEMAND & MONEY", centerZ: -48, zBack: -38, zFront: -58,
      color: "#2a75d3", accent: "#7ec8f8", artwork: "state", artworkImage: "./assets/ktct-ch03-supply-demand.webp",
      artworks: [
        { image: "./assets/ktct-ch03-supply-demand.webp", wall: "left", zOffset: 0, height: 2.70, maxWidth: 5.10 },
        { image: "./assets/ktct-ch03-digital-demand.webp", wall: "right", zOffset: -5.4, height: 2.8, maxWidth: 4.65 },
        { image: "./assets/ktct-ch03-money-circulation.webp", wall: "right", zOffset: 5.4, height: 2.55, maxWidth: 4.4 }
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
    base: { image: "./assets/ch03-marx.webp", name: "Karl Marx", role: "KINH TẾ THỊ TRƯỜNG", topic: "Nền kinh tế hàng hóa, các quy luật thị trường và học thuyết kinh tế chính trị" },
    class: { image: "./assets/ch01-engels.webp", name: "Friedrich Engels", role: "GIAI CẤP & SỞ HỮU", topic: "Giai cấp, sở hữu và cơ sở kinh tế của quyền lực Nhà nước" },
    state: { image: "./assets/ch03-ho-chi-minh-hero.webp", name: "Hồ Chí Minh", role: "ĐIỀU TIẾT VĨ MÔ", topic: "Vai trò quản lý của Nhà nước, ổn định tiền tệ và cân đối cung - cầu lành mạnh", special: true },
    revolt: { image: "./assets/ch01-lenin.webp", name: "Vladimir Ilyich Lenin", role: "CÁCH MẠNG XÃ HỘI", topic: "Cách mạng xã hội, giành chính quyền và chuyển hóa lịch sử" }
  });

  const gates = [
    { id: "gate-class", x: 0, z: -12, radius: 2.5, kind: "gate", requiredEvidence: "base", target: "QUY LUẬT GIÁ TRỊ", title: "Cổng kiểm tra Chương 01", type: "GATE / 01", number: "01 / 04" },
    { id: "gate-state", x: 0, z: -36, radius: 2.5, kind: "gate", requiredEvidence: "class", target: "CUNG - CẦU & TIỀN TỆ", title: "Cổng mật mã Chương 02", type: "GATE / 02", number: "02 / 04" },
    { id: "gate-revolt", x: 0, z: -60, radius: 2.5, kind: "gate", requiredEvidence: "state", target: "QUY LUẬT CẠNH TRANH", title: "Cổng kiểm tra Chương 03", type: "GATE / 03", number: "03 / 04" },
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
    ...STARS_POSITIONS.map(star => ({
      id: star.id, x: star.x, z: star.z, radius: 1.8, kind: "star"
    })),
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
    timelineOpen: false,
    memoryOpen: false,
    leaderboardOpen: false,
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
    testMode: TEST_MODE,
    noclip: TEST_MODE,
    uiAccumulator: 0,
    startTime: 0,
    endTime: 0,
    starsCollected: 0,
    quizPoints: 0,
    quizAttempts: 0,
    quizOpen: false,
    currentQuizGate: null
  };

  let renderer = null;
  let scene = null;
  let camera = null;
  let worldGroup = null;
  let clock = null;
  let textureLoader = null;
  let gateMeshes = new Map();

  function normaliseImage(image) {
    if (typeof image === "string") return { src: image, alt: "Ảnh tư liệu", topic: "", caption: "" };
    if (!image || typeof image.src !== "string" || !image.src.trim()) return null;
    return {
      src: image.src.trim(),
      alt: typeof image.alt === "string" && image.alt.trim() ? image.alt.trim() : "Ảnh tư liệu",
      topic: typeof image.topic === "string" ? image.topic.trim() : "",
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
    return state.testMode || item.kind !== "gate" || !item.requiredEvidence || state.evidence.has(item.requiredEvidence);
  }

  function gatePassed(item) {
    return state.passedGates.has(item.id);
  }

  function canMove(x, z) {
    if (state.noclip) {
      return x >= -TEST_BOUNDS.halfWidth && x <= TEST_BOUNDS.halfWidth
        && z >= TEST_BOUNDS.minZ && z <= TEST_BOUNDS.maxZ;
    }
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
      if (item.kind === "star" && item.collected) continue;
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
    if (state.testMode) return true;
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
    if (starCount) starCount.textContent = state.starsCollected;
    const scoreCountEl = document.getElementById("score-count");
    if (scoreCountEl) scoreCountEl.textContent = state.quizPoints;

    const timeCountEl = document.getElementById("time-count");
    if (timeCountEl && state.startTime && state.running) {
      const timeSpent = Math.floor((performance.now() - state.startTime) / 1000);
      const timeRemaining = Math.max(0, 600 - timeSpent); // 10 minutes countdown
      timeCountEl.textContent = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, "0")}`;

      if (timeRemaining <= 60) {
        timeCountEl.style.color = "#ff4444";
      } else {
        timeCountEl.style.color = "";
      }

      if (timeRemaining <= 0) {
        showToast("HẾT GIỜ! BẠN ĐÃ BỊ BUỘC DỪNG CUỘC CHƠI.", 5000);
        showEnding();
      }
    }
    testModeBadge?.classList.toggle("hidden", !state.testMode);
    if (testModeBadge && state.testMode) {
      testModeBadge.innerHTML = `TEST MODE / NOCLIP ${state.noclip ? "ON" : "OFF"} <kbd>N</kbd>`;
    }
    objectiveText.textContent = completedCount === rooms.length
      ? "Tới cánh cửa cuối để khép lại hồ sơ"
      : next
        ? `Tới tranh lớn chương ${next.number.slice(0, 2)} và đọc hồ sơ`
        : "Đi theo tuyến triển lãm";

    state.currentInteractable = item;
    const isInvisibleGate = item?.kind === "gate-invisible";
    prompt.classList.toggle("hidden", !item || isInvisibleGate || state.dialogueOpen || state.viewerOpen || state.timelineOpen || state.memoryOpen);
    prompt.classList.toggle("locked", Boolean(item?.kind === "gate" && !gateUnlocked(item)));
    if (item) {
      if (item.kind === "curator") promptText.textContent = "E — XEM HƯỚNG DẪN TUYẾN";
      else if (item.kind === "gate") promptText.textContent = gateUnlocked(item)
        ? item.final ? "E — KẾT THÚC TRIỂN LÃM" : `E — MỞ CỔNG SANG ${item.target}`
        : `CỔNG KHÓA — HOÀN TẤT ${item.requiredEvidence.toUpperCase()}`;
      else if (item.kind === "star") promptText.textContent = "E — THU THẬP NGÔI SAO ĐỎ ✦";
      else {
        const panelRead = state.viewedPages.has(`${item.chapterId}:${item.sectionIndex}`);
        promptText.textContent = panelRead ? `E — XEM LẠI TRANH ${item.artworkNumber}` : `E — XEM TRANH ${item.artworkNumber}`;
      }
    }

    statusText.textContent = state.testMode
      ? `TEST MODE: ${state.noclip ? "đi xuyên tường/cổng" : "va chạm bật"}. Nhấn N để đổi chế độ.`
      : completedCount === rooms.length
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
    state.noclip = state.testMode;
    state.uiAccumulator = 0;

    // Gamification resets
    state.starsCollected = 0;
    state.quizPoints = 0;
    state.quizAttempts = 0;
    state.quizOpen = false;
    state.currentQuizGate = null;

    // Reset stars in scene
    STARS_POSITIONS.forEach(star => {
      star.collected = false;
      const mesh = worldGroup?.getObjectByName(`mesh-${star.id}`);
      if (mesh) mesh.visible = true;
    });
    interactables.forEach(item => {
      if (item.kind === "star") item.collected = false;
    });

    runtimeError?.classList.add("hidden");
    updateUi();
  }

  let playerName = "Anonymous";

  function start() {
    resetState();
    
    if (window.syncIntervalId) clearInterval(window.syncIntervalId);
    window.syncIntervalId = setInterval(syncLiveScore, 5000);

    // Play background music
    if (window.bgmReady && window.bgmPlayer && typeof window.bgmPlayer.playVideo === 'function') {
      const pState = window.bgmPlayer.getPlayerState();
      if (pState !== YT.PlayerState.PLAYING) {
        window.bgmPlayer.playVideo();
      }
    }

    state.startTime = performance.now();
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

  function toggleNoclip() {
    if (!state.testMode) return false;
    state.noclip = !state.noclip;
    updateGateMeshes();
    updateUi();
    return state.noclip;
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
    if (state.dialogueOpen || state.viewerOpen || state.quizOpen) return;
    const item = nearestInteractable();
    if (!item) return;

    if (item.kind === "star") {
      state.starsCollected++;
      state.quizPoints += 100;
      item.collected = true;
      const starDef = STARS_POSITIONS.find(s => s.id === item.id);
      if (starDef) starDef.collected = true;
      const mesh = worldGroup.getObjectByName(`mesh-${item.id}`);
      if (mesh) mesh.visible = false;
      playStarSound();
      showToast(`✦ BẠN ĐÃ TÌM THẤY 1 NGÔI SAO ĐỎ! (+100 ĐIỂM)`);
      updateUi();
      return;
    }

    if (item.kind === "gate") {
      if (!gateUnlocked(item)) {
        openDialogue(item);
        return;
      }
      if (item.final) {
        openMemoryGame();
        return;
      }
      // Open Quiz instead of immediately passing
      if (!state.passedGates.has(item.id)) {
        openQuiz(item);
        return;
      }
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

  function openQuiz(gate) {
    if (gate.id === "gate-state") {
      openNumpad(gate);
      return;
    }
    const quizDataEntry = QUIZZES[gate.id];
    if (!quizDataEntry) {
      // Fallback if no quiz data
      state.passedGates.add(gate.id);
      state.player.z = gate.z - 2.4;
      updateGateMeshes();
      updateUi();
      return;
    }

    state.quizOpen = true;
    state.currentQuizGate = gate;
    state.quizAttempts = 0;
    state.quizIndex = 0;

    document.exitPointerLock?.();
    quizUi.classList.remove("hidden");

    renderQuizQuestion();
  }

  let quizTimerId = null;
  let quizTimeLeft = 10;
  const quizTimerDisplay = document.getElementById("quiz-timer");

  function renderQuizQuestion() {
    const quizDataEntry = QUIZZES[state.currentQuizGate.id];
    const quizData = Array.isArray(quizDataEntry) ? quizDataEntry[state.quizIndex] : quizDataEntry;

    quizQuestion.textContent = quizData.question;
    const optionButtons = quizOptions.querySelectorAll(".quiz-option-button");
    optionButtons.forEach((btn, idx) => {
      btn.className = "quiz-option-button";
      btn.disabled = false;
      const textSpan = btn.querySelector(".quiz-option-text");
      if (textSpan && quizData.options[idx]) {
        textSpan.textContent = quizData.options[idx];
      }
    });

    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    quizCloseButton.classList.add("hidden");
    updateUi();

    clearInterval(quizTimerId);
    quizTimeLeft = 10;
    if (quizTimerDisplay) quizTimerDisplay.textContent = `${quizTimeLeft}s`;
    quizTimerDisplay.style.color = "var(--gold)";

    quizTimerId = setInterval(() => {
      quizTimeLeft--;
      if (quizTimerDisplay) {
        quizTimerDisplay.textContent = `${quizTimeLeft}s`;
        if (quizTimeLeft <= 3) quizTimerDisplay.style.color = "var(--accent)";
      }
      if (quizTimeLeft <= 0) {
        clearInterval(quizTimerId);
        handleQuizAnswer(-1); // -1 means timeout
      }
    }, 1000);
  }

  function handleQuizAnswer(selectedIndex) {
    if (!state.quizOpen || !state.currentQuizGate) return;
    const quizDataEntry = QUIZZES[state.currentQuizGate.id];
    const quizData = Array.isArray(quizDataEntry) ? quizDataEntry[state.quizIndex] : quizDataEntry;
    const isArray = Array.isArray(quizDataEntry);
    const isCorrect = selectedIndex === quizData.correct;

    clearInterval(quizTimerId);
    const optionButtons = quizOptions.querySelectorAll(".quiz-option-button");

    if (selectedIndex >= 0) {
      const selectedBtn = optionButtons[selectedIndex];
      if (isCorrect) selectedBtn.classList.add("correct");
      else selectedBtn.classList.add("wrong");
    }

    optionButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
      state.quizPoints += 100;
      if (isArray && state.quizIndex < quizDataEntry.length - 1) {
        quizFeedback.textContent = "Chính xác! Chuẩn bị câu tiếp theo...";
        quizFeedback.className = "quiz-feedback success";
        setTimeout(() => {
          state.quizIndex++;
          renderQuizQuestion();
        }, 1500);
      } else {
        quizFeedback.textContent = "Chính xác! Cổng đã được mở.";
        quizFeedback.className = "quiz-feedback success";

        setTimeout(() => {
          state.passedGates.add(state.currentQuizGate.id);
          state.player.z = state.currentQuizGate.z - 2.4;
          updateGateMeshes();
          closeQuiz();
        }, 1500);
      }
    } else {
      state.quizPoints = Math.max(0, state.quizPoints - 20);

      if (isArray && state.quizIndex < quizDataEntry.length - 1) {
        quizFeedback.textContent = selectedIndex === -1 ? "Hết giờ! Bạn đã mất cơ hội ở câu này." : "Sai rồi! Chuyển sang câu tiếp theo.";
        quizFeedback.className = "quiz-feedback error";
        setTimeout(() => {
          state.quizIndex++;
          renderQuizQuestion();
        }, 2000);
      } else {
        quizFeedback.textContent = selectedIndex === -1 ? "Hết giờ! Cổng mở nhưng không có điểm thưởng." : "Sai rồi! Cổng vẫn mở nhưng không có điểm thưởng.";
        quizFeedback.className = "quiz-feedback error";
        setTimeout(() => {
          state.passedGates.add(state.currentQuizGate.id);
          state.player.z = state.currentQuizGate.z - 2.4;
          updateGateMeshes();
          closeQuiz();
        }, 2000);
      }
    }
  }

  function closeQuiz() {
    state.quizOpen = false;
    state.currentQuizGate = null;
    quizUi.classList.add("hidden");
    updateUi();
  }

  function openNumpad(gate) {
    if (state.quizOpen) return;
    state.quizOpen = true;
    state.currentQuizGate = gate;
    numpadInput = "";
    numpadDisplay.textContent = "----";
    numpadFeedback.textContent = "";
    numpadFeedback.className = "quiz-feedback";
    if (numpadHintText) numpadHintText.innerHTML = "Yêu cầu nhập mật mã 4 chữ số.<br/>(Manh mối ẩn trong bảo tàng)";
    if (numpadRequestHint) numpadRequestHint.classList.remove("hidden");
    document.exitPointerLock?.();
    numpadUi.classList.remove("hidden");
    updateUi();
  }

  function updateNumpadDisplay() {
    let display = numpadInput.padEnd(4, "-");
    numpadDisplay.textContent = display;
  }

  numpadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (numpadInput.length < 4) {
        numpadInput += btn.getAttribute("data-val");
        updateNumpadDisplay();
      }
    });
  });

  if (numpadClear) {
    numpadClear.addEventListener("click", () => {
      numpadInput = "";
      updateNumpadDisplay();
      numpadFeedback.textContent = "";
    });
  }

  if (numpadRequestHint) {
    numpadRequestHint.addEventListener("click", () => {
      state.quizPoints = Math.max(0, state.quizPoints - 50);
      numpadHintText.innerHTML = "GỢI Ý:<br/>Mật mã là năm xuất bản Tập 1 bộ sách kinh điển 'TƯ BẢN' của Karl Marx: 1-8-6-7";
      numpadRequestHint.classList.add("hidden");
      updateUi();
    });
  }

  if (numpadSubmit) {
    numpadSubmit.addEventListener("click", () => {
      if (numpadInput.length < 4) {
        numpadFeedback.textContent = "Nhập đủ 4 chữ số!";
        numpadFeedback.className = "quiz-feedback error";
        return;
      }
      if (numpadInput === "1867" || numpadInput === "2153") {
        numpadFeedback.textContent = "Mã khóa chính xác! Cửa đã mở.";
        numpadFeedback.className = "quiz-feedback success";
        state.quizPoints += 100;
        setTimeout(() => {
          state.passedGates.add(state.currentQuizGate.id);
          state.player.z = state.currentQuizGate.z - 2.4;
          updateGateMeshes();
          closeNumpad();
        }, 1500);
      } else {
        numpadFeedback.textContent = "Mã sai. Hãy kiểm tra lại manh mối.";
        numpadFeedback.className = "quiz-feedback wrong";
        numpadInput = "";
        updateNumpadDisplay();
      }
    });
  }

  if (numpadCloseButton) {
    numpadCloseButton.addEventListener("click", closeNumpad);
  }

  function closeNumpad() {
    state.quizOpen = false;
    state.currentQuizGate = null;
    numpadUi.classList.add("hidden");
    updateUi();
  }

  function fetchLeaderboard() {
    leaderboardLoading.classList.remove("hidden");
    leaderboardList.classList.add("hidden");
    leaderboardList.innerHTML = "";

    const promise = typeof window !== "undefined" && window.RoomSync
      ? window.RoomSync.getLeaderboard()
      : Promise.resolve([]);

    promise
      .then(data => {
        leaderboardLoading.classList.add("hidden");
        leaderboardList.classList.remove("hidden");

        if (!Array.isArray(data) || data.length === 0) {
          leaderboardList.innerHTML = "<li>Chưa có ai ghi danh. Hãy là người đầu tiên!</li>";
          return;
        }

        data.sort((a, b) => b.score - a.score || a.time - b.time);

        data.slice(0, 10).forEach((entry, i) => {
          const li = document.createElement("li");
          if (entry.name === playerNameInput.value && entry.score === state.lastComputedScore) {
            li.classList.add("current-player");
          }
          const timeStr = `${Math.floor(entry.time / 60)}:${String(entry.time % 60).padStart(2, "0")}`;
          li.innerHTML = `<span>#${i + 1}</span><span>${entry.name}</span><span>${timeStr}</span><span>${entry.score}</span>`;
          leaderboardList.appendChild(li);
        });
      })
      .catch(() => {
        leaderboardLoading.textContent = "Không thể tải bảng xếp hạng lúc này.";
      });
  }

  function submitScore() {
    syncLiveScore();
    if (submitScoreButton) {
      submitScoreButton.disabled = true;
      submitScoreButton.innerHTML = "<span>ĐÃ CẬP NHẬT ĐIỂM</span>";
    }
  }

  async function syncLiveScore() {
    if (!playerName || (!state.running && !state.endTime)) return;

    const timeToUse = state.running ? Math.floor((performance.now() - state.startTime) / 1000) : state.lastComputedTime;

    if (typeof window !== "undefined" && window.RoomSync) {
      try {
        const board = await window.RoomSync.getLeaderboard();
        let list = Array.isArray(board) ? [...board] : [];
        let pIndex = list.findIndex(e => e.name === playerName);

        if (pIndex !== -1) {
          list[pIndex].score = state.quizPoints;
          list[pIndex].time = timeToUse;
        } else {
          list.push({
            name: playerName,
            score: state.quizPoints,
            time: timeToUse
          });
        }

        await window.RoomSync.saveLeaderboard(list);
      } catch (_) {}
    }
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
    "./assets/ch03-state-rally.webp": 2048 / 1090,
    "./assets/ch03-soviet-state.webp": 1040 / 818,
    "./assets/ch03-ho-chi-minh.webp": 884 / 738,
    "./assets/ch03-ho-chi-minh-hero.webp": 449 / 683,
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
    plaque.textAlign = "center";
    plaque.textBaseline = "middle";
    plaque.fillStyle = "#f4ecdf";
    plaque.font = "600 25px 'DM Sans', sans-serif";
    plaque.fillText(honor.name.toUpperCase(), plaqueCanvas.width / 2, 43);
    plaque.fillStyle = "#d6ae6c";
    plaque.font = "500 17px 'DM Mono', monospace";
    plaque.fillText(honor.role, plaqueCanvas.width / 2, 84);
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
    const special = honor.special === true;
    const group = new THREE.Group();
    group.name = `honor-display-${room.id}`;
    group.position.set(0, 0, room.centerZ + .65);

    const frameMaterial = new THREE.MeshLambertMaterial({ color: special ? 0xc79b50 : 0x9a713d });
    const frameHighlightMaterial = new THREE.MeshLambertMaterial({ color: special ? 0xf0d18b : 0xd7ad67 });
    const pedestalMaterial = new THREE.MeshLambertMaterial({ color: special ? 0x4b3c35 : 0x403a38 });
    const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x171516, side: THREE.DoubleSide });
    const portraitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, toneMapped: false });
    const glassMaterial = new THREE.MeshBasicMaterial({ color: special ? 0xf2f8ff : 0xdbeaf2, transparent: true, opacity: special ? .16 : .11, side: THREE.DoubleSide, depthWrite: false, toneMapped: false });
    const glareMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: special ? .16 : .09, side: THREE.DoubleSide, depthWrite: false, toneMapped: false });
    const studMaterial = new THREE.MeshBasicMaterial({ color: special ? 0xffe4a4 : 0xd6ae6c, toneMapped: false });
    const dimensions = paintingDimensions({ image: honor.image, height: special ? 3.10 : 2.55, maxWidth: special ? 2.70 : 2.35 });
    const portraitBaseY = special ? 1.28 : 1.10;
    const portraitY = portraitBaseY + dimensions.height / 2;
    const plaqueY = special ? 1.38 : 1.16;
    const plaqueWidth = Math.min(special ? 3.25 : 2.95, dimensions.width + (special ? .96 : .78));

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(special ? 2.45 : 1.95, .24, special ? 1.34 : 1.16), pedestalMaterial);
    plinth.position.set(0, .12, 0);
    plinth.name = `honor-plinth-${room.id}`;
    group.add(plinth);
    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(special ? 1.68 : 1.42, special ? .92 : .72, special ? 1.02 : .88), pedestalMaterial);
    pedestal.position.set(0, special ? .70 : .60, 0);
    pedestal.name = `honor-pedestal-${room.id}`;
    group.add(pedestal);
    const pedestalCap = new THREE.Mesh(new THREE.BoxGeometry(special ? 1.90 : 1.62, .10, special ? 1.14 : 1.00), frameHighlightMaterial);
    pedestalCap.position.set(0, special ? 1.14 : .99, 0);
    group.add(pedestalCap);

    const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(dimensions.width + (special ? .64 : .52), dimensions.height + (special ? .64 : .52), .14), frameMaterial);
    outerFrame.name = `honor-frame-outer-${room.id}`;
    outerFrame.position.set(0, portraitY, -.12);
    group.add(outerFrame);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(dimensions.width + .34, dimensions.height + .34, .18), frameHighlightMaterial);
    frame.name = `honor-frame-${room.id}`;
    frame.position.set(0, portraitY, -.10);
    group.add(frame);
    const backing = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width, dimensions.height), darkMaterial);
    backing.position.set(0, portraitY, -.20);
    group.add(backing);
    const portrait = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width, dimensions.height), portraitMaterial);
    portrait.name = `honor-portrait-${room.id}`;
    portrait.position.set(0, portraitY, .01);
    group.add(portrait);

    const glass = new THREE.Mesh(new THREE.PlaneGeometry(dimensions.width + .08, dimensions.height + .08), glassMaterial);
    glass.name = `honor-glass-${room.id}`;
    glass.position.set(0, portraitY, .09);
    glass.renderOrder = 4;
    group.add(glass);
    const glare = new THREE.Mesh(new THREE.PlaneGeometry(Math.max(.16, dimensions.width * .20), dimensions.height * 1.08), glareMaterial);
    glare.name = `honor-glass-glare-${room.id}`;
    glare.position.set(-dimensions.width * .24, portraitY, .13);
    glare.rotation.z = -.24;
    glare.renderOrder = 5;
    group.add(glare);
    const studOffsetX = dimensions.width / 2 + (special ? .24 : .20);
    const studOffsetY = dimensions.height / 2 + (special ? .24 : .20);
    [-1, 1].forEach((x) => [-1, 1].forEach((y) => {
      const stud = new THREE.Mesh(new THREE.SphereGeometry(special ? .055 : .045, 7, 5), studMaterial);
      stud.name = `honor-glass-stud-${room.id}-${x}-${y}`;
      stud.position.set(x * studOffsetX, portraitY + y * studOffsetY, .16);
      stud.renderOrder = 6;
      group.add(stud);
    }));

    const plaqueBase = new THREE.Mesh(new THREE.BoxGeometry(plaqueWidth, special ? .28 : .24, .07), frameHighlightMaterial);
    plaqueBase.position.set(0, plaqueY, .25);
    group.add(plaqueBase);
    const plaqueMaterial = new THREE.MeshBasicMaterial({ map: makeHonorPlaqueTexture(honor), side: THREE.DoubleSide });
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(plaqueWidth - .08, special ? .24 : .20), plaqueMaterial);
    plaque.name = `honor-plaque-${room.id}`;
    plaque.position.set(0, plaqueY, .292);
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

  function addArchitecturalPilasters(room) {
    const wallAccent = Number.parseInt(room.accent.slice(1), 16);
    const plinthMat = new THREE.MeshLambertMaterial({ color: 0x3d3634 });
    const columnMat = new THREE.MeshLambertMaterial({ color: 0x48413e });
    const trimMat = new THREE.MeshLambertMaterial({ color: wallAccent });

    const zOffsets = [-3.8, 3.8];
    [-6.86, 6.86].forEach(x => {
      zOffsets.forEach(zOff => {
        const pZ = room.centerZ + zOff;
        const group = new THREE.Group();
        group.position.set(x, 0, pZ);

        const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.54), plinthMat);
        plinth.position.y = 0.14;
        group.add(plinth);

        const lowerTrim = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.50), trimMat);
        lowerTrim.position.y = 0.32;
        group.add(lowerTrim);

        const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.8, 0.44), columnMat);
        shaft.position.y = 2.76;
        group.add(shaft);

        const capital = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.54), trimMat);
        capital.position.y = 5.27;
        group.add(capital);

        worldGroup.add(group);
      });
    });
  }

  function addCeilingTrackLights(room) {
    const length = room.zBack - room.zFront;
    const railMat = new THREE.MeshLambertMaterial({ color: 0x1f1d1e });
    const spotMat = new THREE.MeshLambertMaterial({ color: 0x2e2b2a });
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xfff4db });

    [-3.8, 3.8].forEach(x => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, length - 2), railMat);
      rail.position.set(x, 5.48, room.centerZ);
      worldGroup.add(rail);

      const spotZOffsets = [-6, -3, 0, 3, 6];
      spotZOffsets.forEach(zOff => {
        const spotZ = room.centerZ + zOff;
        if (spotZ < room.zFront + 1 || spotZ > room.zBack - 1) return;
        const spotGroup = new THREE.Group();
        spotGroup.position.set(x, 5.44, spotZ);
        spotGroup.rotation.z = x > 0 ? -0.35 : 0.35;

        const fixture = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.12, 8), spotMat);
        fixture.rotation.x = Math.PI / 2;
        spotGroup.add(fixture);

        const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.042, 8), bulbMat);
        bulb.position.z = 0.065;
        spotGroup.add(bulb);

        worldGroup.add(spotGroup);
      });
    });
  }

  function addGlassVitrine(x, z, room, artifactType) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const baseMat = new THREE.MeshLambertMaterial({ color: 0x262221 });
    const woodMat = new THREE.MeshLambertMaterial({ color: 0x3d2b24 });
    const trimMat = new THREE.MeshLambertMaterial({ color: 0xbfa365 });
    const velvetMat = new THREE.MeshLambertMaterial({ color: 0x54181f });
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0xebf5ff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.14, 0.88), baseMat);
    plinth.position.y = 0.07;
    group.add(plinth);

    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.74, 0.74), woodMat);
    pedestal.position.y = 0.51;
    group.add(pedestal);

    const trimBottom = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.04, 0.78), trimMat);
    trimBottom.position.y = 0.16;
    group.add(trimBottom);

    const trimTop = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.04, 0.78), trimMat);
    trimTop.position.y = 0.88;
    group.add(trimTop);

    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.68), velvetMat);
    pad.position.y = 0.925;
    group.add(pad);

    if (artifactType === "book") {
      const bookMat = new THREE.MeshLambertMaterial({ color: 0x6e261d });
      const pagesMat = new THREE.MeshLambertMaterial({ color: 0xfaebd7 });
      const cover = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.06, 0.28), bookMat);
      cover.position.set(0, 0.97, 0);
      cover.rotation.y = 0.2;
      group.add(cover);
      const pages = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.045, 0.26), pagesMat);
      pages.position.set(0.01, 0.97, 0);
      pages.rotation.y = 0.2;
      group.add(pages);
    } else if (artifactType === "seal") {
      const brassMat = new THREE.MeshLambertMaterial({ color: 0xd4af37 });
      const sealMat = new THREE.MeshLambertMaterial({ color: 0xaa2222 });
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.06, 8), brassMat);
      stand.position.set(0, 0.97, 0);
      group.add(stand);
      const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), sealMat);
      seal.rotation.x = 0.4;
      seal.position.set(0, 1.03, 0);
      group.add(seal);
    } else {
      const parchmentMat = new THREE.MeshLambertMaterial({ color: 0xf5eedc });
      const ribbonMat = new THREE.MeshLambertMaterial({ color: 0xbd1e24 });
      const scroll = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.32, 10), parchmentMat);
      scroll.rotation.z = Math.PI / 2;
      scroll.position.set(-0.06, 0.975, 0.04);
      group.add(scroll);
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.18), ribbonMat);
      ribbon.position.set(0.12, 0.96, -0.05);
      ribbon.rotation.y = 0.3;
      group.add(ribbon);
    }

    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.60, 0.70), glassMat);
    glass.position.y = 1.225;
    glass.renderOrder = 4;
    group.add(glass);

    const strutMat = new THREE.MeshLambertMaterial({ color: 0x8a7243 });
    [-0.34, 0.34].forEach(cx => {
      [-0.34, 0.34].forEach(cz => {
        const strut = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.60, 0.025), strutMat);
        strut.position.set(cx, 1.225, cz);
        group.add(strut);
      });
    });
    const topCap = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.025, 0.72), strutMat);
    topCap.position.y = 1.53;
    group.add(topCap);

    group.name = `vitrine-${room.id}-${artifactType}`;
    worldGroup.add(group);
  }

  function addBookcase(x, z, rotationY, room) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const woodMat = new THREE.MeshLambertMaterial({ color: 0x3a2318 });
    const trimMat = new THREE.MeshLambertMaterial({ color: 0x73482d });

    const leftSide = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.2, 0.42), woodMat);
    leftSide.position.set(-0.72, 1.1, 0);
    group.add(leftSide);

    const rightSide = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.2, 0.42), woodMat);
    rightSide.position.set(0.72, 1.1, 0);
    group.add(rightSide);

    const backPanel = new THREE.Mesh(new THREE.BoxGeometry(1.44, 2.2, 0.04), trimMat);
    backPanel.position.set(0, 1.1, -0.19);
    group.add(backPanel);

    const bottom = new THREE.Mesh(new THREE.BoxGeometry(1.50, 0.08, 0.44), woodMat);
    bottom.position.set(0, 0.04, 0);
    group.add(bottom);
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.08, 0.46), woodMat);
    top.position.set(0, 2.2, 0);
    group.add(top);

    const shelfHeights = [0.55, 1.10, 1.65];
    shelfHeights.forEach(sy => {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.04, 0.38), woodMat);
      shelf.position.set(0, sy, 0);
      group.add(shelf);
    });

    const bookColors = [0x8b2500, 0x1d3557, 0x2e5631, 0x7d4f27, 0xb68d40, 0x4a1525, 0x3d3d3d];
    shelfHeights.forEach((sy, sIdx) => {
      let bookX = -0.55;
      const count = 7 + (sIdx % 3);
      for (let i = 0; i < count; i++) {
        const bWidth = 0.04 + (i % 3) * 0.015;
        const bHeight = 0.26 + (i % 4) * 0.03;
        const bDepth = 0.22 + (i % 2) * 0.02;
        const bColor = bookColors[(sIdx * 3 + i) % bookColors.length];
        const bookMat = new THREE.MeshLambertMaterial({ color: bColor });
        const book = new THREE.Mesh(new THREE.BoxGeometry(bWidth, bHeight, bDepth), bookMat);
        book.position.set(bookX + bWidth / 2, sy + 0.02 + bHeight / 2, -0.04);
        group.add(book);
        bookX += bWidth + 0.012;
      }
    });

    group.name = `bookcase-${room.id}`;
    worldGroup.add(group);
  }

  function addSculpturePedestal(x, z, room) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const stoneBaseMat = new THREE.MeshLambertMaterial({ color: 0x332e2c });
    const columnMat = new THREE.MeshLambertMaterial({ color: 0x4d4643 });
    const bronzeMat = new THREE.MeshLambertMaterial({ color: 0x6e4e2b });
    const bronzeHighlight = new THREE.MeshLambertMaterial({ color: 0x8f683a });

    const plinth1 = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.14, 0.82), stoneBaseMat);
    plinth1.position.y = 0.07;
    group.add(plinth1);
    const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.10, 0.70), columnMat);
    plinth2.position.y = 0.19;
    group.add(plinth2);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.85, 12), columnMat);
    shaft.position.y = 0.665;
    group.add(shaft);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.10, 0.66), stoneBaseMat);
    cap.position.y = 1.14;
    group.add(cap);

    const bustPlinth = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.26), bronzeHighlight);
    bustPlinth.position.y = 1.22;
    group.add(bustPlinth);

    const shoulders = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.22, 0.22), bronzeMat);
    shoulders.position.y = 1.36;
    group.add(shoulders);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.14, 8), bronzeMat);
    neck.position.y = 1.48;
    group.add(neck);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), bronzeHighlight);
    head.position.y = 1.64;
    head.scale.set(0.9, 1.1, 0.95);
    group.add(head);

    group.name = `sculpture-${room.id}`;
    worldGroup.add(group);
  }

  function addMuseumBench(x, z, rotationY, room) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const frameMat = new THREE.MeshLambertMaterial({ color: 0x221a16 });
    const leatherMat = new THREE.MeshLambertMaterial({ color: 0x40271c });
    const brassMat = new THREE.MeshLambertMaterial({ color: 0xc49f52 });

    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.08, 0.72), frameMat);
    frame.position.y = 0.36;
    group.add(frame);

    const cushion = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.12, 0.68), leatherMat);
    cushion.position.y = 0.46;
    group.add(cushion);

    [-0.6, -0.2, 0.2, 0.6].forEach(bx => {
      [-0.15, 0.15].forEach(bz => {
        const btn = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), frameMat);
        btn.position.set(bx, 0.525, bz);
        group.add(btn);
      });
    });

    [-0.92, 0.92].forEach(lx => {
      [-0.26, 0.26].forEach(lz => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.32, 8), frameMat);
        leg.position.set(lx, 0.16, lz);
        group.add(leg);

        const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.025, 0.06, 8), brassMat);
        tip.position.set(lx, 0.03, lz);
        group.add(tip);
      });
    });

    group.name = `bench-${room.id}`;
    worldGroup.add(group);
  }

  function addInfoKiosk(x, z, rotationY, room) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;

    const metalMat = new THREE.MeshLambertMaterial({ color: 0x2b2928 });
    const brassMat = new THREE.MeshLambertMaterial({ color: 0xc49f52 });
    const paperMat = new THREE.MeshBasicMaterial({ color: 0xf5f0e1 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.04, 0.46), metalMat);
    base.position.y = 0.02;
    group.add(base);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 1.05, 8), metalMat);
    post.position.set(0, 0.54, 0);
    group.add(post);

    const plateGroup = new THREE.Group();
    plateGroup.position.set(0, 1.06, 0);
    plateGroup.rotation.x = -0.45;

    const desk = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.03, 0.42), brassMat);
    plateGroup.add(desk);

    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(0.50, 0.34), paperMat);
    sheet.position.set(0, 0.016, 0);
    sheet.rotation.x = -Math.PI / 2;
    plateGroup.add(sheet);

    group.add(plateGroup);
    group.name = `kiosk-${room.id}`;
    worldGroup.add(group);
  }

  function addStanchions(room) {
    const group = new THREE.Group();
    group.position.set(0, 0, room.centerZ);

    const postMaterial = new THREE.MeshLambertMaterial({ color: 0xc49f52 });
    const ropeMaterial = new THREE.MeshLambertMaterial({ color: 0xa82020 });

    const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const postPositions = [
      { x: -1.8, z: 0.6 }, { x: 1.8, z: 0.6 },
      { x: -1.8, z: -0.8 }, { x: 1.8, z: -0.8 }
    ];

    postPositions.forEach(pos => {
      const post = new THREE.Mesh(postGeo, postMaterial);
      post.position.set(pos.x, 0.4, pos.z);
      group.add(post);
    });

    const frontRope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.6, 6), ropeMaterial);
    frontRope.rotation.z = Math.PI / 2;
    frontRope.position.set(0, 0.75, 0.6);
    group.add(frontRope);

    const leftRope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 6), ropeMaterial);
    leftRope.rotation.x = Math.PI / 2;
    leftRope.position.set(-1.8, 0.75, -0.1);
    group.add(leftRope);

    const rightRope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 6), ropeMaterial);
    rightRope.rotation.x = Math.PI / 2;
    rightRope.position.set(1.8, 0.75, -0.1);
    group.add(rightRope);

    group.name = `stanchions-${room.id}`;
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

    addArchitecturalPilasters(room);
    addCeilingTrackLights(room);
    addStanchions(room);

    if (room.id === "base") {
      addGlassVitrine(6.45, 8.5, room, "book");
      addMuseumBench(-4.2, -4.5, Math.PI / 2, room);
    } else if (room.id === "class") {
      addSculpturePedestal(-4.6, -20.5, room);
      addMuseumBench(3.8, -27.2, 0, room);
      addGlassVitrine(6.45, -15.5, room, "seal");
    } else if (room.id === "state") {
      addSculpturePedestal(4.6, -40.5, room);
      addMuseumBench(-4.2, -45.0, 0, room);
      addMuseumBench(-4.2, -52.5, 0, room);
    } else if (room.id === "revolt") {
      addGlassVitrine(6.45, -63.75, room, "seal");
      addMuseumBench(-3.8, -75.8, 0, room);
      addSculpturePedestal(-4.6, -68.5, room);
    }
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
      const open = state.noclip || gatePassed(entry.gate);
      entry.door.visible = !open;
      const color = gateUnlocked(entry.gate) ? 0xd6ae6c : 0xbd5c5d;
      entry.accentMaterial.color.setHex(color);
      entry.accentMaterial.emissive.setHex(gateUnlocked(entry.gate) ? 0x4a3016 : 0x3d1118);
    }
  }

  function createStarGeometry() {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.085;
    const innerRadius = 0.038;
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const a = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = {
      depth: 0.024,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
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

      // Add stars (compact, faceted, 5-pointed gilded stars hidden in decor)
      const starGeometry = createStarGeometry();
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xee2c2c });
      const starWireframe = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });

      STARS_POSITIONS.forEach(star => {
        const group = new THREE.Group();
        group.position.set(star.x, star.y, star.z);

        const core = new THREE.Mesh(starGeometry, starMaterial);
        const wire = new THREE.Mesh(starGeometry, starWireframe);
        wire.scale.set(1.04, 1.04, 1.04);

        group.add(core);
        group.add(wire);
        group.name = `mesh-${star.id}`;
        worldGroup.add(group);
      });

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

    if (clock) {
      const time = clock.getElapsedTime();
      STARS_POSITIONS.forEach(star => {
        if (star.collected) return;
        const mesh = worldGroup.getObjectByName(`mesh-${star.id}`);
        if (mesh) {
          mesh.rotation.y = time * 1.5;
          mesh.rotation.z = Math.sin(time * 2) * 0.12;
          const baseY = star.y;
          mesh.position.y = baseY + Math.sin(time * 2.5 + star.z) * 0.018;
        }
      });
    }

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
    if (!state.dialogueOpen && !state.viewerOpen && !state.timelineOpen && !state.memoryOpen) {
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
        checkRoom3Timeline();
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

  const TIMELINE_DATA = [
    { id: "csnt", text: "Chưa có thặng dư, chưa có giai cấp. Mọi thứ là của chung." },
    { id: "chnl", text: "Chủ nhân có toàn quyền sở hữu cả tư liệu sản xuất và người lao động." },
    { id: "pk", text: "Nông nô bị trói buộc vào ruộng đất của lãnh chúa." },
    { id: "tbcn", text: "Giai cấp vô sản bị bóc lột giá trị thặng dư bởi giới chủ." },
    { id: "cscn", text: "Nhà nước tự tiêu vong, mọi người làm theo năng lực hưởng theo nhu cầu." }
  ];
  const CORRECT_TIMELINE = ["csnt", "chnl", "pk", "tbcn", "cscn"];

  function checkRoom3Timeline() {
    if (state.player.z <= -56.5 && !state.passedGates.has("gate-revolt") && !state.timelineOpen) {
      if (!state.evidence.has("state")) return; // Require Room 3 evidence before triggering
      // Bounce player back so they don't get stuck in the trigger loop
      state.player.z = -56.0;
      openTimelineUI();
    }
  }

  function openTimelineUI() {
    state.timelineOpen = true;
    document.getElementById("timeline-ui")?.classList.remove("hidden");
    if (document.pointerLockElement) document.exitPointerLock();

    const list = document.getElementById("timeline-list");
    list.innerHTML = "";

    // Shuffle
    const shuffled = [...TIMELINE_DATA].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => {
      const li = document.createElement("li");
      li.className = "timeline-item";
      li.draggable = true;
      li.dataset.id = item.id;
      li.innerHTML = `<span class="drag-handle">≡</span><span class="timeline-item-content">${item.text}</span>`;

      li.addEventListener("dragstart", (e) => {
        li.classList.add("dragging");
      });
      li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
      });
      list.appendChild(li);
    });

    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list, e.clientY);
      const draggable = document.querySelector(".timeline-item.dragging");
      if (afterElement == null) {
        list.appendChild(draggable);
      } else {
        list.insertBefore(draggable, afterElement);
      }
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.timeline-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  document.getElementById("timeline-submit")?.addEventListener("click", () => {
    const currentOrder = [...document.querySelectorAll(".timeline-item")].map(li => li.dataset.id);
    const feedback = document.getElementById("timeline-feedback");

    const isCorrect = currentOrder.every((id, index) => id === CORRECT_TIMELINE[index]);

    if (isCorrect) {
      showToast("CHÍNH XÁC! CỬA ĐÃ MỞ.", 3000);
      state.quizPoints += 100;
      state.passedGates.add("gate-revolt");
      updateGateMeshes();
      closeTimelineUI();
    } else {
      feedback.textContent = "SAI RỒI BÉ ƠI! CỐ GẮNG NHỚ LẠI LẦN NỮA NHÁ! (-50 ĐIỂM)";
      feedback.className = "quiz-feedback error";
      state.quizPoints = Math.max(0, state.quizPoints - 50);

      const flash = document.createElement("div");
      flash.style.position = "fixed";
      flash.style.inset = "0";
      flash.style.backgroundColor = "rgba(189, 92, 93, 0.4)";
      flash.style.zIndex = "9999";
      flash.style.pointerEvents = "none";
      flash.style.transition = "opacity 0.5s ease-out";
      document.body.appendChild(flash);
      setTimeout(() => { flash.style.opacity = "0"; }, 100);
      setTimeout(() => { document.body.removeChild(flash); }, 600);
    }
  });

  function closeTimelineUI() {
    state.timelineOpen = false;
    document.getElementById("timeline-ui")?.classList.add("hidden");
    const feedback = document.getElementById("timeline-feedback");
    if (feedback) feedback.textContent = "";
    if (state.running) canvas.requestPointerLock?.();
  }

  document.getElementById("timeline-close-button")?.addEventListener("click", closeTimelineUI);

  // --- MEMORY MATCH LOGIC ---
  const MEMORY_DATA = [
    { pairId: 1, type: "image", src: "assets/ch03-marx.webp" },
    { pairId: 1, type: "text", text: "C. Mác" },
    { pairId: 2, type: "image", src: "assets/ch01-lenin.webp" },
    { pairId: 2, type: "text", text: "V.I. Lênin" },
    { pairId: 3, type: "image", src: "assets/ch02-slave-state.webp" },
    { pairId: 3, type: "text", text: "Nhà nước Chủ nô" },
    { pairId: 4, type: "image", src: "assets/ch02-feudal-state.webp" },
    { pairId: 4, type: "text", text: "Nhà nước Phong kiến" },
    { pairId: 5, type: "image", src: "assets/ch02-bourgeois-transition.webp" },
    { pairId: 5, type: "text", text: "Nhà nước Tư sản" },
    { pairId: 6, type: "image", src: "assets/ch01-state-institutions.webp" },
    { pairId: 6, type: "text", text: "Mâu thuẫn giai cấp" },
    { pairId: 7, type: "image", src: "assets/ch04-revolution-force.webp" },
    { pairId: 7, type: "text", text: "Quần chúng nhân dân" },
  ];

  let memoryMoves = 0;
  let flippedCards = [];
  let matchedPairs = 0;
  let isMemoryLocked = false;

  function openMemoryGame() {
    state.memoryOpen = true;
    document.getElementById("memory-ui")?.classList.remove("hidden");
    if (document.pointerLockElement) document.exitPointerLock();

    memoryMoves = 0;
    flippedCards = [];
    matchedPairs = 0;
    isMemoryLocked = false;
    document.getElementById("memory-moves").textContent = "0";

    const grid = document.getElementById("memory-grid");
    grid.innerHTML = "";

    // Shuffle cards
    const shuffled = [...MEMORY_DATA].sort(() => Math.random() - 0.5);

    shuffled.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.pairId = item.pairId;
      card.dataset.index = index;

      const back = document.createElement("div");
      back.className = "memory-card-back";

      const front = document.createElement("div");
      front.className = "memory-card-front";
      if (item.type === "image") {
        front.innerHTML = `<img src="${item.src}" style="width:100%; height:100%; object-fit:contain; background:rgba(0,0,0,0.5); border-radius:6px; opacity: 1;" alt="Card Image" draggable="false" />`;
      } else {
        front.textContent = item.text;
        front.style.fontSize = "18px";
        front.style.fontWeight = "bold";
      }

      card.appendChild(back);
      card.appendChild(front);

      card.addEventListener("click", () => handleCardClick(card));
      grid.appendChild(card);
    });
  }

  function handleCardClick(card) {
    if (isMemoryLocked) return;
    if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      memoryMoves++;
      document.getElementById("memory-moves").textContent = memoryMoves;
      checkMatch();
    }
  }

  function checkMatch() {
    isMemoryLocked = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.pairId === card2.dataset.pairId) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedPairs++;
      flippedCards = [];
      isMemoryLocked = false;

      if (matchedPairs === MEMORY_DATA.length / 2) {
        state.quizPoints += 200; // Bonus for finishing memory game
        setTimeout(() => {
          showToast("CHÚC MỪNG! BẠN ĐÃ MỞ KHÓA THÀNH CÔNG.", 3000);
          closeMemoryGame();
          showEnding();
        }, 1000);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
        isMemoryLocked = false;

        if (memoryMoves >= 20) {
          showToast("BẠN ĐÃ HẾT 20 LƯỢT LẬT! HÃY THỬ LẠI.", 4000);
          setTimeout(openMemoryGame, 500);
        }
      }, 1200);
    }
  }

  function closeMemoryGame() {
    state.memoryOpen = false;
    document.getElementById("memory-ui")?.classList.add("hidden");
    canvas.requestPointerLock();
  }

  document.getElementById("memory-close-button")?.addEventListener("click", closeMemoryGame);

  function showEnding() {
    state.running = false;
    if (window.syncIntervalId) clearInterval(window.syncIntervalId);
    
    // Do one final sync
    syncLiveScore();
    
    state.viewerOpen = false;
    state.dialogueOpen = false;
    document.exitPointerLock?.();
    contentViewer.classList.add("hidden");
    dialogue.classList.add("hidden");

    // Score Calculation
    state.endTime = performance.now();
    const timeSpent = Math.floor((state.endTime - state.startTime) / 1000); // seconds
    const totalScore = state.quizPoints;

    state.lastComputedTime = timeSpent;
    state.lastComputedScore = totalScore;

    endingScreen.classList.remove("hidden");
    const formattedTime = `${Math.floor(timeSpent / 60)}:${String(timeSpent % 60).padStart(2, "0")}`;
    endingTime.textContent = formattedTime;
    endingScore.textContent = totalScore;

    document.getElementById("ending-evidence").textContent = `${state.evidence.size}/${rooms.length}`;

    // Reset Leaderboard UI state
    playerNameInput.value = playerName !== "Anonymous" ? playerName : "";
    leaderboardList.innerHTML = "";
    leaderboardList.classList.add("hidden");

    if (playerName !== "Anonymous") {
      submitScore();
    } else {
      leaderboardFormContainer.classList.remove("hidden");
      submitScoreButton.disabled = false;
      submitScoreButton.innerHTML = "<span>GỬI ĐIỂM</span><b>↵</b>";
      fetchLeaderboard();
    }
  }

  function quitGame() {
    if (window.syncIntervalId) {
      clearInterval(window.syncIntervalId);
      window.syncIntervalId = null;
    }
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
    if (window.syncIntervalId) {
      clearInterval(window.syncIntervalId);
      window.syncIntervalId = null;
    }
    if (window.bgmReady && window.bgmPlayer && typeof window.bgmPlayer.pauseVideo === 'function') {
      window.bgmPlayer.pauseVideo();
    }
    if (lobbyPollInterval) {
      clearInterval(lobbyPollInterval);
      lobbyPollInterval = null;
    }
    currentRoomCode = null;
    waitingLobby?.classList.add("hidden");

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

    // Reset start screen UI
    document.getElementById("start-button").classList.remove("hidden");
    document.getElementById("guide-button")?.classList.remove("hidden");
    document.getElementById("name-input-container").classList.add("hidden");
    const controlStrip = document.querySelector(".control-strip");
    if (controlStrip) controlStrip.classList.remove("hidden");
  }

  function toggleLeaderboard() {
    state.leaderboardOpen = !state.leaderboardOpen;
    const ui = document.getElementById("leaderboard-ui");
    if (state.leaderboardOpen) {
      if (document.pointerLockElement) document.exitPointerLock();
      ui.classList.remove("hidden");
      renderLiveLeaderboard();
      const clearBtn = document.getElementById("clear-leaderboard-button");
      if (clearBtn) clearBtn.style.display = state.testMode ? "inline-block" : "none";
      
      if (window.liveLeaderboardInterval) clearInterval(window.liveLeaderboardInterval);
      window.liveLeaderboardInterval = setInterval(() => {
        if (state.leaderboardOpen) renderLiveLeaderboard(true);
      }, 3000);
    } else {
      ui.classList.add("hidden");
      if (state.running) canvas.requestPointerLock?.();
      if (window.liveLeaderboardInterval) clearInterval(window.liveLeaderboardInterval);
    }
  }

  function renderLiveLeaderboard(silent = false) {
    const list = document.getElementById("live-leaderboard-list");
    if (!silent) list.innerHTML = "<li><span style='color: var(--paper)'>Đang tải dữ liệu...</span></li>";

    const promise = typeof window !== "undefined" && window.RoomSync
      ? window.RoomSync.getLeaderboard()
      : Promise.resolve([]);

    promise
      .then(data => {
        list.innerHTML = "";
        let ranks = [];
        if (Array.isArray(data) && data.length > 0) {
          data.sort((a, b) => b.score - a.score || a.time - b.time);
          ranks = data.slice(0, 10).map(entry => ({
            name: entry.name,
            score: entry.score,
            timeStr: `${Math.floor(entry.time / 60)}:${String(entry.time % 60).padStart(2, "0")}`
          }));
        }

        ranks.forEach((r, i) => {
          const li = document.createElement("li");
          li.style.display = "flex";
          li.style.justifyContent = "space-between";
          li.style.padding = "10px";
          li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
          li.style.color = "var(--paper)";

          const nameSpan = document.createElement("span");
          nameSpan.innerHTML = `<strong>${i + 1}.</strong> ${r.name}`;

          const detailsSpan = document.createElement("span");
          detailsSpan.innerHTML = `<span style="margin-right: 15px; color: var(--gold)">${r.score} điểm</span> <span>${r.timeStr}</span>`;
          if (r.name === playerName) detailsSpan.style.color = "var(--gold)";

          li.appendChild(nameSpan);
          li.appendChild(detailsSpan);
          list.appendChild(li);
        });

        // Tách riêng thông tin hiện tại của bản thân
        if (state.running) {
          const myLi = document.createElement("li");
          myLi.style.display = "flex";
          myLi.style.justifyContent = "space-between";
          myLi.style.padding = "10px";
          myLi.style.marginTop = "15px";
          myLi.style.borderTop = "1px dashed var(--gold)";
          myLi.style.color = "var(--gold)";
          myLi.innerHTML = `<span><strong>BẠN:</strong> ${playerName}</span> <span>${state.quizPoints} điểm (Đang chơi...)</span>`;
          list.appendChild(myLi);
        }
      })
      .catch(() => {
        list.innerHTML = "<li><span style='color: var(--danger)'>Lỗi tải bảng xếp hạng.</span></li>";
      });
  }

  const codeToKey = {
    "KeyW": "w", "KeyA": "a", "KeyS": "s", "KeyD": "d", "KeyE": "e", "KeyQ": "q", "KeyN": "n",
    "ArrowUp": "arrowup", "ArrowDown": "arrowdown", "ArrowLeft": "arrowleft", "ArrowRight": "arrowright",
    "Escape": "escape", "Enter": "enter", "Space": " "
  };

  function handleKeyDown(event) {
    if (document.activeElement && document.activeElement.tagName === "INPUT") return;

    // Ưu tiên dùng event.code để tránh lỗi kẹt phím do Unikey/Vietkey
    let key = codeToKey[event.code] || event.key.toLowerCase();
    
    const handledKeys = ["w", "a", "s", "d", "n", "q", "arrowup", "arrowdown", "arrowleft", "arrowright", "e", "escape", "enter", " "];
    if (handledKeys.includes(key)) event.preventDefault();

    if (key === "q" && state.running) {
      toggleLeaderboard();
      return;
    }

    if (state.leaderboardOpen) {
      if (key === "escape" || key === "q") toggleLeaderboard();
      return;
    }

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
    if (state.quizOpen) {
      if (key === "escape" && state.quizAttempts >= 3) closeQuiz();
      return;
    }
    if (state.timelineOpen) {
      if (key === "escape") closeTimelineUI();
      return;
    }
    if (state.memoryOpen) {
      if (key === "escape") closeMemoryGame();
      return;
    }
    if (key === "n" && state.testMode) {
      toggleNoclip();
      return;
    }
    if (key === "e") interact();
    else if (key === "escape") document.exitPointerLock?.();
    else keys.add(key);
  }

  function handleKeyUp(event) { 
    let key = codeToKey[event.code] || event.key.toLowerCase();
    keys.delete(key); 
  }

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
    if (state.running && !state.dialogueOpen && !state.viewerOpen && !state.timelineOpen && !state.memoryOpen) canvas.requestPointerLock?.();
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

  // Gamification Events
  quizCloseButton?.addEventListener("click", () => {
    if (state.quizAttempts >= 3) closeQuiz();
  });
  quizOptions?.addEventListener("click", (e) => {
    const btn = e.target.closest(".quiz-option-button");
    if (!btn || btn.disabled) return;
    const index = parseInt(btn.dataset.index, 10);
    handleQuizAnswer(index);
  });
  submitScoreButton?.addEventListener("click", submitScore);
  playerNameInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") submitScore();
  });

  document.getElementById("close-leaderboard-button")?.addEventListener("click", toggleLeaderboard);
  document.getElementById("clear-leaderboard-button")?.addEventListener("click", async () => {
    if (confirm("Xóa toàn bộ dữ liệu bảng xếp hạng trên server?")) {
      if (window.RoomSync) await window.RoomSync.clearLeaderboard();
      alert("Đã xóa dữ liệu thành công!");
      renderLiveLeaderboard();
    }
  });

  // Guide modal logic
  document.getElementById("guide-button")?.addEventListener("click", () => {
    document.getElementById("guide-modal")?.classList.remove("hidden");
  });
  document.getElementById("close-guide-button")?.addEventListener("click", () => {
    document.getElementById("guide-modal")?.classList.add("hidden");
  });

  // Start flow logic & Multiplayer Lobby integration
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").classList.add("hidden");
    document.getElementById("guide-button")?.classList.add("hidden");
    const controlStrip = document.querySelector(".control-strip");
    if (controlStrip) controlStrip.classList.add("hidden");
    document.getElementById("name-input-container").classList.remove("hidden");
    showRoomError("");
  });

  function showRoomError(msg) {
    if (!roomInputError) return;
    if (!msg) {
      roomInputError.textContent = "";
      roomInputError.classList.add("hidden");
    } else {
      roomInputError.textContent = msg;
      roomInputError.classList.remove("hidden");
    }
  }

  async function joinRoomLobby() {
    showRoomError("");
    const startInput = document.getElementById("start-name-input");
    const roomInput = document.getElementById("start-room-input");
    const nameVal = startInput ? startInput.value.trim() : "";
    const codeVal = roomInput ? roomInput.value.trim() : "";

    if (!nameVal) {
      showRoomError("Vui lòng nhập tên người chơi của bạn!");
      startInput?.focus();
      return;
    }
    if (!codeVal || !/^\d{4}$/.test(codeVal)) {
      showRoomError("Vui lòng nhập đúng mã phòng gồm 4 chữ số!");
      roomInput?.focus();
      return;
    }

    const enterBtn = document.getElementById("enter-exhibition-button");
    if (enterBtn) {
      enterBtn.disabled = true;
      enterBtn.innerHTML = "<span>ĐANG KẾT NỐI PHÒNG...</span>";
    }

    try {
      const room = typeof window !== "undefined" && window.RoomSync
        ? await window.RoomSync.getRoom(codeVal)
        : null;

      if (!room || String(room.code).trim() !== codeVal) {
        showRoomError(`Mã phòng [${codeVal}] không tồn tại hoặc chưa được tạo bởi Admin!`);
        return;
      }

      if (room.status === "PLAYING") {
        showRoomError(`Phòng [${codeVal}] đã bắt đầu chơi rồi! Hãy liên hệ Admin để reset hoặc tạo phòng mới.`);
        return;
      }
      if (room.status === "ENDED") {
        showRoomError(`Phòng [${codeVal}] đã kết thúc! Vui lòng chờ Admin mở lại phòng hoặc tạo phòng mới.`);
        return;
      }

      // Add player to room if not yet added
      if (!Array.isArray(room.players)) room.players = [];
      const existing = room.players.find(p => p.name === nameVal);
      if (!existing) {
        room.players.push({
          name: nameVal,
          joinedAt: Date.now()
        });
        if (window.RoomSync) await window.RoomSync.saveRoom(room);
      }

      playerName = nameVal;
      currentRoomCode = codeVal;

      // Switch to Waiting Lobby screen
      titleScreen.classList.add("hidden");
      waitingLobby?.classList.remove("hidden");
      if (lobbyRoomCode) lobbyRoomCode.textContent = codeVal;
      if (lobbyPlayerName) lobbyPlayerName.textContent = nameVal;
      if (lobbyStatusText) {
        lobbyStatusText.textContent = "Đang chờ Admin bấm BẮT ĐẦU...";
        lobbyStatusText.style.color = "var(--gold)";
      }

      renderLobbyRoster(room.players);
      startLobbyPolling(codeVal);

    } catch (err) {
      showRoomError("Lỗi kết nối phòng: " + err.message);
    } finally {
      if (enterBtn) {
        enterBtn.disabled = false;
        enterBtn.innerHTML = "<span>VÀO PHÒNG CHỜ</span><b>↵</b>";
      }
    }
  }

  function renderLobbyRoster(players) {
    if (!lobbyPlayerList) return;
    lobbyPlayerList.innerHTML = "";
    const list = Array.isArray(players) ? players : [];
    if (lobbyPlayerCount) lobbyPlayerCount.textContent = `${list.length} thành viên`;

    list.forEach(p => {
      const li = document.createElement("li");
      li.className = "lobby-player-item" + (p.name === playerName ? " is-me" : "");
      li.innerHTML = `
        <span>${p.name === playerName ? "★ " : ""}${p.name}</span>
        <span class="lobby-player-tag">SẴN SÀNG</span>
      `;
      lobbyPlayerList.appendChild(li);
    });
  }

  function startLobbyPolling(code) {
    if (lobbyPollInterval) clearInterval(lobbyPollInterval);

    // Subscribe to real-time events via RoomSync
    if (typeof window !== "undefined" && window.RoomSync && !window.__roomSyncSubscribed) {
      window.__roomSyncSubscribed = true;
      window.RoomSync.subscribe((event) => {
        if (!currentRoomCode) return;
        if (event.type === "ROOM_UPDATE" && event.room && event.room.code === currentRoomCode) {
          renderLobbyRoster(event.room.players);
          if (event.room.status === "PLAYING") {
            triggerGameStart();
          } else if (event.room.status === "ENDED") {
            alert("Admin đã đóng phòng này.");
            leaveLobby();
          }
        } else if (event.type === "ROOM_CLOSED" && event.code === currentRoomCode) {
          alert("Admin đã đóng phòng này.");
          leaveLobby();
        }
      });
    }

    lobbyPollInterval = setInterval(async () => {
      if (!currentRoomCode || currentRoomCode !== code) return;
      try {
        const room = typeof window !== "undefined" && window.RoomSync
          ? await window.RoomSync.getRoom(code)
          : null;
        if (!room) return;

        renderLobbyRoster(room.players);

        if (room.status === "PLAYING") {
          triggerGameStart();
        } else if (room.status === "ENDED") {
          clearInterval(lobbyPollInterval);
          lobbyPollInterval = null;
          alert("Admin đã đóng phòng này.");
          leaveLobby();
        }
      } catch (e) {
        console.warn("Lobby poll error:", e);
      }
    }, 2000);
  }

  function triggerGameStart() {
    if (lobbyPollInterval) {
      clearInterval(lobbyPollInterval);
      lobbyPollInterval = null;
    }
    if (lobbyStatusText) {
      lobbyStatusText.textContent = "🚀 ADMIN ĐÃ BẮT ĐẦU! ĐANG VÀO TRIỂN LÃM...";
      lobbyStatusText.style.color = "#81c784";
    }
    setTimeout(() => {
      waitingLobby?.classList.add("hidden");
      showToast(`Chào mừng ${playerName} bước vào triển lãm!`, 4000);
      start();
    }, 1000);
  }

  function leaveLobby() {
    if (lobbyPollInterval) {
      clearInterval(lobbyPollInterval);
      lobbyPollInterval = null;
    }
    currentRoomCode = null;
    waitingLobby?.classList.add("hidden");
    returnToTitle();
  }

  // Join Room Button
  document.getElementById("enter-exhibition-button")?.addEventListener("click", joinRoomLobby);

  // Back to Menu Button
  backToMenuButton?.addEventListener("click", () => {
    document.getElementById("name-input-container").classList.add("hidden");
    document.getElementById("start-button").classList.remove("hidden");
    document.getElementById("guide-button")?.classList.remove("hidden");
    const controlStrip = document.querySelector(".control-strip");
    if (controlStrip) controlStrip.classList.remove("hidden");
  });

  // Leave Lobby Button
  leaveLobbyButton?.addEventListener("click", leaveLobby);

  document.getElementById("restart-button")?.addEventListener("click", returnToTitle);
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
    toggleNoclip,
    canMove,
    testMode: TEST_MODE,
    drawWorld: renderFrame,
    updateUi
  };
})();
