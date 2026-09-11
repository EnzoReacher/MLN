# THE STATE // EXHIBITION 01

Game khám phá triển lãm chính trị cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**.

Đây là game Canvas 2D chạy trực tiếp trên trình duyệt, không phải dashboard: người chơi điều khiển một nhân vật đi qua triển lãm, tìm bốn mảnh bằng chứng, tương tác với hiện vật bằng `E`, đưa ra lựa chọn và mở cánh cửa kết thúc.

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

## Nội dung chơi

1. Điều kiện vật chất — sản phẩm dư thừa và tư liệu sản xuất.
2. Giai cấp & sở hữu — sự phân hóa lợi ích.
3. Nhà nước & quyền lực — thiết chế, luật lệ và quyền lực.
4. Mâu thuẫn & chuyển hóa — khi quan hệ cũ trở thành lực cản.

Mỗi phòng cho người chơi một lựa chọn. Các lựa chọn thay đổi hai chỉ số ẩn: mức tập trung quyền lực và áp lực mâu thuẫn. Kết thúc hiển thị lại dấu vết đó rồi nối sang phần lý thuyết.

## Kiểm thử

```bash
node --check dist/app.js
node test/static-check.mjs
node test/smoke-test.mjs
```

Game không cần backend, database, API hay biến môi trường. `vercel.json` phục vụ `dist/index.html` ở route `/` và giữ asset rewrites cho Vercel.
