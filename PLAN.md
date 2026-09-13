# Kế hoạch THE STATE // EXHIBITION 01

## Hướng đã chốt

Game 3D WebGL chạy bằng Three.js bản cố định được đóng gói local trong `dist/vendor/`, không backend và không build pipeline phức tạp. Người chơi bước vào một tuyến triển lãm chính trị, thay vì đọc một giao diện mô phỏng kiểu website.

Luồng trải nghiệm đã chốt:

`vào sảnh → tới hiện vật → nhấn E → đọc/xem từng mục → hoàn tất chương → mở cổng kế tiếp → cánh cửa cuối`

Nền tảng này phù hợp deadline 3–4 ngày: không cần Unity, backend, database, asset nặng hay cài đặt phía người chơi; deploy thẳng lên Vercel.

## Nền móng hiện tại

- Màn hình mở đầu, HUD, minimap và hướng dẫn điều khiển.
- Không gian gallery 3D có sàn, tường, ánh sáng, ba tranh mỗi phòng và bốn phòng nối tiếp; tranh phụ lấp khoảng trống mà không thêm điểm tương tác gây rối.
- Di chuyển bằng `WASD`/phím mũi tên, nhìn bằng chuột; cổng có va chạm logic và chỉ mở đúng thứ tự.
- Bốn chương theo mạch giáo trình: điều kiện vật chất → giai cấp → Nhà nước → mâu thuẫn/cách mạng xã hội.
- Cổng 02, 03, 04 và cổng kết thúc hoạt động theo thứ tự; không thể đi tắt qua chương sau.
- Hiện vật trong phòng chỉ là điểm tương tác trực quan, không vẽ hộp lý thuyết cố định.
- `E` trên hiện vật mở **content viewer** nhiều trang; không có lựa chọn A/B làm gián đoạn việc đọc.
- Viewer hỗ trợ đoạn dẫn, nhiều đoạn văn, nhiều ảnh cho mỗi mục, chú thích, chuyển ảnh và xem ảnh phóng to.
- Ảnh thiếu hoặc đường dẫn sai có fallback rõ ràng, không để ảnh vỡ phá giao diện.
- Toàn bộ nội dung tách khỏi engine trong `dist/content.js`; nhóm có thể thay nội dung và thêm ảnh sau này.
- Màn ending thống kê số chương, số panel đã xem và số ảnh đã mở; nút thoát hiện màn cảm ơn thật.
- Renderer ưu tiên độ mượt: tắt shadow map động, giới hạn pixel ratio, dùng vật liệu Lambert/Basic cho hình học và tranh tĩnh, texture không tạo mipmap không cần thiết, HUD không cập nhật DOM ở mọi frame.
- Bản trình bày dùng spotlight định hướng và các vùng bóng/ánh sáng tiếp xúc tĩnh để tạo chiều sâu; không bật shadow-map động nên vẫn giữ ưu tiên FPS.

## Hợp đồng nội dung

Mỗi chương trong `dist/content.js` có `id`, `code`, `label`, `title` và một mảng `sections`. Mỗi section có `label`, `title`, `lead`, `paragraphs` và `images`.

Ảnh dùng dạng:

```js
{ src: "./assets/ch01-state-institutions.webp", alt: "Mô tả ngắn", caption: "Chú thích hiển thị dưới ảnh" }
```

Nội dung Chương 7 và 18 ảnh tư liệu đã được gắn vào bốn chương. Không sửa `app.js` để thay chữ hoặc ảnh; chỉ cập nhật dữ liệu trong `content.js` và mapping ảnh trong `dist/assets/`.

## Việc còn lại

### 1. Đối chiếu nội dung và nguồn ảnh

- [x] Đối chiếu bốn chương với tài liệu Chương 7 đã cung cấp.
- [x] Chia nội dung thành ba mục đọc trong mỗi phòng, mỗi mục có một ý rõ ràng.
- [x] Nén 18 ảnh tư liệu thành WebP, viết `alt`/caption và gắn vào đúng section.
- [x] Dùng một ảnh đại diện phù hợp làm tranh chính và hai ảnh phụ cho từng phòng.
- [x] Fit từng tranh 3D theo tỉ lệ ảnh gốc; điểm `E` căn theo tâm tranh chính; viewer có khung trình chiếu và lightbox để xem trọn ảnh.
- [x] Rút gọn mỗi mục còn tối đa hai đoạn, phù hợp đọc khi thuyết trình.
- [ ] Nhóm kiểm tra lần cuối nguồn/chú thích ảnh theo yêu cầu của giảng viên.
- [ ] Nhóm đọc thử toàn bộ nội dung trên đúng màn hình trình chiếu.

### 2. Rehearsal trên máy trình chiếu

- Chạy static server trên CachyOS.
- Chơi từ sảnh đến cổng cuối bằng bàn phím.
- Kiểm tra laptop, màn hình máy chiếu và mobile-width.
- Đọc thử toàn bộ chữ ở kích thước thực tế; chỉnh độ dài nội dung nếu viewer quá dài.

### 3. Deploy

- [x] Commit các file `dist`, `test`, tài liệu và `vercel.json`.
- [x] Push GitHub `EnzoReacher/MLN`, branch `main`.
- [x] Redeploy Vercel và mở route `/`.
- [ ] Chơi trọn một vòng production trên máy thuyết trình, kiểm tra console và các đường dẫn ảnh.

## Cách trình bày trên lớp

1. Nói ngắn: “Đây là một triển lãm mà cả lớp có thể bước vào.”
2. Cho một bạn điều khiển nhân vật tới hiện vật đầu tiên.
3. Cả lớp cùng đọc/xem từng hồ sơ; người trình bày nối mỗi phòng với một mắt xích lý luận.
4. Khi cổng cuối mở, dùng ending và ghi chú lý thuyết để tổng kết chuỗi quan hệ.

## Tiêu chí hoàn thành

- Người mới hiểu điều khiển trong dưới 15 giây.
- Một vòng chơi mất khoảng 5–10 phút, tùy thời gian đọc.
- Người chơi không thể bỏ qua chương hoặc mở nội dung phòng sau khi chưa qua cổng.
- Mỗi nội dung và ảnh đều mở từ đúng hiện vật bằng `E`.
- Không có lỗi JavaScript, ảnh vỡ, nút chết hoặc modal bị kẹt.
- Chạy ở `/` trên Vercel, không cần cài đặt gì phía người chơi.
