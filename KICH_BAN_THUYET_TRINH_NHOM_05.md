# BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC
### KHOA LÝ LUẬN CHÍNH TRỊ — BỘ MÔN KINH TẾ CHÍNH TRỊ MÁC – LÊNIN

---

# KỊCH BẢN THUYẾT TRÌNH DỰ ÁN 3D WEBGL INTERACTIVE
## CHUYÊN ĐỀ: NỀN KINH TẾ THỊ TRƯỜNG VÀ CÁC QUY LUẬT CỦA NỀN KINH TẾ THỊ TRƯỜNG
### Sản phẩm trung tâm: Không gian Triển lãm 3D tương tác "Who Holds The Room?"
*(Tài liệu thuyết minh kịch bản báo cáo trước Hội đồng đánh giá — Thời lượng: 12 đến 15 phút)*

---

## I. THÔNG TIN DỰ ÁN & PHÂN CÔNG THỰC HIỆN

### BẢNG THÔNG TIN DỰ ÁN

| Hạng mục | Nội dung chi tiết |
| :--- | :--- |
| **Nhóm thực hiện** | Nhóm 05 (Lớp chuyên ngành Kinh tế & Marketing) |
| **Học phần** | Kinh tế chính trị Mác – Lênin |
| **Chuyên đề nghiên cứu** | Nền kinh tế thị trường và các quy luật của nền kinh tế thị trường |
| **Hình thức sản phẩm** | Không gian Triển lãm 3D WebGL và Phòng đấu Multiplayer trực tuyến |
| **Link trải nghiệm (Người học)** | https://mln-chi-eight.vercel.app/ (Điện thoại hoặc laptop) |
| **Link điều hành (Host Admin)** | https://mln-chi-eight.vercel.app/admin.html (Trình chiếu màn hình lớn) |
| **Thời lượng thuyết trình** | 12 – 15 phút (Chuẩn theo khung giờ quy định) |

### PHÂN CÔNG VAI TRÒ TRÊN GIẢNG ĐƯỜNG

| Vai trò | Thành viên | Nhiệm vụ cụ thể trên giảng đường |
| :--- | :--- | :--- |
| **Người thuyết trình (Speaker)** | Đại diện nhóm | Cầm micro, dẫn dắt nội dung bài học, kết nối lớp học và giải thích các ví dụ thực tiễn sinh động, dễ hiểu. |
| **Người điều khiển (Operator)** | Thành viên kỹ thuật | Mở song song Admin và Triển lãm 3D; tạo phòng, bấm bắt đầu, điều khiển nhân vật (WASD) khớp với lời thuyết trình. |

> *[Lưu ý tương tác & phong thái]: Trường hợp 1 bạn báo cáo độc lập: Hoàn toàn có thể vừa nói vừa dùng chuột/bàn phím điều khiển góc nhìn 3D nhẹ nhàng.*

---

## II. KẾ HOẠCH THỜI GIAN THUYẾT TRÌNH (12 – 15 PHÚT)

| Thời gian | Chặng | Nội dung trọng tâm | Mục tiêu đạt được |
| :---: | :---: | :--- | :--- |
| **00:00 – 02:00** | Chặng 1 | Mở đầu, cấp mã phòng 4 số, cả lớp vào sảnh chờ | Tạo sự chú ý và tương tác sôi nổi ngay từ đầu. |
| **02:00 – 04:00** | Chặng 2 | Phòng 1: Bản chất KTTT, Chợ Bến Thành, khuyết tật và vai trò Nhà nước. Vượt Cổng 1. | Làm rõ tính tất yếu của KTTT định hướng XHCN. |
| **04:00 – 06:00** | Chặng 3 | Phòng 2: Quy luật Giá trị (ví dụ may mặc, tự động hóa robot). Mở mật mã két sắt 1867. | Khẳng định vai trò hao phí lao động xã hội cần thiết. |
| **06:00 – 08:30** | Chặng 4 | Phòng 3: Quy luật Cung – Cầu (giá xe công nghệ trời mưa) và Lưu thông tiền tệ. Vượt Cổng 3. | Gắn liền quy luật kinh tế với đời sống thực tế. |
| **08:30 – 11:00** | Chặng 5 | Phòng 4: Quy luật Cạnh tranh (R&D, hàng giả), lật thẻ bài, giải mã câu hỏi cốt lõi CQ. | Khẳng định kinh tế số không làm mất quy luật cung cầu. |
| **11:00 – 13:00** | Chặng 6 | Bảng xếp hạng trực tiếp, vinh danh người chơi xuất sắc | Đánh giá trực quan mức độ tiếp thu của người học. |
| **13:00 – 14:30** | Chặng 7 | Tổng kết thông điệp, cam kết liêm chính học thuật (100% ảnh thật báo chí, trích dẫn chuẩn). | Đáp ứng trọn vẹn tiêu chí minh bạch và trách nhiệm. |

