# -*- coding: utf-8 -*-
"""
generate_presentation_docx.py
Kịch bản thuyết trình dự án sáng tạo 3D WebGL (Nhóm 05)
Chuyên đề: Nền kinh tế thị trường và các quy luật của nền kinh tế thị trường

Tối ưu hóa:
- Kế thừa và hoàn thiện toàn bộ phần nội dung người dùng đã rút gọn từ file .odg
- Bố cục 3 trang A4 cân đối, chuẩn mực học thuật, thẩm mỹ cao
- Ngôn ngữ nói tự nhiên, mạch lạc, tự tin, không văn mẫu AI, không dùng icon/emoji
- Cập nhật chuẩn xác cơ chế Cổng 2 (giấu mật mã, nút gợi ý trừ 20 điểm)
- Thêm phần kết bài trang trọng, lịch sự
"""

import zipfile
import xml.sax.saxutils as saxutils

def esc(text):
    return saxutils.escape(str(text))

class DocxBuilder:
    def __init__(self, template_docx_path):
        self.template_path = template_docx_path
        self.body_xml = []

    def p(self, text="", align="left", space_before=40, space_after=40, line_spacing=235, bold=False, italic=False, size_pt=10.5, color="222222"):
        sz_val = int(size_pt * 2)
        jc_tag = f'<w:jc w:val="{align}"/>' if align != "left" else ''
        b_tag = '<w:b/>' if bold else ''
        i_tag = '<w:i/>' if italic else ''
        col_tag = f'<w:color w:val="{color}"/>' if color else ''
        
        xml = f'''<w:p>
  <w:pPr>
    {jc_tag}
    <w:spacing w:before="{space_before}" w:after="{space_after}" w:line="{line_spacing}" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
      {b_tag}
      {i_tag}
      {col_tag}
      <w:sz w:val="{sz_val}"/>
      <w:szCs w:val="{sz_val}"/>
    </w:rPr>
    <w:t>{esc(text)}</w:t>
  </w:r>
</w:p>'''
        self.body_xml.append(xml)

    def heading1(self, text):
        xml = f'''<w:p>
  <w:pPr>
    <w:keepNext/>
    <w:spacing w:before="180" w:after="80" w:line="240" w:lineRule="auto"/>
    <w:pBdr>
      <w:bottom w:val="single" w:sz="14" w:space="4" w:color="1B365D"/>
    </w:pBdr>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
      <w:b/>
      <w:color w:val="1B365D"/>
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
    </w:rPr>
    <w:t>{esc(text)}</w:t>
  </w:r>
</w:p>'''
        self.body_xml.append(xml)

    def heading2(self, text):
        xml = f'''<w:p>
  <w:pPr>
    <w:keepNext/>
    <w:spacing w:before="140" w:after="60" w:line="230" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
      <w:b/>
      <w:color w:val="8B0000"/>
      <w:sz w:val="22"/>
      <w:szCs w:val="22"/>
    </w:rPr>
    <w:t>{esc(text)}</w:t>
  </w:r>
</w:p>'''
        self.body_xml.append(xml)

    def speech_box(self, title, paragraphs):
        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="0" w:type="auto"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="20" w:space="0" w:color="8B0000"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="60" w:type="dxa"/>
      <w:left w:w="140" w:type="dxa"/>
      <w:bottom w:w="60" w:type="dxa"/>
      <w:right w:w="140" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tr>
    <w:trPr>
      <w:cantSplit/>
    </w:trPr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:w="9400" w:type="dxa"/>
        <w:shd w:fill="FAFAFA"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:spacing w:before="15" w:after="25" w:line="230" w:lineRule="auto"/>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:b/>
            <w:color w:val="8B0000"/>
            <w:sz w:val="20"/>
            <w:szCs w:val="20"/>
          </w:rPr>
          <w:t>[{esc(title)}]:</w:t>
        </w:r>
      </w:p>'''
        for p in paragraphs:
            p_clean = p.strip()
            if p_clean:
                xml += f'''
      <w:p>
        <w:pPr>
          <w:spacing w:before="25" w:after="25" w:line="235" w:lineRule="auto"/>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:color w:val="222222"/>
            <w:sz w:val="21"/>
            <w:szCs w:val="21"/>
          </w:rPr>
          <w:t>{esc(p_clean)}</w:t>
        </w:r>
      </w:p>'''
        xml += '''
    </w:tc>
  </w:tr>
