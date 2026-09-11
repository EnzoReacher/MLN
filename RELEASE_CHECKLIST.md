# Release checklist — THE STATE // EXHIBITION 01

## Vertical slice

- [x] Canvas 2D game shell thay cho dashboard.
- [x] Màn hình mở đầu và hướng dẫn `WASD` / `E` / `ESC`.
- [x] Nhân vật, camera theo nhân vật và tường va chạm.
- [x] Bốn phòng triển lãm có màu nhận diện riêng.
- [x] Bốn hiện vật tương tác, mỗi hiện vật có hai lựa chọn.
- [x] Thu thập đủ `4/4` evidence để mở cánh cửa cuối.
- [x] Kết thúc hiển thị mức tập trung quyền lực và áp lực mâu thuẫn.
- [x] Có phần ghi chú nối gameplay với lý thuyết.
- [x] Palette đỏ cách mạng–đen–đồng vàng, có biểu tượng búa–liềm và biểu ngữ chính trị.
- [x] Mỗi phòng có bảng luận đề và artifact gắn với chủ đề môn học.
- [x] Nút `RỜI TRIỂN LÃM` là nút HTML tương tác thật, dừng game và hiện màn cảm ơn.

## Automated checks

Chạy từ thư mục gốc:

```bash
node --check dist/app.js
node test/static-check.mjs
node test/smoke-test.mjs
```

Các test hiện xác nhận:

- Canvas game loop và HUD tồn tại.
- Đủ bốn phòng và bốn exhibit.
- Va chạm tường hoạt động ở vùng chặn và không chặn vùng sàn.
- Mỗi exhibit mở được dialogue với hai lựa chọn.
- Bốn evidence được ghi nhận.
- Cánh cửa cuối mở đúng điều kiện và màn ending xuất hiện.
- Nút quit dừng game, hiện quit screen và quay lại được màn hình đầu.
- Các khái niệm `giai cấp`, `tư liệu sản xuất`, `mâu thuẫn`, `Nhà nước`, `cách mạng xã hội` có trong game.
- Vercel rewrite giữ `/` về `dist/index.html`.

## Manual rehearsal

1. Chạy `python3 -m http.server 4173 --directory dist`.
2. Mở game bằng trình duyệt ở độ phân giải sẽ dùng khi thuyết trình.
3. Bấm **VÀO TRIỂN LÃM**.
4. Đi lần lượt tới bốn điểm sáng, nhấn `E`, chọn một phương án và đóng dialogue.
5. Đi tới điểm `EXIT` ở phòng cuối; xác nhận màn tổng kết xuất hiện.
6. Bấm **MỞ GHI CHÚ LÝ THUYẾT** và kiểm tra phần nối sang bài thuyết trình.
7. Reload/restart và chơi lại một nhánh lựa chọn khác.

## Deployment

- [ ] Commit và push source lên GitHub `EnzoReacher/MLN` branch `main`.
- [ ] Redeploy Vercel.
- [ ] Mở URL production ở route `/`, không dùng `/dist`.
- [ ] Kiểm tra console browser không có lỗi.
- [ ] Chơi trọn một vòng production trước khi trình chiếu.