---

## III. KỊCH BẢN CHI TIẾT DÀNH CHO NGƯỜI THUYẾT TRÌNH

### CHẶNG 1: MỞ ĐẦU & KẾT NỐI CẢ LỚP VÀO SẢNH CHỜ (00:00 – 02:00)

**[THAO TÁC MÁY TÍNH]:**  
Mở tab Admin (mln-chi-eight.vercel.app/admin.html) chiếu lên màn hình lớn. Bấm *'Sinh mã ngẫu nhiên'* -> Bấm *'TẠO PHÒNG MỚI'*. Màn hình hiển thị mã 4 số rõ ràng và trạng thái *'ĐANG CHỜ NGƯỜI CHƠI'*.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Kính thưa Thầy/Cô và chào tất cả các bạn! Hôm nay, thay vì trình chiếu slide chữ truyền thống, nhóm 05 xin phép mang đến một trải nghiệm học tập hoàn toàn mới: Không gian Triển lãm 3D tương tác trực tiếp trên nền web với tên gọi: *'Who Holds The Room? — Kinh tế chính trị Mác – Lênin'*.

Đặc biệt, trong buổi học hôm nay, cả lớp chúng ta sẽ là những người trực tiếp bước vào không gian triển lãm 3D này để vừa quan sát tư liệu, vừa tham gia giải đố và đua điểm trên Bảng xếp hạng trực tiếp.

Bây giờ, xin mời Thầy/Cô và các bạn truy cập vào đường link nhóm đã gửi: **mln-chi-eight.vercel.app**. Các bạn bấm **BẮT ĐẦU**, nhập tên của mình và điền mã phòng gồm 4 chữ số đang hiển thị trên màn hình: **[ĐỌC RÕ TỪNG SỐ, VÍ DỤ: 9 - 2 - 2 - 8]** rồi bấm **'VÀO PHÒNG CHỜ'**.

Cuộc đua hôm nay sẽ tính cả độ chính xác lẫn tốc độ về đích. Bạn nào đạt điểm cao nhất nhóm mình sẽ gửi tặng một phần quà kỷ niệm rất ý nghĩa! Nhóm mình xin phép phát lệnh bắt đầu để đưa cả lớp cùng bước vào triển lãm!"

**[THAO TÁC MÁY TÍNH]:**  
Trên trang Admin, bấm nút *'BẮT ĐẦU PHÒNG CHO TẤT CẢ NGƯỜI CHƠI'*. Toàn bộ màn hình thiết bị của người chơi tự động đồng bộ và bước vào sảnh 3D.

---

### CHẶNG 2: PHÒNG 1 — BẢN CHẤT KTTT & VƯỢT CỔNG 1 (02:00 – 04:00)

**[THAO TÁC MÁY TÍNH]:**  
Dùng phím WASD di chuyển nhân vật vào Phòng 1. Bấm phím E vào bức tranh đầu tiên: Chợ Bến Thành, sau đó xoay góc nhìn sang bức tranh Rác thải môi trường và Phiên họp Chính phủ.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Chào mừng Thầy/Cô và các bạn đến với Căn phòng số 01: Bản chất và các đặc trưng cơ bản của Nền kinh tế thị trường.

Kinh tế thị trường là nền kinh tế hàng hóa phát triển ở trình độ cao, hình thành khách quan từ kinh tế tự nhiên phát triển lên. Bức tranh Chợ Bến Thành minh họa rất rõ điều này: người mua và người bán tự do gặp gỡ, tự nguyện thỏa thuận giá cả theo quan hệ cung cầu.

Tuy nhiên, thị trường tự do có hoàn hảo không các bạn? Chắc chắn là KHÔNG. Bức tranh thứ hai phản ánh mặt trái khuyết tật: Vì mục tiêu tối đa hóa lợi nhuận, các chủ thể kinh tế dễ dẫn tới hủy hoại môi trường, làm cạn kiệt tài nguyên và gia tăng khoảng cách giàu nghèo.

