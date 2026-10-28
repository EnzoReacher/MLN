# BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC
## KHOA LÝ LUẬN CHÍNH TRỊ — BỘ MÔN KINH TẾ CHÍNH TRỊ MÁC – LÊNIN

---

# BÁO CÁO PHỤ LỤC: ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI USAGE) & CAM KẾT LIÊM CHÍNH HỌC THUẬT

* **Chuyên đề:** NỀN KINH TẾ THỊ TRƯỜNG VÀ CÁC QUY LUẬT CỦA NỀN KINH TẾ THỊ TRƯỜNG
* **Sản phẩm sáng tạo:** TRIỂN LÃM TƯƠNG TÁC 3D WEBGL VÀ PHÒNG ĐẤU MULTIPLAYER TRỰC TUYẾN
* **Nhóm thực hiện:** NHÓM 05 (Chuyên ngành Kinh tế & Marketing)
* **Link sản phẩm triển lãm:** [https://mln-chi-eight.vercel.app/](https://mln-chi-eight.vercel.app/)
* **Link máy chủ quản trị phòng đấu (Admin Host):** [https://mln-chi-eight.vercel.app/admin.html](https://mln-chi-eight.vercel.app/admin.html)
* **Mã nguồn dự án:** [GitHub Repository](https://github.com/EnzoReacher/MLN.git)

---

## I. TỔNG QUAN VỀ SẢN PHẨM SÁNG TẠO & PHƯƠNG THỨC TRÌNH BÀY

Thực hiện nghiêm túc yêu cầu đổi mới hình thức đánh giá của môn học Kinh tế chính trị Mác – Lênin, Nhóm 05 đã xây dựng một **sản phẩm công nghệ tương tác 3D WebGL (Web Game)** thay thế hoàn toàn hình thức trình chiếu slide thuyết trình thông thường (*đáp ứng tiêu chí bắt buộc: "Không sử dụng sản phẩm dạng slide thuyết trình"*).

### Các điểm nhấn cốt lõi của sản phẩm:
1. **Không gian Triển lãm 4 phòng chuyên đề có chiều sâu học thuật:**
   - **Phòng 01:** Khái niệm, sự hình thành khách quan và các đặc trưng phổ biến của nền Kinh tế thị trường (KTTT).
   - **Phòng 02:** Quy luật Giá trị – Quy luật kinh tế cơ bản của sản xuất hàng hóa.
   - **Phòng 03:** Quy luật Cung – Cầu và Quy luật Lưu thông tiền tệ (Kiểm soát lạm phát).
   - **Phòng 04:** Quy luật Cạnh tranh (Cạnh tranh nội bộ ngành vs giữa các ngành; tác động tích cực và mặt trái tiêu cực).
   *Mỗi phòng trưng bày 3 tác phẩm tư liệu lịch sử/báo chí chính thống kèm hồ sơ lý luận trích dẫn trực tiếp từ giáo trình.*

2. **Sản phẩm là TRUNG TÂM của buổi thuyết trình (Multiplayer Real-time Lobby):**
   - Người thuyết trình (Admin) tạo phòng đấu và cấp mã PIN 4 chữ số.
   - Toàn bộ khán giả trong lớp dùng điện thoại hoặc laptop truy cập trực tiếp vào hệ thống để thám hiểm bảo tàng 3D, thu thập các ngôi sao bí mật, giải mật mã và đua Bảng xếp hạng thời gian thực.
   - Tuân thủ đúng khung thời lượng quy định: 10–20 phút thuyết trình kết hợp trải nghiệm tương tác không quá 15 phút.

3. **Giải quyết câu hỏi cốt lõi (CQ - Core Question):**
   - Cổng kết thúc (Gate 04) đặt ra câu hỏi vận dụng thực tiễn: *"Kinh tế số có còn tuân theo quy luật cung – cầu truyền thống?"*.
   - Khẳng định bản chất quy luật vẫn giữ nguyên, nhưng cách thức vận hành trở nên linh hoạt, nhạy bén và tức thì hơn nhờ công nghệ dữ liệu lớn (Big Data) và thuật toán phân bổ nguồn lực.

---

## II. PHỤ LỤC MINH BẠCH ỨNG DỤNG AI (TIÊU CHÍ 4.1 — 0.5 ĐIỂM)

Nhóm 05 cam kết minh bạch 100% về việc sử dụng các công cụ Trí tuệ Nhân tạo. AI được định vị chính xác là **công cụ trợ lý kỹ thuật (technical/coding assistant)**, tuyệt đối không để AI làm thay tư duy lý luận chính trị và biên soạn nội dung học thuật.

### 1. Bảng tổng hợp công cụ AI được sử dụng

| Tên công cụ AI | Phiên bản / Môi trường | Mục đích sử dụng cụ thể | Phạm vi hỗ trợ | Tỷ lệ đóng góp |
| :--- | :--- | :--- | :--- | :--- |
| **Google Antigravity AI** | Gemini 3.8 Flash / IDE Agent | Hỗ trợ tái cấu trúc mã nguồn Three.js, tối ưu hóa CSS responsive cho màn hình máy chiếu lớp học, xử lý va chạm 3D và đồng bộ WebSocket. | Kỹ thuật / Frontend | **30%** *(Chỉ phần khung code)* |
| **Claude 3.7 Sonnet / ChatGPT** | Web Interface / LLM | Gợi ý các dạng câu đố sư phạm (Quiz, Numpad cipher, Memory card) để tăng tính thu hút cho sinh viên Kinh tế & Marketing. | Ý tưởng sư phạm | **20%** *(Chỉ gợi ý cấu trúc)* |
| **Pillow / Python Optimizer** | Python 3.14 Script | Tự động nén và chuẩn hóa định dạng 12 ảnh tư liệu sang WebP nhẹ, tối ưu tốc độ tải trên mạng wifi trường học. | Xử lý đa phương tiện | **15%** *(Kỹ thuật nén ảnh)* |

### 2. Bảng phân định Prompt, AI Output và Phần sinh viên kiểm chứng / biên soạn lại

| Hạng mục | Prompt chính đưa vào AI | Kết quả đầu ra của AI (AI Output) | Phần sinh viên chỉnh sửa & hoàn thiện |
| :--- | :--- | :--- | :--- |
| **1. Cấu trúc Triển lãm & Lý luận 4 phòng** | *"Hãy tổ chức không gian triển lãm 3D chia làm 4 phòng tương ứng với đề tài Nền kinh tế thị trường và các quy luật."* | AI đề xuất phân chia thành các chủ đề chung chung, một số thuật ngữ chưa bám sát giáo trình Kinh tế chính trị Mác – Lênin (Bộ GD&ĐT). | **Sinh viên loại bỏ các diễn giải sai lệch;** trực tiếp đối chiếu và trích xuất nguyên văn từ Giáo trình (trang 53–67), phân thành 4 phòng chuẩn xác: KTTT, Quy luật Giá trị, Quy luật Cung – Cầu & Tiền tệ, Quy luật Cạnh tranh. |
| **2. Hệ thống Minigame tại các Cổng** | *"Thiết kế các minigame mở cổng vượt ải phù hợp với sinh viên chuyên ngành Kinh tế & Marketing, không quá khó nhưng phải cuốn hút."* | AI tạo ra câu đố kéo thả hình thái xã hội cũ (Triết học) và hệ thống câu hỏi lý thuyết hàn lâm 10 giây gây áp lực cho người chơi. | **Sinh viên tái cấu trúc hoàn toàn:** Cổng 1 rút ngắn 2 câu hỏi thực tế (25s); Cổng 2 là Numpad mật mã năm 1867; Cổng 3 là trắc nghiệm cung - cầu/lạm phát; Cổng 4 là Lật thẻ 4 quy luật kinh tế + Câu hỏi vận dụng CQ. |
| **3. Tư liệu hình ảnh trưng bày** | *"Hãy sinh ra các hình ảnh minh họa cho các quy luật kinh tế thị trường."* | AI đề xuất tạo ảnh bằng AI Image Generator (Midjourney/DALL-E) với các chi tiết giả định, không có giá trị học thuật. | **Sinh viên KIÊN QUYẾT BÁC BỎ ảnh do AI tạo ra** (tuân thủ nghiêm ngặt yêu cầu của Giảng viên); tự tìm kiếm, thẩm định 12 bức ảnh báo chí chính thống (Dân Trí, Thanh Niên, Lao Động, Co.opmart, NHNN) có nguồn dẫn minh bạch. |

---

## III. QUY TRÌNH ĐỐI CHIẾU & KIỂM CHỨNG BẰNG NGUỒN CHÍNH THỐNG (TIÊU CHÍ 4.2 — 0.5 ĐIỂM)

Toàn bộ nội dung lý thuyết hiển thị trên bảng thông tin (content viewer), câu hỏi thử thách mở cổng và ghi chú ôn tập đều được Nhóm 05 đối chiếu trực tiếp với các giáo trình và tài liệu chính thống:

### 1. Bảng đối chiếu lý luận giáo trình chuẩn của Bộ GD&ĐT

| Học phần / Căn phòng | Nội dung lý thuyết trọng tâm | Nguồn tài liệu chính thống đối chiếu |
| :--- | :--- | :--- |
| **Phòng 01:**<br>**Nền kinh tế thị trường** | • Khái niệm: Nền kinh tế vận hành theo cơ chế thị trường, sản phẩm văn minh nhân loại.<br>• Đặc trưng: Tự chủ chủ thể, thị trường phân bổ nguồn lực, giá cả điều tiết.<br>• Khuyết tật thị trường & sự can thiệp tất yếu của Nhà nước. | **Giáo trình Kinh tế chính trị Mác – Lênin** (Dành cho bậc đại học không chuyên lý luận chính trị), Bộ GD&ĐT, NXB Chính trị quốc gia Sự thật, Hà Nội, 2021, **trang 53–57**. |
| **Phòng 02:**<br>**Quy luật Giá trị** | • Quy luật kinh tế cơ bản của sản xuất hàng hóa.<br>• Yêu cầu: Sản xuất và trao đổi phải dựa trên hao phí lao động xã hội cần thiết.<br>• Tác động: Điều tiết sản xuất/lưu thông; kích thích cải tiến kỹ thuật; phân hóa người sản xuất. | **Giáo trình Kinh tế chính trị Mác – Lênin**, Sđd, **trang 59–60**.<br>*(Mật mã cổng: Năm 1867 xuất bản tập 1 bộ Tư bản của C. Mác).* |
| **Phòng 03:**<br>**Quy luật Cung – Cầu & Lưu thông tiền tệ** | • Quan hệ cung – cầu điều tiết giá cả xoay quanh trục giá trị.<br>• Công thức lưu thông tiền tệ: $M = \frac{P \cdot Q}{V}$ (hoặc khi có thanh toán không dùng tiền mặt).<br>• Hiện tượng phát hành thừa tiền giấy dẫn tới lạm phát. | **Giáo trình Kinh tế chính trị Mác – Lênin**, Sđd, **trang 61–63**.<br>Đối chiếu: Báo cáo thường niên Ngân hàng Nhà nước Việt Nam về điều tiết cung ứng tiền tệ. |
| **Phòng 04:**<br>**Quy luật Cạnh tranh & Kinh tế số (CQ)** | • Cạnh tranh nội bộ ngành (hình thành giá trị thị trường) & giữa các ngành (tỷ suất lợi nhuận bình quân).<br>• Tác động tích cực (thúc đẩy LLSX) & Tiêu cực (hàng giả, cạnh tranh không lành mạnh).<br>• Vận dụng CQ: Cung – cầu trong kinh tế số. | **Giáo trình Kinh tế chính trị Mác – Lênin**, Sđd, **trang 63–67**.<br>Trích dẫn: P. Samuelson: *Kinh tế học*, t.1, tr. 547.<br>Báo Lao Động / Cục Quản lý thị trường về xử lý hàng giả. |

### 2. Thẩm định và kiểm chứng tư liệu hình ảnh thực tế (Nói không với ảnh AI)
Nhóm 05 chấp hành nghiêm ngặt chỉ đạo của Giảng viên về việc **không sử dụng hình ảnh do AI tạo sinh (AI-generated images)** mà sử dụng 100% hình ảnh phóng sự, báo chí có nguồn gốc xuất xứ rõ ràng:
- **Ảnh Phòng 1:** Chợ Bến Thành (hoạt động trao đổi hàng hóa truyền thống) & Cổng TTĐT Chính phủ (vai trò điều tiết vĩ mô).
- **Ảnh Phòng 2:** Dây chuyền may mặc công nghiệp Việt Nam & Ứng dụng công nghệ nông nghiệp thông minh (tối ưu hóa hao phí lao động).
- **Ảnh Phòng 3:** Siêu thị Co.opmart bình ổn giá nông sản (Cung - Cầu); Xe công nghệ giờ cao điểm (Báo Dân Trí); Tiền polymer 500.000đ (Ngân hàng Nhà nước Việt Nam).
- **Ảnh Phòng 4:** Triển lãm quốc tế Dệt may & Da giày Việt Nam; Phòng Lab R&D Masan Consumer (Báo Thanh Niên); Lực lượng Quản lý thị trường thu giữ kho hàng giả, hàng nhái nhãn hiệu (Báo Lao Động / Tổng cục QLTT).

---

## IV. BẢN CAM KẾT LIÊM CHÍNH HỌC THUẬT (TIÊU CHÍ 4.4 — 0.5 ĐIỂM)

> ### 📜 CAM KẾT CỦA TẬP THỂ NHÓM 05:
> 
> 1. **KHÔNG PHÓ MẶC CHO AI:** Chúng em khẳng định công cụ AI chỉ đóng vai trò hỗ trợ giải quyết các bài toán kỹ thuật lập trình giao diện 3D và tối ưu mã nguồn; toàn bộ cấu trúc bài thuyết trình, tư tưởng lý luận, phân tích chuyên môn và kịch bản tương tác đều do các thành viên nhóm tự thảo luận, nghiên cứu và xây dựng.
> 2. **NÓI KHÔNG VỚI ẢNH AI ẢO:** Toàn bộ 12 bức ảnh tư liệu trưng bày trong bảo tàng 3D là ảnh báo chí, phóng sự thực tế từ các nguồn thông tấn, cơ quan nhà nước và doanh nghiệp uy tín, có trích dẫn nguồn cụ thể ở chân từng bức tranh; không sử dụng bất kỳ ảnh deepfake hay ảnh AI tạo sinh không có nguồn gốc.
> 3. **TRÁCH NHIỆM CUỐI CÙNG:** Nhóm 05 chịu trách nhiệm hoàn toàn 100% trước Giảng viên và Hội đồng đánh giá về tính chính xác, tính trung thực và tính học thuật của toàn bộ nội dung sản phẩm.

| XÁC NHẬN CỦA NHÓM TRƯỞNG | ĐẠI DIỆN CÁC THÀNH VIÊN NHÓM 05 |
| :---: | :---: |
| *(Ký và ghi rõ họ tên)*<br><br><br><br>................................................................ | *(Đồng thuận cam kết)*<br><br><br><br>................................................................ |

---

## V. TÍNH SÁNG TẠO, TƯƠNG TÁC & LIÊN KẾT CHUYÊN NGÀNH (TIÊU CHÍ 4.3 — 0.5 ĐIỂM)

Sản phẩm của Nhóm 05 thể hiện sự bứt phá sáng tạo rõ nét trong phương pháp học tập lý luận chính trị, tạo cầu nối trực tiếp giữa lý thuyết Mác – Lênin với chuyên ngành Kinh tế & Marketing:

1. **Chuyển hóa Gamification trong học tập:**
   - Thay vì nghe đọc slide một chiều, người học được trực tiếp di chuyển (WASD), nhập vai nhà nghiên cứu bước vào bảo tàng 3D, thu thập các mảnh ghép hồ sơ để mở các cổng kiểm tra.
   - Mỗi cổng là một minigame kích thích tư duy: Trắc nghiệm tốc độ, Bàn phím số mật mã lịch sử (năm 1867), Ghép cặp trí nhớ 4 quy luật kinh tế.
2. **Khả năng tương tác đám đông (Real-time Multiplayer):**
   - Hệ thống máy chủ tích hợp mã PIN 4 chữ số giúp Admin (sinh viên thuyết trình) quản lý đồng thời cả lớp.
   - Mọi sinh viên trong phòng học đều có thể tham gia thi đấu cùng lúc trên điện thoại, Bảng xếp hạng cập nhật điểm số và thời gian trực tiếp, xóa bỏ hoàn toàn sự thụ động của người nghe.
3. **Gắn kết chặt chẽ với chuyên môn Kinh tế & Marketing:**
   - Sản phẩm khai thác sâu các tình huống thương mại hiện đại: Chiến lược định giá theo cung – cầu trong giờ cao điểm của các nền tảng xe công nghệ (Grab, Be); Tầm quan trọng của R&D trong nâng cao năng lực cạnh tranh sản phẩm; Cuộc chiến bảo vệ thương hiệu và đạo đức marketing trước vấn nạn hàng giả, hàng nhái.

---

### KẾT LUẬN
Báo cáo phụ lục này minh chứng rõ ràng việc ứng dụng AI của Nhóm 05 là **có trách nhiệm, minh bạch, sáng tạo và tuyệt đối tuân thủ liêm chính học thuật**. Sản phẩm công nghệ 3D tạo ra không chỉ đáp ứng xuất sắc các tiêu chí chấm điểm của giảng viên mà còn lan tỏa tinh thần đổi mới sáng tạo trong việc học tập và nghiên cứu các môn Lý luận Chính trị.
