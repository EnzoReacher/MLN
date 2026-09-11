const events = [
  {
    chapter: "ĐIỀU KIỆN BAN ĐẦU", category: "NỀN TẢNG VẬT CHẤT", phase: "ĐANG HÌNH THÀNH",
    question: "Xã hội bắt đầu tạo ra nhiều hơn mức cần để tồn tại.",
    context: "Một phần sản phẩm dư thừa xuất hiện. Ai sẽ kiểm soát nguồn lực mới này?",
    choices: [
      { label: "Chia sẻ theo lệ cũ", hint: "Ưu tiên cộng đồng", effect: { production: 7, inequality: -4, conflict: -3, stability: 4, state: 0 }, feedback: "Sản xuất vẫn phát triển, trong khi khoảng cách lợi ích chưa bị đẩy xa." },
      { label: "Trao quyền kiểm soát cho một nhóm", hint: "Tập trung tư liệu sản xuất", effect: { production: 12, inequality: 14, conflict: 8, stability: -6, state: 0 }, feedback: "Sản xuất tăng nhanh, nhưng quyền kiểm soát nguồn lực bắt đầu phân hóa xã hội." },
      { label: "Giữ nguyên cách làm cũ", hint: "Không thay đổi quan hệ sở hữu", effect: { production: 1, inequality: 0, conflict: 2, stability: -2, state: 0 }, feedback: "Trật tự cũ được giữ lại, nhưng năng lực sản xuất chưa được giải phóng hết." }
    ]
  },
  {
    chapter: "PHÂN HÓA XÃ HỘI", category: "GIAI CẤP & LỢI ÍCH", phase: "BẮT ĐẦU PHÂN CỰC",
    question: "Không phải ai cũng còn đứng ở cùng một vị trí.",
    context: "Một nhóm sở hữu kho lương và công cụ. Nhóm khác phải làm việc để tiếp cận chúng.",
    choices: [
      { label: "Mở quyền tiếp cận rộng hơn", hint: "Giảm độc quyền", effect: { production: 2, inequality: -10, conflict: -9, stability: 8, state: 0 }, feedback: "Mâu thuẫn hạ nhiệt. Xã hội tìm được một khoảng cân bằng mới—ít nhất là tạm thời." },
      { label: "Bảo vệ đặc quyền hiện có", hint: "Củng cố sở hữu riêng", effect: { production: 4, inequality: 11, conflict: 12, stability: -8, state: 4 }, feedback: "Lợi ích đối lập trở nên rõ ràng hơn; cần một quyền lực đủ mạnh để bảo vệ trật tự này." },
      { label: "Để các nhóm tự thương lượng", hint: "Không có thiết chế chung", effect: { production: -2, inequality: 4, conflict: 9, stability: -9, state: 0 }, feedback: "Khi không có quy tắc chung, tranh chấp lan từ nguồn lực sang toàn bộ đời sống xã hội." }
    ]
  },
  {
    chapter: "NHÀ NƯỚC XUẤT HIỆN", category: "THIẾT CHẾ QUYỀN LỰC", phase: "TRẬT TỰ ĐƯỢC TỔ CHỨC",
    question: "Mâu thuẫn đã lớn hơn khả năng tự điều chỉnh của cộng đồng.",
    context: "Xã hội cần luật lệ, cơ chế quản lý và một quyền lực có khả năng tổ chức đời sống chung.",
    choices: [
      { label: "Lập quy tắc chung có kiểm soát", hint: "Quản lý + trách nhiệm", effect: { production: 5, inequality: -3, conflict: -4, stability: 9, state: 15 }, feedback: "Một thiết chế chung hình thành. Nó tạo ổn định, nhưng câu hỏi về lợi ích mà nó bảo vệ vẫn còn đó." },
      { label: "Trao quyền tuyệt đối cho trung tâm", hint: "Ổn định bằng cưỡng chế", effect: { production: 3, inequality: 8, conflict: 5, stability: 2, state: 25 }, feedback: "Trật tự được siết chặt. Quyền lực nhà nước tăng lên cùng với nguy cơ tách khỏi đời sống xã hội." },
      { label: "Không lập thiết chế nào", hint: "Tự quản hoàn toàn", effect: { production: -3, inequality: 2, conflict: 14, stability: -14, state: 0 }, feedback: "Khi mâu thuẫn đã sâu, việc thiếu một cơ chế chung làm khủng hoảng lan rộng." }
    ]
  },
  {
    chapter: "MÂU THUẪN PHÁT TRIỂN", category: "KHỦNG HOẢNG XÃ HỘI", phase: "ÁP LỰC ĐẠT ĐỈNH",
    question: "Lực lượng sản xuất muốn đi xa hơn, nhưng quan hệ cũ đang níu lại.",
    context: "Năng lực tạo ra của cải đã đổi khác. Cách sở hữu và phân phối cũ trở thành điểm nghẽn.",
    choices: [
      { label: "Cải cách từng phần", hint: "Nới cấu trúc cũ", effect: { production: 5, inequality: -6, conflict: -5, stability: 5, state: 3 }, feedback: "Áp lực giảm nhưng chưa biến mất. Xã hội có thêm thời gian để điều chỉnh cấu trúc." },
      { label: "Dùng quyền lực để giữ nguyên", hint: "Trấn áp bất đồng", effect: { production: -4, inequality: 10, conflict: 16, stability: -15, state: 12 }, feedback: "Sự yên lặng bề ngoài không giải quyết được mâu thuẫn bên trong; khủng hoảng sâu hơn." },
      { label: "Thay đổi quan hệ nền tảng", hint: "Biến đổi căn bản", effect: { production: 8, inequality: -12, conflict: 20, stability: -10, state: -5 }, feedback: "Một lựa chọn căn bản làm trật tự cũ rung chuyển. Điều kiện cho bước chuyển lớn đã hiện ra." }
    ]
  },
  {
    chapter: "BƯỚC CHUYỂN", category: "CÁCH MẠNG XÃ HỘI", phase: "XÃ HỘI ĐANG BIẾN ĐỔI",
    question: "Khi mâu thuẫn đã chín muồi, xã hội sẽ đi về đâu?",
    context: "Đây không phải nút bấm “đúng/sai”. Đây là khoảnh khắc để nhìn lại những lực kéo mà chính bạn đã tạo ra.",
    choices: [
      { label: "Mở một lối chuyển hóa mới", hint: "Thay đổi cấu trúc", effect: { production: 10, inequality: -14, conflict: -8, stability: 5, state: -8 }, feedback: "Xã hội bước sang một cấu trúc mới. Biến đổi căn bản trở thành kết quả của cả một quá trình tích lũy." },
      { label: "Thỏa hiệp để kéo dài trật tự", hint: "Ổn định ngắn hạn", effect: { production: 2, inequality: 3, conflict: -4, stability: 7, state: 4 }, feedback: "Khủng hoảng được trì hoãn. Nhưng những mâu thuẫn tạo ra nó vẫn cần một lời giải dài hạn." },
      { label: "Để xung đột bùng nổ", hint: "Đứt gãy cũ–mới", effect: { production: -5, inequality: -7, conflict: 18, stability: -22, state: -12 }, feedback: "Đứt gãy xảy ra dữ dội. Cái cũ bị thách thức để mở đường cho một hình thái xã hội khác." }
    ]
  }
];