Chính vì vậy, bức tranh thứ ba cho thấy một tất yếu khách quan: Luôn cần có sự điều tiết, quản lý vĩ mô của Nhà nước. Đây chính là bản chất khoa học của mô hình Kinh tế thị trường định hướng Xã hội Chủ nghĩa tại Việt Nam: kết hợp động lực của thị trường với vai trò dẫn dắt của Nhà nước vì mục tiêu dân giàu, nước mạnh, công bằng và văn minh."

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển đến Cổng 1, bấm phím E mở trắc nghiệm 25 giây, chọn phương án đúng (*'Cơ chế thị trường'*) để hạ cánh cổng vòm. Toàn lớp cùng di chuyển bước sang Phòng 2.

---

### CHẶNG 3: PHÒNG 2 — QUY LUẬT GIÁ TRỊ & MẬT MÃ LỊCH SỬ 1867 (04:00 – 06:00)

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển sang Phòng 2. Bấm phím E mở bức tranh Dây chuyền may mặc công nghiệp và bức tranh Dây chuyền robot tự động hóa.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Bước vào Phòng số 02, chúng ta cùng nghiên cứu quy luật kinh tế cơ bản nhất của sản xuất hàng hóa: Quy luật Giá trị.

Quy luật này đòi hỏi: Sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết.

Đối với sinh viên Kinh tế và Marketing chúng ta, bài học thực tế ở đây là gì? Giả sử mức trung bình xã hội để may một chiếc áo là 5 giờ công. Nếu doanh nghiệp của bạn quản lý kém, máy móc lạc hậu tốn tới 10 giờ, khi đem ra thị trường người tiêu dùng vẫn chỉ trả tiền theo mức 5 giờ xã hội cần thiết mà thôi. 5 giờ lãng phí kia doanh nghiệp phải tự gánh chịu thua lỗ.

Áp lực sống còn này buộc mọi nhà sản xuất phải liên tục cải tiến công nghệ, tự động hóa như hình ảnh robot các bạn đang thấy, nhằm hạ thấp hao phí lao động cá biệt xuống nhỏ hơn hoặc bằng mức xã hội cần thiết."

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển tới Cổng 2, bấm phím E mở Bàn phím số Numpad 3D mô phỏng ổ khóa cổ điển.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Tại Cổng 2, chúng ta gặp một thử thách mật mã lịch sử với câu đố: *'Năm xuất bản tập 1 bộ Tư bản (Das Kapital) của Các Mác — tác phẩm kinh điển làm sáng tỏ Quy luật giá trị và Giá trị thặng dư'*. Mật mã đã được giấu kín để các bạn tự suy nghĩ. Nếu không nhớ, người chơi có thể bấm nút *'GỢI Ý ĐÁP ÁN'* nhưng sẽ bị trừ 20 điểm!

Các bạn trong lớp có nhớ Các Mác xuất bản tập 1 bộ Tư bản vào năm nào không ạ? *(Dừng 2 giây để lớp tương tác)* — Vâng, chính xác là năm **1867**! Bây giờ chúng ta nhập 4 số: **1 - 8 - 6 - 7** rồi bấm OK. Cánh cửa sắt đã mở toang, mời cả lớp cùng tiến vào phòng tiếp theo!"

---

### CHẶNG 4: PHÒNG 3 — QUY LUẬT CUNG – CẦU & LƯU THÔNG TIỀN TỆ (06:00 – 08:30)

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển vào Phòng 3. Bấm mở bức tranh Tài xế xe công nghệ trời mưa và bức tranh Cọc tiền Ngân hàng Nhà nước.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Tại Căn phòng 03, chúng ta tiếp cận hai quy luật gắn liền trực tiếp với hoạt động chi tiêu hàng ngày: Quy luật Cung – Cầu và Quy luật Lưu thông tiền tệ.

Thứ nhất là Quy luật Cung – Cầu: Khi cung lớn hơn cầu thì giá giảm; khi cung nhỏ hơn cầu thì giá tăng. Các bạn đi xe công nghệ vào giờ cao điểm trời mưa chắc chắn từng thấy cước tăng gấp đôi, gấp ba. Đó không phải hãng xe cố tình ép giá, mà chính là phản ứng nhạy bén của quy luật cung cầu: Cầu đặt xe tăng vọt trong khi cung tài xế nhận cuốc giảm. Giá tăng lên nhằm kích thích thêm tài xế ra đường (tăng cung), đồng thời khiến người chưa thực sự cần dời lại chuyến đi (giảm cầu), nhanh chóng đưa thị trường về trạng thái cân bằng.

