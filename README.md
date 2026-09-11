# THE STATE — web game mô phỏng xã hội

MVP tĩnh cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**.

## Chạy local

Có thể mở `dist/index.html` trực tiếp, hoặc chạy một static server trong thư mục dự án.

## Deploy Vercel

Import thư mục dự án vào Vercel. Cấu hình rewrite đã đưa `dist/index.html` thành trang chủ; không cần database, API hay biến môi trường.

Nếu dùng CLI sau khi đã đăng nhập:

```bash
npx vercel --prod
```

Kiểm tra release trước khi deploy:

```bash
node test/static-check.mjs
node test/smoke-test.mjs
```

## Vòng chơi

1. Điều kiện ban đầu
2. Phân hóa xã hội
3. Nhà nước xuất hiện
4. Mâu thuẫn phát triển
5. Bước chuyển / Cách mạng xã hội

Mục tiêu của MVP là tạo một trải nghiệm 5–7 phút để cả lớp chơi trước khi nhóm chuyển sang phần thuyết trình: “Tại sao xã hội lại biến đổi?”
