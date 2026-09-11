# THE STATE // CRISIS ENGINE — web game mô phỏng xã hội

Game mô phỏng xã hội theo lượt cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**.

Đây là một trải nghiệm game ngắn cho cả lớp: người chơi bỏ phiếu A/B/C qua 5 lượt, nhìn bản đồ xã hội và các chỉ số dịch chuyển sau mỗi quyết định. Giao diện dùng ngôn ngữ của một crisis/strategy game — HUD, social field, telemetry, action cards và resolution report — thay vì bố cục website thông thường.

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