Thứ hai là Quy luật Lưu thông tiền tệ: Công thức của Các Mác: $M = (P \times Q) / V$. Tại sao quốc gia khó khăn không thể tự in thêm tiền phát cho dân? Bức ảnh tiền polymer của Ngân hàng Nhà nước cho thấy câu trả lời: Lượng tiền đưa vào lưu thông bắt buộc phải tương ứng với tổng giá cả hàng hóa thực tế. In vượt mức cần thiết thì đồng tiền lập tức mất giá và lạm phát bùng nổ. Vì vậy việc phát hành tiền luôn phải tuân thủ nghiêm ngặt quy luật khách quan."

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển đến Cổng 3, bấm phím E mở minigame trắc nghiệm tình huống giá xe và tiền tệ, chọn đáp án đúng để hạ cổng.

---

### CHẶNG 5: PHÒNG 4 — QUY LUẬT CẠNH TRANH & GIẢI MÃ CÂU HỎI KINH TẾ SỐ (08:30 – 11:00)

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển vào Phòng 4. Bấm xem bức tranh Phòng nghiên cứu R&D và bức tranh Xử lý hàng giả của Quản lý thị trường.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Căn phòng số 04 giới thiệu: Quy luật Cạnh tranh — động lực cốt lõi của nền kinh tế thị trường.

Cạnh tranh có hai mặt: Mặt tích cực, như bức tranh phòng thí nghiệm R&D, áp lực cạnh tranh buộc doanh nghiệp phải liên tục đầu tư nghiên cứu công nghệ mới, nâng cao chất lượng sản phẩm để giữ chân khách hàng.

Mặt tiêu cực, bức tranh tiếp theo cho thấy lực lượng chức năng thu giữ hàng giả: Vì lợi nhuận nhanh chóng, một số chủ thể đã gian lận, làm hàng nhái, bán phá giá, gây thiệt hại cho người tiêu dùng. Do đó, một môi trường kinh doanh tiến bộ luôn đòi hỏi hành lang pháp lý minh bạch và chế tài nghiêm minh từ Nhà nước."

**[THAO TÁC MÁY TÍNH]:**  
Di chuyển đến Cổng 4, bấm phím E mở game Lật thẻ bài trí nhớ (Memory Cards). Ghép đúng 4 cặp quy luật -> Màn hình hiển thị Câu hỏi trọng tâm cốt lõi (CQ).

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Tại Cổng 4, chúng ta có trò chơi Lật thẻ bài trí nhớ để ghép nối 4 quy luật với khái niệm cốt lõi. Và ngay sau khi vượt qua thử thách, CÂU HỎI TRỌNG TÂM CỐT LÕI của bài học xuất hiện: *'Trong kỷ nguyên kinh tế số, khi hàng hóa số có chi phí sao chép xấp xỉ bằng 0 và giá cả thay đổi từng giây bằng AI, liệu Quy luật Cung – Cầu truyền thống của Các Mác có còn giá trị không, hay đã bị vô hiệu hóa?'*

Nhóm 05 xin khẳng định dứt khoát: Quy luật Cung – Cầu KHÔNG HỀ BỊ MẤT ĐI! Trái lại, dữ liệu lớn và thuật toán giúp quy luật này vận hành nhạy bén hơn, linh hoạt hơn theo thời gian thực. Hơn nữa, dù việc sao chép thêm một bản kỹ thuật số tốn rất ít chi phí, nhưng hao phí lao động xã hội của con người để xây dựng phần mềm, máy chủ và thuật toán không bao giờ bằng 0. Lý luận Kinh tế chính trị Mác – Lênin vẫn hoàn toàn vẹn nguyên giá trị trong thời đại kinh tế số!"

---

### CHẶNG 6: BẢNG XẾP HẠNG TRỰC TIẾP & VINH DANH NGƯỜI CHƠI (11:00 – 13:00)

**[THAO TÁC MÁY TÍNH]:**  
Chuyển sang tab Admin hoặc bấm phím Q mở Bảng vàng vinh danh thành tích toàn lớp.

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Và giờ phút hồi hộp nhất đã đến! Mời Thầy/Cô và các bạn cùng hướng mắt lên màn hình máy chiếu: BẢNG XẾP HẠNG TRỰC TIẾP TOÀN LỚP!

