# Kế hoạch hoàn thiện trong 3–4 ngày

## Concept đã chốt

**THE STATE — Mô phỏng một xã hội** là một decision game tĩnh, nơi cả lớp cùng bỏ phiếu cho 5 quyết định. Mỗi lựa chọn làm thay đổi các chỉ số: lực lượng sản xuất, bất bình đẳng, mâu thuẫn, ổn định và quyền lực nhà nước.

Điểm khác biệt của sản phẩm là người chơi không “đi tham quan” một bản đồ có sẵn. Người chơi nhìn thấy **cấu trúc xã hội tự dịch chuyển** sau từng quyết định.

## Bản MVP đã có

- Màn hình mở đầu có không khí game và nút vào chơi ngay.
- 5 sự kiện theo đúng mạch kiến thức: điều kiện vật chất → phân hóa giai cấp → Nhà nước → mâu thuẫn phát triển → bước chuyển.
- Mỗi sự kiện có 3 lựa chọn có hệ quả khác nhau.
- Bản đồ xã hội trung tâm và 5 thanh chỉ số cập nhật theo thời gian thực.
- Kết quả cuối có điểm chuyển biến, hành trình lựa chọn và phần giải mã bằng lý luận.
- Chơi lại không cần tải lại trang.
- Chạy tĩnh, không backend, không database, phù hợp với Vercel.

## Lịch 3–4 ngày

### Ngày 1 — Có game để chơi

- Chạy thử đủ một vòng trên laptop và điện thoại.
- Cả nhóm đọc từng câu hỏi, sửa những chỗ dùng từ quá khó hoặc chưa sát giáo trình.
- Chốt tên nhóm, tên sản phẩm và cách giới thiệu trong 20 giây.

### Ngày 2 — Làm trải nghiệm “wow”

- Thêm hiệu ứng chuyển cảnh ngắn giữa các sự kiện.
- Làm bản trình chiếu dễ nhìn: chữ lớn, lựa chọn rõ, không cần giải thích thao tác dài.
- Tinh chỉnh các nhánh để mỗi lựa chọn thật sự tạo ra khác biệt trên chỉ số và phần kết.
- Kiểm tra trên màn hình chiếu và điện thoại.

### Ngày 3 — Khóa nội dung và đóng gói

- Đối chiếu 5 sự kiện với giáo trình/bài giảng của cô.
- Chuẩn bị lời dẫn: “Trước khi bắt đầu, mời cả lớp cùng chơi một trò chơi.”
- Chuẩn bị phần chuyển: “Tại sao chỉ vài lựa chọn lại khiến cấu trúc xã hội thay đổi?”
- Deploy thử trên Vercel và tạo một đường link dự phòng cục bộ.

### Ngày 4 — Chỉ dùng nếu cần

- Chơi thử như buổi thuyết trình thật, giới hạn 5–7 phút.
- Phân vai: người dẫn game, người giải thích chỉ số, người thuyết trình lý luận, người xử lý link/máy chiếu.
- Sửa lỗi cuối, không mở rộng thêm tính năng.

## Flow trình bày trên lớp

1. Cho cô và cả lớp chơi 2–3 sự kiện đầu.
2. Để lớp tự chọn tiếp thay vì nhóm giải thích trước.
3. Hiện kết quả và hỏi: **“Tại sao xã hội lại biến đổi?”**
4. Dùng phần debrief để nối sang nguồn gốc, bản chất, chức năng của Nhà nước và vai trò của cách mạng xã hội.

## Tiêu chí hoàn thành

- Một người chưa xem trước vẫn hiểu cách chơi trong dưới 15 giây.
- Một vòng chơi hoàn tất trong 5–7 phút.
- Mỗi lựa chọn làm thay đổi ít nhất một chỉ số.
- Không có màn hình trống, lỗi console hoặc nút chết.
- Chạy được bằng link Vercel và không cần cài đặt gì.

## Những thứ chưa làm trong MVP

Không thêm nhân vật 3D, bản đồ kiểu Google Maps, đăng nhập, bảng xếp hạng, chat, database hay hệ thống điểm phức tạp. Những thứ đó không giúp phần thuyết trình mạnh hơn trong thời hạn này.