</w:tbl>'''
        self.body_xml.append(xml)

    def table_grid(self, headers, rows, col_widths=None, alignments=None):
        xml = '''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="0" w:type="auto"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="6" w:space="0" w:color="B0C4DE"/>
      <w:left w:val="single" w:sz="6" w:space="0" w:color="B0C4DE"/>
      <w:bottom w:val="single" w:sz="6" w:space="0" w:color="B0C4DE"/>
      <w:right w:val="single" w:sz="6" w:space="0" w:color="B0C4DE"/>
      <w:insideH w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>
      <w:insideV w:val="single" w:sz="6" w:space="0" w:color="E2E8F0"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="50" w:type="dxa"/>
      <w:left w:w="110" w:type="dxa"/>
      <w:bottom w:w="50" w:type="dxa"/>
      <w:right w:w="110" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tr>
    <w:trPr>
      <w:tblHeader/>
      <w:cantSplit/>
    </w:trPr>'''
        for idx, h in enumerate(headers):
            w_str = f'<w:tcW w:w="{col_widths[idx]}" w:type="dxa"/>' if col_widths and idx < len(col_widths) else ''
            xml += f'''
    <w:tc>
      <w:tcPr>
        {w_str}
        <w:shd w:fill="1B365D"/>
      </w:tcPr>
      <w:p>
        <w:pPr><w:jc w:val="center"/><w:spacing w:before="35" w:after="35"/></w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:b/>
            <w:color w:val="FFFFFF"/>
            <w:sz w:val="20"/>
            <w:szCs w:val="20"/>
          </w:rPr>
          <w:t>{esc(h)}</w:t>
        </w:r>
      </w:p>
    </w:tc>'''
        xml += '\n  </w:tr>'

        for r_idx, row in enumerate(rows):
            bg = "FFFFFF" if r_idx % 2 == 0 else "F8FAFC"
            xml += '\n  <w:tr><w:trPr><w:cantSplit/></w:trPr>'
            for idx, c in enumerate(row):
                w_str = f'<w:tcW w:w="{col_widths[idx]}" w:type="dxa"/>' if col_widths and idx < len(col_widths) else ''
                align = alignments[idx] if alignments and idx < len(alignments) else ("center" if idx == 0 else "left")
                jc_tag = f'<w:jc w:val="{align}"/>'
                xml += f'''
    <w:tc>
      <w:tcPr>
        {w_str}
        <w:shd w:fill="{bg}"/>
      </w:tcPr>
      <w:p>
        <w:pPr>{jc_tag}<w:spacing w:before="25" w:after="25" w:line="220" w:lineRule="auto"/></w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:color w:val="222222"/>
            <w:sz w:val="19"/>
            <w:szCs w:val="19"/>
          </w:rPr>
          <w:t>{esc(c)}</w:t>
        </w:r>
      </w:p>
    </w:tc>'''
            xml += '\n  </w:tr>'
        xml += '\n</w:tbl>'
        self.body_xml.append(xml)

    def divider(self):
        xml = '''<w:p>
  <w:pPr>
    <w:jc w:val="center"/>
    <w:spacing w:before="50" w:after="50"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
      <w:color w:val="CBD5E1"/>
      <w:sz w:val="16"/>
      <w:szCs w:val="16"/>
    </w:rPr>
    <w:t>──────────────────────────────────────────────────</w:t>
  </w:r>