*(Xướng tên các bạn đứng đầu)*: Xin chúc mừng bạn **[XƯỚNG TÊN QUÁN QUÂN]** đã xuất sắc giành vị trí Quán quân với số điểm tuyệt đối và tốc độ nhanh nhất! Tiếp theo xin chúc mừng bạn **[TÊN BẠN THỨ HAI]**, bạn **[TÊN BẠN THỨ BA]**... Cả lớp chúng ta hãy cùng dành một tràng pháo tay thật lớn để chúc mừng cho sự nỗ lực của tất cả thành viên trong buổi học hôm nay!"

---

### CHẶNG 7: KẾT LUẬN & CAM KẾT LIÊM CHÍNH HỌC THUẬT (13:00 – 14:30)

**[LỜI THOẠI NGƯỜI THUYẾT TRÌNH]:**  
"Kính thưa Thầy/Cô và các bạn, để hoàn thành sản phẩm Không gian Triển lãm 3D này, tập thể nhóm 05 xin đưa ra 3 cam kết danh dự về tính liêm chính học thuật:  
1. AI chỉ hỗ trợ kỹ thuật Three.js, toàn bộ ý tưởng và phân tích kinh tế do nhóm tự thực hiện.  
2. 100% ẢNH THẬT từ báo chí chính thống (Dân Trí, Thanh Niên, Lao Động...), trích nguồn minh bạch.  
3. Lý luận đối chiếu chuẩn xác từng trang Giáo trình KTCT Mác – Lênin của Bộ GD&ĐT (trang 53–67).  

Nhóm 05 xin trân trọng cảm ơn Thầy/Cô và các bạn đã chú ý lắng nghe và tham gia nhiệt tình. Nhóm rất mong nhận được những lời góp ý quý báu của Thầy/Cô!"

---

## IV. KẾ HOẠCH DỰ PHÒNG & XỬ LÝ TÌNH HUỐNG TRÊN GIẢNG ĐƯỜNG

| STT | Tình huống phát sinh | Phương án xử lý bình tĩnh, tự tin |
| :---: | :--- | :--- |
| **1** | Thành viên vào lớp muộn khi phòng đã bấm Bắt đầu | Người thuyết trình hướng dẫn nhanh: *'Các bạn vừa vào chỉ cần nhập đúng mã phòng trên máy chiếu, hệ thống có tính năng hỗ trợ vào muộn (Late-join) tự động đưa thẳng bạn vào triển lãm để tham gia cùng cả lớp'.* |
| **2** | Đường truyền mạng tại phòng học chập chờn | Dữ liệu bài giảng và mô hình 3D đã được lưu đệm trong trình duyệt; nếu có độ trễ chỉ cần nhấn F5 tải lại trang là mọi trạng thái sẽ phục hồi ngay trong 1 giây mà không mất dữ liệu. |
| **3** | Duy trì ánh mắt tương tác với Giảng viên và lớp học | Tránh nhìn chằm chằm vào máy tính. Sau mỗi ý trình bày, hướng ánh mắt về phía Giảng viên và các bạn, kết hợp cử chỉ tay hướng lên màn hình chiếu để dẫn dắt sự chú ý tự nhiên. |
| **4** | Giảng viên hỏi: *'Tại sao nhóm chọn hình thức 3D thay vì slide thông thường?'* | Trả lời tự tin: *'Dạ thưa Thầy/Cô, môn Kinh tế chính trị có nhiều nội dung lý luận trừu tượng. Nếu chỉ chiếu slide chữ sẽ dễ gây cảm giác thụ động. Nhóm em mong muốn đưa bài học vào không gian trực quan đa chiều, giúp cả lớp cùng tham gia trải nghiệm và thấy rõ sự gắn kết với chuyên ngành Kinh tế & Marketing của chúng em'.* |
| **5** | Giảng viên hỏi: *'Căn cứ nội dung học thuật trong sản phẩm lấy từ đâu?'* | Khẳng định dứt khoát: *'Dạ toàn bộ định nghĩa, nguyên lý và số liệu đều được nhóm đối chiếu trực tiếp từ Giáo trình Kinh tế chính trị Mác – Lênin của Bộ Giáo dục và Đào tạo (năm 2021, trang 53 đến 67); các hình ảnh thực tế đều có trích dẫn nguồn báo chí minh bạch'.* |

---
**HẾT KỊCH BẢN THUYẾT TRÌNH — TẬP THỂ NHÓM 05 HOÀN THÀNH**
