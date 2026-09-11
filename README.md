# THE STATE // EXHIBITION 01

Game Canvas 2D khám phá một triển lãm chính trị cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**.

Người chơi điều khiển nhân vật đi qua một tuyến triển lãm bốn chương. Ở mỗi phòng, người chơi phải tới đúng hiện vật, nhấn `E`, đọc từng mục và xem ảnh tư liệu. Chỉ khi đi hết hồ sơ chương đó, cổng kế tiếp mới mở. Đây là một game khám phá tuyến tính, không phải dashboard và không dùng câu hỏi A/B.

## Chạy local

Từ thư mục dự án:

```bash
python3 -m http.server 4173 --directory dist
```

Mở <http://localhost:4173>.

## Điều khiển

- `WASD` hoặc phím mũi tên: di chuyển.
- `E`: mở hiện vật, hồ sơ hướng dẫn hoặc cổng.
- `Enter` / nút **MỤC TIẾP THEO**: chuyển trang trong hồ sơ.
- `←` / `→`: chuyển ảnh khi mục hiện tại có nhiều ảnh.
- Bấm vào ảnh: mở ảnh ở chế độ xem lớn.
- `ESC`: đóng ảnh lớn, hồ sơ hoặc thông báo.
- **RỜI TRIỂN LÃM**: dừng phiên chơi và hiện màn cảm ơn.

## Tuyến chơi

1. Điều kiện vật chất — sản xuất, sản phẩm dư thừa và tư liệu sản xuất.
2. Giai cấp và sở hữu — sự phân hóa vị trí và lợi ích.
3. Nhà nước và quyền lực — thiết chế, luật lệ và quyền lực.
4. Mâu thuẫn và chuyển hóa — khi quan hệ cũ trở thành lực cản, mở ra cách mạng xã hội.

Các cổng được khóa theo đúng thứ tự: hoàn tất 01 mới sang 02, hoàn tất 02 mới sang 03, hoàn tất 03 mới sang 04. Cánh cửa cuối chỉ hoạt động sau khi cả bốn hồ sơ đã được ghi nhận.

## Nơi điền nội dung và ảnh chính thức

Toàn bộ nội dung nằm trong [`dist/content.js`](dist/content.js). Engine chỉ đọc cấu trúc dữ liệu này, nên nhóm có thể thay chữ và thêm ảnh mà không phải sửa logic game.

Mỗi chương có các mục dạng:

```js
{
  label: "MỤC 01",
  title: "Tiêu đề mục",
  lead: "Đoạn dẫn ngắn",
  paragraphs: ["Đoạn nội dung thứ nhất", "Đoạn nội dung thứ hai"],
  images: [
    { src: "./assets/ch01-factory.jpg", alt: "Mô tả ảnh", caption: "Chú thích ảnh" }
  ]
}
```

Đặt ảnh trong `dist/assets/`. Nếu ảnh chưa được thêm hoặc đường dẫn sai, game hiện khung chờ rõ ràng thay vì ảnh vỡ. Xem [`dist/assets/README.md`](dist/assets/README.md) để biết quy ước đặt tên.

## Kiểm thử

```bash
node --check dist/app.js
node test/static-check.mjs
node test/smoke-test.mjs
```

Smoke test mô phỏng cả tuyến: vào game, mở/đóng hồ sơ, đọc đủ ba mục mỗi chương, kiểm tra ảnh và lightbox, cổng tuần tự, ending, nút thoát và quay lại màn hình đầu.

Game không cần backend, database, API hay biến môi trường. `vercel.json` phục vụ `dist/index.html` ở route `/` và giữ asset rewrites cho Vercel.
