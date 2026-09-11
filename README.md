# THE STATE // EXHIBITION 01

Game khám phá triển lãm chính trị cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**.

Đây là game Canvas 2D chạy trực tiếp trên trình duyệt, không phải dashboard: người chơi điều khiển một nhân vật đi qua triển lãm, tìm bốn mảnh bằng chứng, tương tác với hiện vật bằng `E`, đưa ra lựa chọn và mở cánh cửa kết thúc. Visual dùng nền đen, đỏ cách mạng và đồng vàng, với búa–liềm, áp-phích lưu trữ và các bảng luận đề trong từng phòng.

## Chạy local

Mở `dist/index.html` trực tiếp hoặc chạy static server từ thư mục dự án:

```bash
python3 -m http.server 4173 --directory dist
```

Sau đó mở `http://localhost:4173`.

## Điều khiển

- `WASD` hoặc phím mũi tên: di chuyển.
- `E`: tương tác với người lưu trữ, hiện vật hoặc cánh cửa.
- `ESC`: đóng bảng tương tác.
- `RỜI TRIỂN LÃM`: dừng phiên chơi và hiện màn cảm ơn.

`EXIT` trong phòng cuối là một portal riêng. Nếu chưa đủ `4/4 evidence`, portal báo khóa; sau khi đủ evidence, đứng gần portal và nhấn `E` một lần để vào thẳng màn tổng kết.

## Nội dung chơi

1. Điều kiện vật chất — sản phẩm dư thừa và tư liệu sản xuất.
2. Giai cấp & sở hữu — sự phân hóa lợi ích.
3. Nhà nước & quyền lực — thiết chế, luật lệ và quyền lực.
4. Mâu thuẫn & chuyển hóa — khi quan hệ cũ trở thành lực cản.

Mỗi phòng có một bảng luận đề nhìn thấy ngay trong không gian: `TƯ LIỆU SẢN XUẤT`, `GIAI CẤP`, `THIẾT CHẾ NHÀ NƯỚC`, `CÁCH MẠNG XÃ HỘI`. Các biểu tượng búa–liềm và biểu ngữ trung tâm nối bốn phòng thành cùng một mạch lý luận.

Mỗi phòng cho người chơi một lựa chọn. Các lựa chọn thay đổi hai chỉ số ẩn: mức tập trung quyền lực và áp lực mâu thuẫn. Kết thúc hiển thị lại dấu vết đó rồi nối sang phần lý thuyết.

## Kiểm thử

```bash
node --check dist/app.js
node test/static-check.mjs
node test/smoke-test.mjs
```

Game không cần backend, database, API hay biến môi trường. `vercel.json` phục vụ `dist/index.html` ở route `/` và giữ asset rewrites cho Vercel.
