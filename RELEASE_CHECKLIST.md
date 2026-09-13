# Release checklist — THE STATE // EXHIBITION 01

## Nền móng game

- [x] Three.js/WebGL 3D gallery shell thay cho dashboard.
- [x] Three.js runtime được đóng gói local; không phụ thuộc CDN runtime.
- [x] Màn hình mở đầu và hướng dẫn `WASD` / chuột / `E` / `ESC`.
- [x] Nhân vật, camera theo nhân vật và tường va chạm.
- [x] Bốn phòng triển lãm có màu nhận diện riêng.
- [x] Bốn hiện vật trực quan; nội dung không nằm sẵn trong các hộp tĩnh.
- [x] `E` mở hồ sơ chương, không tạo lựa chọn A/B.
- [x] Viewer có nhiều panel, đoạn văn, chú thích ảnh, chuyển ảnh và lightbox.
- [x] Ảnh thiếu có fallback rõ ràng, không hiện broken image.
- [x] Bốn chương theo mạch điều kiện vật chất → giai cấp → Nhà nước → mâu thuẫn/cách mạng xã hội.
- [x] Cổng 02/03/04 khóa cho tới khi chương trước được đọc đến trang cuối và ghi nhận.
- [x] Cổng `EXIT` chỉ hoạt động sau `4/4` chương.
- [x] Nút `RỜI TRIỂN LÃM` dừng game và hiện màn cảm ơn.
- [x] Không còn glyph hoặc asset hammer-and-sickle lỗi.
- [x] Không còn mechanic lens/relation field cũ.
- [x] Không còn hộp lý thuyết tĩnh trong room.
- [x] Màn ending hiển thị số chương, panel và ảnh đã xem.
- [x] Renderer có cấu hình hiệu năng an toàn cho laptop/máy chiếu: pixel ratio giới hạn, không shadow map động, vật liệu nhẹ.
- [x] Spotlight định hướng và vùng bóng tiếp xúc tĩnh tạo chiều sâu mà không bật shadow-map động.
- [x] Tranh tường giữ đúng tỉ lệ ảnh; viewer có khung ảnh lớn, `contain` và lightbox.

## Nội dung đã tích hợp

- [x] Đối chiếu bốn chương trong `dist/content.js` với tài liệu Chương 7 đã cung cấp.
- [x] Đặt 18 ảnh tư liệu đã nén vào `dist/assets/`.
- [x] Điền `src`, `alt`, `caption` cho từng ảnh trong đúng section.
- [x] Gắn ảnh đại diện vào tranh lớn của cả bốn phòng.
- [x] Rút gọn nội dung: mỗi section tối đa hai đoạn, không đoạn nào vượt quá giới hạn đọc trong triển lãm.
- [ ] Kiểm tra nguồn/chú thích ảnh theo yêu cầu cuối của giảng viên.
- [ ] Đọc thử toàn bộ viewer ở kích thước màn hình trình chiếu.

## Automated checks

Chạy từ thư mục gốc:

```bash
node --check dist/app.js
node test/runtime-test.mjs
node test/static-check.mjs
node test/smoke-test.mjs
```

Các test xác nhận:

- Three.js game loop, HUD, content contract và viewer shell tồn tại.
- Runtime Three.js local thực sự expose được `WebGLRenderer` trước khi deploy.
- Có đúng bốn exhibit và bốn gate.
- Va chạm tường/cổng hoạt động; cổng sau không thể đi qua sớm.
- Hồ sơ mở bằng `E`, có panel, đoạn văn, image slot và lightbox.
- Không có lựa chọn A/B, lens cũ, icon Unicode hoặc asset búa–liềm.
- Có thể đóng hồ sơ chưa hoàn tất mà chương chưa bị ghi nhận.
- Đi hết ba panel mới mở từng cổng kế tiếp.
- Ending, nút thoát, màn cảm ơn và quay lại màn hình đầu hoạt động.
- Vercel rewrite giữ `/` về `dist/index.html`.

## Manual rehearsal

1. Chạy `python3 -m http.server 4173 --directory dist`.
2. Mở `http://localhost:4173` ở độ phân giải sẽ dùng khi thuyết trình.
3. Bấm **VÀO TRIỂN LÃM** và đi tới hiện vật chương 01.
4. Nhấn `E`; đọc đủ ba panel, thử đóng giữa chừng và xác nhận cổng chưa mở.
5. Nếu có ảnh, thử đổi ảnh, bấm ảnh để phóng to và đóng bằng `ESC`.
6. Hoàn tất lần lượt bốn chương; xác nhận không thể đi tắt.
7. Qua cổng cuối; kiểm tra ending và số panel/ảnh.
8. Thử **RỜI TRIỂN LÃM**, màn cảm ơn, quay lại màn hình đầu và chơi lại.
9. Mở DevTools, xác nhận Console không có lỗi và Network không có đường dẫn ảnh sai.

## Deployment

- [x] Commit và push source lên GitHub `EnzoReacher/MLN`, branch `main`.
- [x] Redeploy Vercel.
- [x] Mở URL production ở route `/`, không dùng `/dist`.
- [ ] Kiểm tra console browser không có lỗi.
- [ ] Chơi trọn một vòng production trước khi trình chiếu.