</w:p>'''
        self.body_xml.append(xml)

    def page_break(self):
        xml = '''<w:p><w:r><w:br w:type="page"/></w:r></w:p>'''
        self.body_xml.append(xml)

    def save(self, output_path):
        full_doc_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {"".join(self.body_xml)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1020" w:right="1134" w:bottom="1020" w:left="1417"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>'''

        with zipfile.ZipFile(self.template_path, 'r') as zin:
            with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zout:
                for item in zin.infolist():
                    if item.filename == 'word/document.xml':
                        zout.writestr(item, full_doc_xml.encode('utf-8'))
                    else:
                        zout.writestr(item, zin.read(item.filename))
        print(f"Đã tạo thành công file Word hoàn chỉnh: {output_path}")


def build_refined_script():
    builder = DocxBuilder("BAO_CAO_UNG_DUNG_AI_NHOM_05.docx")

    # ================= TRANG 1: TỔNG QUAN DỰ ÁN & CHẶNG 1 =================
    builder.p("BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC", align="center", space_before=0, space_after=15, bold=True, size_pt=9.5, color="1B365D")
    builder.p("KHOA LÝ LUẬN CHÍNH TRỊ — BỘ MÔN KINH TẾ CHÍNH TRỊ MÁC – LÊNIN", align="center", space_before=0, space_after=40, bold=True, size_pt=9.5, color="8B0000")
    builder.divider()

    builder.p("KỊCH BẢN THUYẾT TRÌNH DỰ ÁN 3D WEBGL INTERACTIVE", align="center", space_before=40, space_after=25, bold=True, size_pt=14.5, color="1B365D")
    builder.p("CHUYÊN ĐỀ: NỀN KINH TẾ THỊ TRƯỜNG VÀ CÁC QUY LUẬT CỦA NỀN KINH TẾ THỊ TRƯỜNG", align="center", space_before=0, space_after=25, bold=True, size_pt=11, color="8B0000")
    builder.p("Sản phẩm trung tâm: Không gian Triển lãm 3D tương tác \"Who Holds The Room?\"", align="center", space_before=0, space_after=20, bold=True, italic=True, size_pt=10, color="1B365D")
    builder.p("(Tài liệu thuyết minh kịch bản báo cáo trước Hội đồng đánh giá — Thời lượng: 12 đến 15 phút)", align="center", space_before=0, space_after=90, italic=True, size_pt=9, color="555555")

    builder.heading1("I. THÔNG TIN DỰ ÁN")
    
    info_headers = ["Hạng mục", "Nội dung chi tiết"]
    info_rows = [
        ["Nhóm thực hiện", "Nhóm 05 (Lớp chuyên ngành Kinh tế & Marketing)"],
        ["Học phần", "Kinh tế chính trị Mác – Lênin"],
        ["Chuyên đề nghiên cứu", "Nền kinh tế thị trường và các quy luật của nền kinh tế thị trường"],
        ["Hình thức sản phẩm", "Không gian Triển lãm 3D WebGL và Phòng đấu Multiplayer trực tuyến"],
        ["Link trải nghiệm (Người học)", "https://mln-chi-eight.vercel.app/ (Điện thoại hoặc laptop)"],
        ["Link điều hành (Host Admin)", "https://mln-chi-eight.vercel.app/admin.html (Trình chiếu màn hình lớn)"],
        ["Thời lượng thuyết trình", "12 – 15 phút (Chuẩn theo khung giờ quy định)"]
    ]
    builder.table_grid(info_headers, info_rows, [2700, 6700], ["left", "left"])

    builder.p("", space_before=15, space_after=15)

    builder.heading1("II. KỊCH BẢN CHI TIẾT DÀNH CHO NGƯỜI THUYẾT TRÌNH")

    # CHẶNG 1
    builder.heading2("CHẶNG 1: MỞ ĐẦU & KẾT NỐI CẢ LỚP VÀO SẢNH CHỜ")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Kính thưa Thầy/Cô và chào tất cả các bạn! Hôm nay, thay vì trình chiếu slide chữ truyền thống, nhóm 05 xin phép mang đến một trải nghiệm học tập hoàn toàn mới: Không gian Triển lãm 3D tương tác trực tiếp trên nền web mang tên 'Who Holds The Room? — Kinh tế chính trị Mác – Lênin'.",
            "Đặc biệt, trong buổi học hôm nay, cả lớp chúng ta sẽ là những người trực tiếp bước vào không gian triển lãm 3D này để vừa quan sát tư liệu, vừa tham gia giải đố và thi đua điểm số trên Bảng xếp hạng trực tiếp.",
            "Bây giờ, xin mời Thầy/Cô và các bạn truy cập vào đường link nhóm đã gửi: mln-chi-eight.vercel.app. Các bạn bấm BẮT ĐẦU, nhập tên của mình và điền đúng mã phòng gồm 4 chữ số đang hiển thị trên màn hình máy chiếu: [ĐỌC RÕ TỪNG SỐ, VÍ DỤ: 9 - 2 - 2 - 8] rồi bấm 'VÀO PHÒNG CHỜ'.",
            "Cuộc đua hôm nay sẽ tính cả độ chính xác lẫn tốc độ về đích. Bạn nào đạt điểm cao nhất nhóm mình sẽ gửi tặng một phần quà kỷ niệm rất ý nghĩa! Nhóm mình xin phép phát lệnh bắt đầu để đưa cả lớp cùng bước vào không gian triển lãm!"
        ]
    )

    # Sang trang 2: Chặng 2 và Chặng 3
    builder.page_break()

    # ================= TRANG 2: CHẶNG 2 & CHẶNG 3 =================
    builder.heading2("CHẶNG 2: PHÒNG 1 — BẢN CHẤT KTTT & VƯỢT CỔNG 1")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Chào mừng Thầy/Cô và các bạn đến với Căn phòng số 01: Bản chất và các đặc trưng cơ bản của Nền kinh tế thị trường.",
            "Kinh tế thị trường là nền kinh tế hàng hóa phát triển ở trình độ cao, hình thành khách quan từ kinh tế tự nhiên phát triển lên. Bức tranh Chợ Bến Thành minh họa rất rõ điều này: người mua và người bán tự do gặp gỡ, tự nguyện thỏa thuận giá cả theo quan hệ cung - cầu.",
            "Tuy nhiên, thị trường tự do có hoàn hảo tuyệt đối không các bạn? Chắc chắn là KHÔNG. Bức tranh thứ hai phản ánh mặt trái khuyết tật của thị trường: Vì mục tiêu tối đa hóa lợi nhuận, các chủ thể kinh tế dễ dẫn tới hủy hoại môi trường, làm cạn kiệt tài nguyên thiên nhiên và gia tăng khoảng cách giàu nghèo.",
            "Chính vì vậy, bức tranh thứ ba cho thấy một tất yếu khách quan: Luôn cần có sự điều tiết, quản lý vĩ mô của Nhà nước. Đây chính là bản chất khoa học của mô hình Kinh tế thị trường định hướng Xã hội Chủ nghĩa tại Việt Nam: kết hợp hài hòa động lực của thị trường với vai trò dẫn dắt của Nhà nước vì mục tiêu dân giàu, nước mạnh, dân chủ, công bằng và văn minh."
        ]
    )

    builder.divider()

    # CHẶNG 3
    builder.heading2("CHẶNG 3: PHÒNG 2 — QUY LUẬT GIÁ TRỊ & MẬT MÃ LỊCH SỬ 1867")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Bước vào Phòng số 02, chúng ta cùng nghiên cứu quy luật kinh tế cơ bản nhất của sản xuất hàng hóa: Quy luật Giá trị.",
            "Quy luật này đòi hỏi: Sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết.",
            "Đối với sinh viên chuyên ngành Kinh tế và Marketing chúng ta, bài học thực tế ở đây là gì? Giả sử mức trung bình xã hội để may một chiếc áo sơ mi là 5 giờ công. Nếu doanh nghiệp của bạn quản lý kém, công nghệ lạc hậu tốn tới 10 giờ, khi đem ra thị trường người tiêu dùng vẫn chỉ trả tiền theo mức giá tương ứng với 5 giờ lao động xã hội cần thiết mà thôi. 5 giờ lãng phí kia doanh nghiệp phải tự gánh chịu thua lỗ.",
            "Áp lực sống còn này buộc mọi nhà sản xuất phải liên tục cải tiến công nghệ, tự động hóa như hình ảnh dây chuyền robot các bạn đang thấy, nhằm hạ thấp hao phí lao động cá biệt xuống nhỏ hơn hoặc bằng mức xã hội cần thiết.",
            "Tại Cổng 2, chúng ta gặp một thử thách ổ khóa mật mã lịch sử với câu đố: 'Năm xuất bản tập 1 bộ Tư bản (Das Kapital) của Các Mác — tác phẩm kinh điển làm sáng tỏ Quy luật giá trị và Giá trị thặng dư'. Mật mã đã được giấu kín để các bạn cùng suy nghĩ. Nếu không nhớ, người chơi có thể bấm nút 'GỢI Ý ĐÁP ÁN' nhưng sẽ bị trừ 20 điểm!",
            "Các bạn trong lớp có nhớ Các Mác xuất bản tập 1 bộ Tư bản vào năm nào không ạ? (Dừng 2 giây để tương tác) — Vâng, chính xác là năm 1867! Bây giờ chúng ta nhập 4 số: 1 - 8 - 6 - 7 rồi bấm OK. Cánh cửa sắt đã mở toang, mời cả lớp cùng tiến vào phòng tiếp theo!"
        ]
    )

    # Sang trang 3: Chặng 4, Chặng 5 và Lời kết
    builder.page_break()

    # ================= TRANG 3: CHẶNG 4, 5 & LỜI KẾT =================
    builder.heading2("CHẶNG 4: PHÒNG 3 — QUY LUẬT CUNG – CẦU & LƯU THÔNG TIỀN TỆ")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Tại Căn phòng 03, chúng ta tiếp cận hai quy luật gắn liền trực tiếp với hoạt động chi tiêu hàng ngày: Quy luật Cung – Cầu và Quy luật Lưu thông tiền tệ.",
            "Thứ nhất là Quy luật Cung – Cầu: Khi cung lớn hơn cầu thì giá giảm; khi cung nhỏ hơn cầu thì giá tăng. Các bạn đi xe công nghệ vào giờ cao điểm trời mưa chắc chắn từng thấy giá cước tăng gấp đôi, gấp ba. Đó không phải hãng xe cố tình ép giá, mà chính là phản ứng nhạy bén của quy luật cung cầu: Cầu đặt xe tăng vọt trong khi cung tài xế nhận cuốc giảm. Thuật toán tự động tăng giá nhằm thực hiện đồng thời hai việc: kích thích thêm tài xế ra đường (tăng cung), đồng thời khiến người chưa thực sự cần dời lại chuyến đi (giảm bớt cầu), nhanh chóng đưa thị trường về trạng thái cân bằng.",
            "Thứ hai là Quy luật Lưu thông tiền tệ, thể hiện qua công thức của Các Mác: M = (P x Q) / V. Đã bao giờ các bạn tự hỏi: 'Nếu một quốc gia còn khó khăn, tại sao Nhà nước không chủ động in thật nhiều tiền giấy phát cho dân sử dụng?'. Bức ảnh tiền polymer của Ngân hàng Nhà nước cho thấy câu trả lời: Khối lượng tiền đưa vào lưu thông bắt buộc phải tương ứng với tổng giá cả hàng hóa, dịch vụ thực tế. Nếu in vượt quá nhu cầu khách quan, đồng tiền lập tức mất giá và lạm phát sẽ bùng nổ. Vì vậy, việc phát hành tiền luôn phải tuân thủ nghiêm ngặt quy luật khách quan."
        ]
    )

    builder.divider()

    # CHẶNG 5
    builder.heading2("CHẶNG 5: PHÒNG 4 — QUY LUẬT CẠNH TRANH & GIẢI MÃ CÂU HỎI KINH TẾ SỐ")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Căn phòng số 04 giới thiệu: Quy luật Cạnh tranh — động lực cốt lõi thúc đẩy nền kinh tế thị trường phát triển.",
            "Cạnh tranh luôn mang tính hai mặt: Về mặt tích cực, như bức tranh phòng thí nghiệm R&D, áp lực cạnh tranh buộc doanh nghiệp phải liên tục đầu tư nghiên cứu công nghệ mới, nâng cao chất lượng sản phẩm để giữ chân khách hàng. Về mặt tiêu cực, bức tranh tiếp theo cho thấy lực lượng chức năng thu giữ hàng giả: Vì muốn kiếm lời nhanh chóng, một số chủ thể đã gian lận, làm hàng nhái, bán phá giá, gây thiệt hại nghiêm trọng cho người tiêu dùng. Do đó, một môi trường kinh doanh tiến bộ luôn đòi hỏi hành lang pháp lý minh bạch và chế tài nghiêm minh từ Nhà nước.",
            "Tại Cổng 4, chúng ta có thử thách Lật thẻ bài trí nhớ để ghép nối 4 quy luật kinh tế. Và ngay sau khi hoàn thành, CÂU HỎI TRỌNG TÂM CỐT LÕI của bài học xuất hiện: 'Trong kỷ nguyên kinh tế số, khi hàng hóa số có chi phí sao chép xấp xỉ bằng 0 và giá cả thay đổi từng giây bằng AI, liệu Quy luật Cung – Cầu truyền thống của Các Mác có còn giá trị không, hay đã bị vô hiệu hóa?'",
            "Tập thể nhóm 05 xin khẳng định dứt khoát: Quy luật Cung – Cầu KHÔNG HỀ BỊ MẤT ĐI! Trái lại, dữ liệu lớn và thuật toán số giúp quy luật này vận hành nhạy bén hơn, linh hoạt hơn theo thời gian thực. Hơn nữa, dù chi phí sao chép thêm một bản kỹ thuật số rất thấp, nhưng hao phí lao động xã hội của con người để xây dựng nền tảng, hệ thống máy chủ và thuật toán vận hành không bao giờ bằng 0. Lý luận Kinh tế chính trị Mác – Lênin vẫn hoàn toàn vẹn nguyên giá trị trong thời đại kinh tế số!"
        ]
    )

    builder.p("", space_before=20, space_after=20)

    # LỜI KẾT BÀI
    builder.speech_box(
        "LỜI KẾT & CẢM ƠN",
        [
            "Kính thưa Thầy/Cô và các bạn, bài thuyết trình về dự án Không gian Triển lãm 3D của nhóm 05 đến đây xin được phép khép lại. Chúng em xin chân thành cảm ơn Thầy/Cô và các bạn đã chú ý theo dõi và tham gia trải nghiệm nhiệt tình. Nhóm rất mong nhận được những lời nhận xét, góp ý quý báu của Thầy/Cô để tiếp tục hoàn thiện sản phẩm tốt hơn nữa. Em xin trân trọng cảm ơn!"
        ]
    )

    builder.p("", space_before=30, space_after=30)
    builder.p("HẾT KỊCH BẢN THUYẾT TRÌNH — TẬP THỂ NHÓM 05 HOÀN THÀNH", align="center", space_before=50, space_after=20, bold=True, size_pt=10.5, color="1B365D")

    output_docx = "KICH_BAN_THUYET_TRINH_NHOM_05.docx"
    builder.save(output_docx)

if __name__ == "__main__":
    build_refined_script()