const initialStats = { production: 32, inequality: 22, conflict: 18, stability: 74, state: 0 };
let stats = { ...initialStats };
let eventIndex = 0;
let selectedHistory = [];

const $ = (id) => document.getElementById(id);
const clamp = (value) => Math.max(0, Math.min(100, value));
const pad = (value) => String(value).padStart(2, "0");
const setText = (id, value) => { const element = $(id); if (element) element.textContent = value; };

function updatePhaseTrack() {
  document.querySelectorAll(".phase-node").forEach((node, index) => node.classList.toggle("active", index === eventIndex));
}

function showScreen(id) {
  ["intro-screen", "game-screen", "result-screen"].forEach((screen) => $(screen).classList.toggle("hidden", screen !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStats() {
  const mappings = {
    production: "LỰC LƯỢNG SẢN XUẤT", inequality: "BẤT BÌNH ĐẲNG", conflict: "MÂU THUẪN", stability: "ỔN ĐỊNH", state: "QUYỀN LỰC NHÀ NƯỚC"
  };
  Object.keys(mappings).forEach((key) => {
    const value = Math.round(stats[key]);
    setText(`${key}-value`, pad(value));
    const bar = $(`${key}-bar`);
    if (bar) { bar.style.width = `${value}%`; bar.classList.remove("meter-pulse"); void bar.offsetWidth; bar.classList.add("meter-pulse"); }
    setText(`${key}-chip`, pad(value));
  });
  setText("world-status", stats.conflict >= 65 ? "Mâu thuẫn đang lên đỉnh" : stats.stability <= 48 ? "Trật tự xã hội đang rung chuyển" : stats.state >= 30 ? "Nhà nước đang tổ chức trật tự" : "Xã hội đang ổn định");
  setText("map-phase", eventIndex >= 4 ? "ĐANG BIẾN ĐỔI" : eventIndex >= 2 ? "TRẬT TỰ ĐƯỢC TỔ CHỨC" : "ĐANG HÌNH THÀNH");
}

function renderEvent() {
  const event = events[eventIndex];
  const eventCard = $("event-card");
  $("game-screen").classList.remove("turn-resolved");
  eventCard.classList.remove("event-enter");
  void eventCard.offsetWidth;
  eventCard.classList.add("event-enter");
  $("event-counter").textContent = `SỰ KIỆN ${pad(eventIndex + 1)} / 05`;
  $("event-index").textContent = pad(eventIndex + 1);
  $("chapter-name").textContent = event.chapter;
  $("event-category").textContent = event.category;
  $("cycle-label").textContent = `CYCLE ${pad(eventIndex + 1)}`;
  $("event-question").textContent = event.question;
  $("event-context").textContent = event.context;
  $("choices").innerHTML = event.choices.map((choice, index) => `<button class="choice" type="button" data-choice="${index}"><span class="choice-key">${String.fromCharCode(65 + index)}</span><span class="choice-text"><b>${choice.label}</b><br /><small>${choice.hint}</small></span><span class="choice-arrow">→</span></button>`).join("");
  $("feedback").classList.add("hidden");
  $("feedback").classList.remove("feedback-enter");
  updatePhaseTrack();
  document.querySelectorAll(".choice").forEach((button) => button.addEventListener("click", () => choose(Number(button.dataset.choice))));
  renderStats();
}

function choose(choiceIndex) {
  const event = events[eventIndex];
  const choice = event.choices[choiceIndex];
  selectedHistory.push({ event, choice });
  Object.entries(choice.effect).forEach(([key, delta]) => { stats[key] = clamp(stats[key] + delta); });
  $("game-screen").classList.add("turn-resolved");
  document.querySelectorAll(".choice").forEach((button) => { button.disabled = true; if (Number(button.dataset.choice) === choiceIndex) button.classList.add("selected"); });
  $("feedback-copy").textContent = choice.feedback;
  $("delta-list").innerHTML = Object.entries(choice.effect).filter(([, delta]) => delta !== 0).map(([key, delta]) => `<span class="delta ${delta < 0 ? "negative" : ""}">${key === "state" ? "NHÀ NƯỚC" : key === "production" ? "SẢN XUẤT" : key === "inequality" ? "BẤT BÌNH ĐẲNG" : key === "conflict" ? "MÂU THUẪN" : "ỔN ĐỊNH"} <strong>${delta > 0 ? "+" : ""}${delta}</strong></span>`).join("");
  $("feedback-title").textContent = eventIndex === events.length - 1 ? "HỆ QUẢ / MÔ PHỎNG HOÀN TẤT" : "HỆ QUẢ / XÃ HỘI ĐÃ DỊCH CHUYỂN";
  $("next-button").innerHTML = eventIndex === events.length - 1 ? "Xem kết quả <span>↗</span>" : "Tiếp tục <span>→</span>";
  $("feedback").classList.remove("feedback-enter");
  void $("feedback").offsetWidth;
  $("feedback").classList.add("feedback-enter");
  $("feedback").classList.remove("hidden");
  renderStats();
}

function showResult() {
  const score = clamp(Math.round(stats.conflict * .65 + stats.production * .2 + (100 - stats.stability) * .15));
  const transformed = stats.conflict >= 45 || stats.stability <= 50;
  $("result-title").innerHTML = transformed ? "MÂU THUẪN<br /><em>ĐÃ LÊN TIẾNG.</em>" : "TRẬT TỰ<br /><em>ĐÃ DỊCH CHUYỂN.</em>";
  $("result-core-word").innerHTML = transformed ? "BIẾN<br />ĐỔI" : "DỊCH<br />CHUYỂN";
  $("result-summary").textContent = transformed ? "Bạn vừa đi qua một chuỗi biến đổi: từ nền tảng vật chất, xã hội phân hóa, Nhà nước xuất hiện, rồi mâu thuẫn phát triển đến điểm buộc phải lựa chọn." : "Bạn đã giữ được ổn định tương đối, nhưng những lực kéo bên dưới trật tự vẫn chưa biến mất. Một xã hội có thể im lặng mà chưa thật sự giải quyết được mâu thuẫn.";
  $("result-score-value").textContent = pad(score);
  $("journey").innerHTML = selectedHistory.map((item, index) => `<div class="journey-step"><span>0${index + 1}</span><b>${item.event.chapter}</b><p>${item.choice.label}</p></div>`).join("");
  showScreen("result-screen");
}

function startGame() { stats = { ...initialStats }; eventIndex = 0; selectedHistory = []; showScreen("game-screen"); renderEvent(); }

$("start-button").addEventListener("click", startGame);
$("restart-button").addEventListener("click", startGame);
$("play-again-button").addEventListener("click", startGame);
$("next-button").addEventListener("click", () => { if (eventIndex === events.length - 1) showResult(); else { eventIndex += 1; renderEvent(); } });
$("debrief-button").addEventListener("click", () => { $("debrief").classList.toggle("hidden"); $("debrief-button").querySelector("span").textContent = $("debrief").classList.contains("hidden") ? "Giải mã bằng lý luận" : "Ẩn phần giải mã"; if (!$("debrief").classList.contains("hidden")) $("debrief").scrollIntoView({ behavior: "smooth", block: "start" }); });
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (!$('intro-screen').classList.contains("hidden") && key === "enter") { startGame(); return; }
  if ($("game-screen").classList.contains("hidden")) return;
  const keyIndex = { a: 0, b: 1, c: 2 }[key];
  if (keyIndex !== undefined) {
    const choice = document.querySelectorAll(".choice")[keyIndex];
    if (choice && !choice.disabled) choice.click();
  }
  if (key === "enter" && !$("feedback").classList.contains("hidden")) $("next-button").click();
});
