# THE STATE // EXHIBITION 01

Game 3D WebGL khám phá một triển lãm chính trị cho sản phẩm sáng tạo môn Triết học Mác–Lênin: **Nhà nước và Cách mạng xã hội**. Three.js được đóng gói ngay trong `dist/vendor/`, nên game không phụ thuộc CDN bên ngoài khi chạy trên Vercel.

Người chơi điều khiển nhân vật đi qua một tuyến triển lãm bốn chương. Mỗi bức tranh là một exhibit độc lập: tới gần tranh nào, nhấn `E` thì chỉ hồ sơ của tranh đó xuất hiện. Tranh chính của mỗi phòng là mốc bắt buộc để mở cổng kế tiếp; hai tranh phụ là tư liệu mở rộng, hoàn toàn tùy chọn. Đây là một game khám phá tuyến tính, không phải dashboard và không dùng câu hỏi A/B.

## Chạy local

Từ thư mục dự án:

```bash
python3 -m http.server 4173 --directory dist
```

Mở <http://localhost:4173>.

## Điều khiển

- Click vào không gian triển lãm để khóa chuột, rồi dùng `WASD` hoặc phím mũi tên để di chuyển.
- Rê chuột: nhìn quanh trong không gian 3D.
- `E`: mở hiện vật, hồ sơ hướng dẫn hoặc cổng.
- `Enter` / nút **GHI NHẬN & ĐÓNG** hoặc **ĐÓNG TRANH**: đóng hồ sơ đang xem; không tự chuyển sang tranh khác.
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

## Nội dung và ảnh đã tích hợp

Nội dung bốn phòng hiện đã được biên tập từ tài liệu **Nhà nước và Cách mạng xã hội** mà nhóm cung cấp. Mạch chơi đi từ nguồn gốc và bản chất của Nhà nước, qua chức năng/hình thức, Nhà nước xã hội chủ nghĩa, rồi đến cách mạng xã hội. Toàn bộ dữ liệu nằm trong [`dist/content.js`](dist/content.js); engine chỉ đọc cấu trúc này nên nhóm vẫn có thể chỉnh câu chữ mà không phải sửa logic game.

Mỗi chương có các mục dạng:

```js
{
  label: "MỤC 01",
  title: "Tiêu đề mục",
  lead: "Đoạn dẫn ngắn",
  paragraphs: ["Đoạn nội dung thứ nhất", "Đoạn nội dung thứ hai"],
  images: [
    { src: "./assets/ch01-state-institutions.webp", alt: "Mô tả ảnh", caption: "Chú thích ảnh" }
  ]
}
```

18 ảnh tư liệu đã được nén WebP, đặt trong `dist/assets/` và gắn vào đúng section theo chủ đề. Mỗi phòng có ba tranh tường liên kết với ba mục nội dung: `E` ở tranh 01 mở mục 01, `E` ở tranh 02 mở mục 02, và `E` ở tranh 03 mở mục 03. Viewer không còn thanh điều hướng phòng nên không thể vô tình bật cả ba nội dung cùng lúc; nút đóng chỉ xử lý exhibit đang mở. Tranh chính được ghi nhận để mở cổng, còn tranh phụ bổ sung bối cảnh. Mọi tranh đều được fit theo tỉ lệ gốc, không kéo méo hoặc bị thu nhỏ vào một khung sai tỉ lệ; viewer có khung trình chiếu và lightbox để xem trọn ảnh. Mỗi phòng có thêm một thảm đỏ trung tâm với viền đồng mảnh và bảng nhãn thấp cạnh tranh, dùng hình học tĩnh nhẹ để giữ FPS ổn định. Điểm tương tác `E` nằm ngay trước tâm từng tranh. Nội dung mỗi mục được giữ ở dạng ngắn để đọc trong lớp. Nếu sau này thêm ảnh, giữ ảnh ở dạng nhẹ và cập nhật section tương ứng cùng mapping tranh nếu muốn dùng làm tranh tường. Game vẫn hiện khung chờ rõ ràng nếu đường dẫn ảnh sai thay vì để ảnh vỡ. Xem [`dist/assets/README.md`](dist/assets/README.md) để biết mapping hiện tại.

Không gian cũng có hai cây cảnh low-poly kiểu sảnh bảo tàng trong mỗi phòng: bệ trụ thấp, chậu terracotta lớn, thân cây phân nhánh và tán lá nhiều lớp được đặt cân đối ở hai góc. Cây đủ nổi bật để làm không gian có chiều sâu nhưng vẫn nằm ngoài đường đi, không chiếm phím `E`, không dùng spotlight hay shadow động và chỉ tạo bằng hình học nhẹ.

## Kiểm thử

```bash
node --check dist/app.js
node test/runtime-test.mjs
node test/static-check.mjs
node test/smoke-test.mjs
```

Smoke test mô phỏng cả tuyến: vào game, mở đúng hồ sơ của tranh phụ và tranh chính, kiểm tra đóng exhibit không làm nhảy nội dung hay mở cổng sớm, kiểm tra ảnh và lightbox, cổng tuần tự, ending, nút thoát và quay lại màn hình đầu.

Game không cần backend, database, API hay biến môi trường. `vercel.json` phục vụ `dist/index.html` ở route `/` và giữ asset rewrites cho Vercel.

Renderer được tối ưu cho máy trình chiếu/laptop phổ thông: không dùng shadow map động hay spotlight cục bộ, chỉ dùng ánh sáng nền/định hướng đồng đều, giới hạn pixel ratio, dùng vật liệu nhẹ hơn cho hình học tĩnh và giảm tần suất cập nhật HUD mà không ảnh hưởng điều khiển. Viewer cũng khóa tràn ngang để hồ sơ và ảnh luôn nằm trong khung.
