# Release checklist — THE STATE

## Phase 3 — Release candidate

- [x] Nội dung đi theo chuỗi điều kiện kinh tế → phân hóa → Nhà nước → mâu thuẫn → bước chuyển.
- [x] Mỗi sự kiện có 3 lựa chọn và hệ quả riêng.
- [x] Phần debrief liên hệ giai cấp, tư liệu sản xuất, mâu thuẫn, Nhà nước và cách mạng xã hội.
- [x] Có ghi chú rõ đây là mô hình minh họa, không phải số liệu thống kê thực tế.
- [x] Có cấu hình Vercel tĩnh, không cần backend, database hoặc biến môi trường.
- [x] Có hỗ trợ phím A/B/C để chọn và Enter để tiếp tục khi trình chiếu.
- [x] Rewrite Vercel đưa `dist/index.html` thành trang chủ và phục vụ các asset tĩnh.
- [ ] Kiểm tra bằng URL preview thật trên browser — chờ xác thực Vercel; local browser preview bị môi trường chặn.

## Phase 4 — Rehearsal and sign-off

### Automated regression

Chạy từ thư mục gốc:

```bash
node test/static-check.mjs
node test/smoke-test.mjs
```

Bài test phải xác nhận:

- 243/243 đường chơi hoàn tất.
- Mỗi lượt có đúng 3 lựa chọn.
- Lựa chọn đã chọn được đánh dấu; lựa chọn còn lại bị khóa.
- Phím A/B/C và Enter hoạt động.
- Mọi chỉ số nằm trong khoảng 0–100.
- Debrief, restart và play-again hoạt động.

### Automated sign-off already completed

- [x] Static release check pass.
- [x] 243/243 paths pass in the final Phase 4 smoke test.
- [x] 25 additional repeated smoke runs pass after the final code change.
- [x] Stable and high-conflict ending branches both pass.

### Manual rehearsal

1. Mở game trên màn hình sẽ dùng để thuyết trình.
2. Người dẫn nói: “Trước khi bắt đầu, mời cả lớp cùng chơi một trò chơi.”
3. Cho lớp bỏ phiếu A/B/C ở từng sự kiện; nhóm chỉ bấm lựa chọn thắng.
4. Khi hiện kết quả, hỏi: “Tại sao chỉ vài lựa chọn lại khiến cấu trúc xã hội thay đổi?”
5. Mở phần “Giải mã bằng lý luận” và chuyển sang bài thuyết trình.
6. Giữ tổng thời lượng game trong 5–7 phút.

### Release decision

Chỉ bàn giao khi smoke test pass và người dẫn đã chơi trọn một vòng trên thiết bị trình chiếu. Không thêm tính năng mới sau buổi diễn tập cuối.
