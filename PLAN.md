# Kế hoạch THE STATE // EXHIBITION 01

## Hướng đã chốt

Game 2D top-down chạy bằng Canvas + JavaScript thuần. Người chơi điều khiển một nhân vật trong triển lãm chính trị, thay vì đọc một giao diện mô phỏng kiểu website.

Lựa chọn này giữ đúng giới hạn 3–4 ngày: không cần cài Unity, không có backend, không phụ thuộc asset nặng và deploy thẳng lên Vercel.

## Vertical slice hiện tại

- Màn hình mở đầu có mục tiêu và hướng dẫn điều khiển.
- Canvas world có camera bám nhân vật, sàn, tường, hành lang và bốn phòng.
- Di chuyển bằng `WASD`/phím mũi tên và va chạm với tường.
- Bốn khu triển lãm theo mạch giáo trình: điều kiện vật chất → giai cấp → Nhà nước → mâu thuẫn/cách mạng xã hội.
- Bốn hiện vật có nội dung, lựa chọn và phản hồi riêng.
- Có minimap, số mảnh bằng chứng, mục tiêu động và prompt tương tác.
- Cánh cửa cuối mở khi đã thu thập đủ bốn mảnh.
- Màn tổng kết phân loại quyền lực/mâu thuẫn và có phần ghi chú lý thuyết.

## Các bước còn lại

### Bước 1 — Test chơi thật

- Chạy local trên CachyOS bằng static server.
- Chơi trọn một vòng bằng bàn phím.
- Kiểm tra kích thước màn hình máy chiếu và laptop.
- Đọc lại từng đoạn nội dung với nhóm để bảo đảm sát giáo trình.

### Bước 2 — Polish có kiểm soát

- Tinh chỉnh tốc độ nhân vật, vị trí tường và khoảng tương tác.
- Thêm 1–2 chi tiết thị giác nhỏ nếu còn thời gian: bảng tên, âm thanh click nhẹ hoặc hiệu ứng cửa mở.
- Không mở rộng sang Unity, 3D, login, database hay bản đồ kiểu Google Maps.

### Bước 3 — Deploy

- Commit các file `dist`, `test`, `README.md`, `PLAN.md`, `RELEASE_CHECKLIST.md`, `vercel.json`.
- Push lên GitHub `EnzoReacher/MLN` branch `main`.
- Redeploy project Vercel và mở route `/`.
- Test lại URL production trên trình duyệt thật.

## Cách trình bày trên lớp

1. Nói ngắn: “Đây là một triển lãm mà cả lớp có thể bước vào.”
2. Cho một bạn điều khiển, cả lớp quan sát và chọn ở bốn hiện vật.
3. Khi cánh cửa cuối mở, dùng màn tổng kết để hỏi: “Những quan hệ nào đã tạo ra căn phòng này?”
4. Nối sang nguồn gốc, bản chất của Nhà nước và vai trò của cách mạng xã hội.

## Tiêu chí hoàn thành

- Người mới hiểu điều khiển trong dưới 15 giây.
- Một vòng chơi mất khoảng 5–7 phút.
- Có thể hoàn thành từ màn đầu đến màn kết thúc không refresh.
- Không có lỗi JavaScript, nút chết hoặc tương tác không phản hồi.
- Chạy ở `/` trên Vercel, không cần cài đặt gì phía người chơi.
