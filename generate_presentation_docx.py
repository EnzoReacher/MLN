# -*- coding: utf-8 -*-
"""
generate_presentation_docx.py
Kịch bản thuyết trình dự án sáng tạo 3D WebGL (Nhóm 05)
Chuyên đề: Nền kinh tế thị trường và các quy luật của nền kinh tế thị trường

Định dạng:
- Chuẩn văn bản học thuật trang trọng, thẩm mỹ cao
- Ngôn ngữ nói tự nhiên, mạch lạc, dễ hiểu, không dùng từ ngữ quá khó
- Tuyệt đối KHÔNG DÙNG ICON / EMOJI
- Nội dung thu gọn, đúng trọng tâm thời lượng 12-15 phút
- Bố cục 5 trang chuẩn mực, phân trang chính xác theo logic từng chặng
"""

import zipfile
import xml.sax.saxutils as saxutils

def esc(text):
    return saxutils.escape(str(text))

class DocxBuilder:
    def __init__(self, template_docx_path):
        self.template_path = template_docx_path
        self.body_xml = []

    def p(self, text="", align="left", space_before=50, space_after=50, line_spacing=240, bold=False, italic=False, size_pt=11, color="222222"):
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
    <w:spacing w:before="240" w:after="100" w:line="260" w:lineRule="auto"/>
    <w:pBdr>
      <w:bottom w:val="single" w:sz="16" w:space="5" w:color="1B365D"/>
    </w:pBdr>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
      <w:b/>
      <w:color w:val="1B365D"/>
      <w:sz w:val="25"/>
      <w:szCs w:val="25"/>
    </w:rPr>
    <w:t>{esc(text)}</w:t>
  </w:r>
</w:p>'''
        self.body_xml.append(xml)

    def heading2(self, text):
        xml = f'''<w:p>
  <w:pPr>
    <w:keepNext/>
    <w:spacing w:before="180" w:after="70" w:line="250" w:lineRule="auto"/>
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

    def action_box(self, label, content):
        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="0" w:type="auto"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="24" w:space="0" w:color="1B365D"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="70" w:type="dxa"/>
      <w:left w:w="140" w:type="dxa"/>
      <w:bottom w:w="70" w:type="dxa"/>
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
        <w:shd w:fill="F4F6F9"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:spacing w:before="20" w:after="20" w:line="230" w:lineRule="auto"/>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:b/>
            <w:color w:val="1B365D"/>
            <w:sz w:val="20"/>
            <w:szCs w:val="20"/>
          </w:rPr>
          <w:t>[{esc(label)}]: </w:t>
        </w:r>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:i/>
            <w:color w:val="222222"/>
            <w:sz w:val="20"/>
            <w:szCs w:val="20"/>
          </w:rPr>
          <w:t>{esc(content)}</w:t>
        </w:r>
      </w:p>
    </w:tc>
  </w:tr>
</w:tbl>'''
        self.body_xml.append(xml)

    def speech_box(self, title, paragraphs):
        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="0" w:type="auto"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="24" w:space="0" w:color="8B0000"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="80" w:type="dxa"/>
      <w:left w:w="150" w:type="dxa"/>
      <w:bottom w:w="80" w:type="dxa"/>
      <w:right w:w="150" w:type="dxa"/>
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
          <w:spacing w:before="20" w:after="30" w:line="230" w:lineRule="auto"/>
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
          <w:spacing w:before="30" w:after="30" w:line="240" w:lineRule="auto"/>
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

    def tip_box(self, content):
        xml = f'''<w:tbl>
  <w:tblPr>
    <w:tblW w:w="0" w:type="auto"/>
    <w:tblBorders>
      <w:top w:val="none"/>
      <w:left w:val="single" w:sz="18" w:space="0" w:color="B8860B"/>
      <w:bottom w:val="none"/>
      <w:right w:val="none"/>
    </w:tblBorders>
    <w:tblCellMar>
      <w:top w:w="60" w:type="dxa"/>
      <w:left w:w="130" w:type="dxa"/>
      <w:bottom w:w="60" w:type="dxa"/>
      <w:right w:w="130" w:type="dxa"/>
    </w:tblCellMar>
  </w:tblPr>
  <w:tr>
    <w:trPr>
      <w:cantSplit/>
    </w:trPr>
    <w:tc>
      <w:tcPr>
        <w:tcW w:w="9400" w:type="dxa"/>
        <w:shd w:fill="FCFAF2"/>
      </w:tcPr>
      <w:p>
        <w:pPr>
          <w:spacing w:before="20" w:after="20" w:line="220" w:lineRule="auto"/>
        </w:pPr>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:b/>
            <w:color w:val="B8860B"/>
            <w:sz w:val="19"/>
            <w:szCs w:val="19"/>
          </w:rPr>
          <w:t>[Lưu ý tương tác &amp; phong thái]: </w:t>
        </w:r>
        <w:r>
          <w:rPr>
            <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>
            <w:i/>
            <w:color w:val="444444"/>
            <w:sz w:val="19"/>
            <w:szCs w:val="19"/>
          </w:rPr>
          <w:t>{esc(content)}</w:t>
        </w:r>
      </w:p>
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
      <w:top w:w="70" w:type="dxa"/>
      <w:left w:w="110" w:type="dxa"/>
      <w:bottom w:w="70" w:type="dxa"/>
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
        <w:pPr><w:jc w:val="center"/><w:spacing w:before="40" w:after="40"/></w:pPr>
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
        <w:pPr>{jc_tag}<w:spacing w:before="30" w:after="30" w:line="230" w:lineRule="auto"/></w:pPr>
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
    <w:spacing w:before="60" w:after="60"/>
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
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1417"/>
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


def build_compact_formal_script():
    builder = DocxBuilder("BAO_CAO_UNG_DUNG_AI_NHOM_05.docx")

    # ================= TRANG 1: TỔNG QUAN & BẢNG THÔNG TIN DỰ ÁN =================
    builder.p("BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC", align="center", space_before=0, space_after=20, bold=True, size_pt=10, color="1B365D")
    builder.p("KHOA LÝ LUẬN CHÍNH TRỊ — BỘ MÔN KINH TẾ CHÍNH TRỊ MÁC – LÊNIN", align="center", space_before=0, space_after=60, bold=True, size_pt=10, color="8B0000")
    builder.divider()

    builder.p("KỊCH BẢN THUYẾT TRÌNH DỰ ÁN 3D WEBGL INTERACTIVE", align="center", space_before=50, space_after=30, bold=True, size_pt=15, color="1B365D")
    builder.p("CHUYÊN ĐỀ: NỀN KINH TẾ THỊ TRƯỜNG VÀ CÁC QUY LUẬT CỦA NỀN KINH TẾ THỊ TRƯỜNG", align="center", space_before=0, space_after=30, bold=True, size_pt=11.5, color="8B0000")
    builder.p("Sản phẩm trung tâm: Không gian Triển lãm 3D tương tác \"Who Holds The Room?\"", align="center", space_before=0, space_after=20, bold=True, italic=True, size_pt=10.5, color="1B365D")
    builder.p("(Tài liệu thuyết minh kịch bản báo cáo trước Hội đồng đánh giá — Thời lượng: 12 đến 15 phút)", align="center", space_before=0, space_after=120, italic=True, size_pt=9.5, color="555555")

    builder.heading1("I. THÔNG TIN DỰ ÁN & PHÂN CÔNG THỰC HIỆN")
    
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

    builder.p("", space_before=20, space_after=20)

    role_headers = ["Vai trò", "Thành viên", "Nhiệm vụ cụ thể trên giảng đường"]
    role_rows = [
        ["Người thuyết trình (Speaker)", "Đại diện nhóm", "Cầm micro, dẫn dắt nội dung bài học, kết nối lớp học và giải thích các ví dụ thực tiễn sinh động, dễ hiểu."],
        ["Người điều khiển (Operator)", "Thành viên kỹ thuật", "Mở song song Admin và Triển lãm 3D; tạo phòng, bấm bắt đầu, điều khiển nhân vật (WASD) khớp với lời thuyết trình."]
    ]
    builder.table_grid(role_headers, role_rows, [2500, 1800, 5100], ["left", "left", "left"])
    builder.tip_box("Trường hợp 1 bạn báo cáo độc lập: Hoàn toàn có thể vừa nói vừa dùng chuột/bàn phím điều khiển góc nhìn 3D nhẹ nhàng.")

    # Sang trang 2
    builder.page_break()

    # ================= TRANG 2: KẾ HOẠCH THỜI GIAN & CHẶNG 1 =================
    builder.heading1("II. KẾ HOẠCH THỜI GIAN THUYẾT TRÌNH (12 – 15 PHÚT)")
    
    time_headers = ["Thời gian", "Chặng", "Nội dung trọng tâm", "Mục tiêu đạt được"]
    time_rows = [
        ["00:00 – 02:00", "Chặng 1", "Mở đầu, cấp mã phòng 4 số, cả lớp vào sảnh chờ", "Tạo sự chú ý và tương tác sôi nổi ngay từ đầu."],
        ["02:00 – 04:00", "Chặng 2", "Phòng 1: Bản chất KTTT, Chợ Bến Thành, khuyết tật và vai trò Nhà nước. Vượt Cổng 1.", "Làm rõ tính tất yếu của KTTT định hướng XHCN."],
        ["04:00 – 06:00", "Chặng 3", "Phòng 2: Quy luật Giá trị (ví dụ may mặc, tự động hóa robot). Mở mật mã két sắt 1867.", "Khẳng định vai trò hao phí lao động xã hội cần thiết."],
        ["06:00 – 08:30", "Chặng 4", "Phòng 3: Quy luật Cung – Cầu (giá xe công nghệ trời mưa) và Lưu thông tiền tệ. Vượt Cổng 3.", "Gắn liền quy luật kinh tế với đời sống thực tế."],
        ["08:30 – 11:00", "Chặng 5", "Phòng 4: Quy luật Cạnh tranh (R&D, hàng giả), lật thẻ bài, giải mã câu hỏi cốt lõi CQ.", "Khẳng định kinh tế số không làm mất quy luật cung cầu."],
        ["11:00 – 13:00", "Chặng 6", "Bảng xếp hạng trực tiếp, vinh danh người chơi xuất sắc", "Đánh giá trực quan mức độ tiếp thu của người học."],
        ["13:00 – 14:30", "Chặng 7", "Tổng kết thông điệp, cam kết liêm chính học thuật (100% ảnh thật báo chí, trích dẫn chuẩn).", "Đáp ứng trọn vẹn tiêu chí minh bạch và trách nhiệm."]
    ]
    builder.table_grid(time_headers, time_rows, [1600, 1100, 3900, 2800], ["center", "center", "left", "left"])

    builder.heading1("III. KỊCH BẢN CHI TIẾT DÀNH CHO NGƯỜI THUYẾT TRÌNH")

    # CHẶNG 1
    builder.heading2("CHẶNG 1: MỞ ĐẦU & KẾT NỐI CẢ LỚP VÀO SẢNH CHỜ (00:00 – 02:00)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Mở tab Admin (mln-chi-eight.vercel.app/admin.html) chiếu lên màn hình lớn. Bấm 'Sinh mã ngẫu nhiên' -> Bấm 'TẠO PHÒNG MỚI'. Màn hình hiển thị mã 4 số rõ ràng và trạng thái 'ĐANG CHỜ NGƯỜI CHƠI'."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Kính thưa Thầy/Cô và chào tất cả các bạn! Hôm nay, thay vì trình chiếu slide chữ truyền thống, nhóm 05 xin phép mang đến một trải nghiệm học tập hoàn toàn mới: Không gian Triển lãm 3D tương tác trực tiếp trên nền web với tên gọi: 'Who Holds The Room? — Kinh tế chính trị Mác – Lênin'.",
            "Đặc biệt, trong buổi học hôm nay, cả lớp chúng ta sẽ là những người trực tiếp bước vào không gian triển lãm 3D này để vừa quan sát tư liệu, vừa tham gia giải đố và đua điểm trên Bảng xếp hạng trực tiếp.",
            "Bây giờ, xin mời Thầy/Cô và các bạn truy cập vào đường link nhóm đã gửi: mln-chi-eight.vercel.app. Các bạn bấm BẮT ĐẦU, nhập tên của mình và điền mã phòng gồm 4 chữ số đang hiển thị trên màn hình: [ĐỌC RÕ TỪNG SỐ, VÍ DỤ: 9 - 2 - 2 - 8] rồi bấm 'VÀO PHÒNG CHỜ'.",
            "Cuộc đua hôm nay sẽ tính cả độ chính xác lẫn tốc độ về đích. Bạn nào đạt điểm cao nhất nhóm mình sẽ gửi tặng một phần quà kỷ niệm rất ý nghĩa! Nhóm mình xin phép phát lệnh bắt đầu để đưa cả lớp cùng bước vào triển lãm!"
        ]
    )
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Trên trang Admin, bấm nút 'BẮT ĐẦU PHÒNG CHO TẤT CẢ NGƯỜI CHƠI'. Toàn bộ màn hình thiết bị của người chơi tự động đồng bộ và bước vào sảnh 3D."
    )

    # Sang trang 3: Chặng 2 và Chặng 3
    builder.page_break()

    # ================= TRANG 3: CHẶNG 2 & CHẶNG 3 =================
    builder.heading2("CHẶNG 2: PHÒNG 1 — BẢN CHẤT KTTT & VƯỢT CỔNG 1 (02:00 – 04:00)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Dùng phím WASD di chuyển nhân vật vào Phòng 1. Bấm phím E vào bức tranh đầu tiên: Chợ Bến Thành, sau đó xoay góc nhìn sang bức tranh Rác thải môi trường và Phiên họp Chính phủ."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Chào mừng Thầy/Cô và các bạn đến với Căn phòng số 01: Bản chất và các đặc trưng cơ bản của Nền kinh tế thị trường.",
            "Kinh tế thị trường là nền kinh tế hàng hóa phát triển ở trình độ cao, hình thành khách quan từ kinh tế tự nhiên phát triển lên. Bức tranh Chợ Bến Thành minh họa rất rõ điều này: người mua và người bán tự do gặp gỡ, tự nguyện thỏa thuận giá cả theo quan hệ cung cầu.",
            "Tuy nhiên, thị trường tự do có hoàn hảo không các bạn? Chắc chắn là KHÔNG. Bức tranh thứ hai phản ánh mặt trái khuyết tật: Vì mục tiêu tối đa hóa lợi nhuận, các chủ thể kinh tế dễ dẫn tới hủy hoại môi trường, làm cạn kiệt tài nguyên và gia tăng khoảng cách giàu nghèo.",
            "Chính vì vậy, bức tranh thứ ba cho thấy một tất yếu khách quan: Luôn cần có sự điều tiết, quản lý vĩ mô của Nhà nước. Đây chính là bản chất khoa học của mô hình Kinh tế thị trường định hướng Xã hội Chủ nghĩa tại Việt Nam: kết hợp động lực của thị trường với vai trò dẫn dắt của Nhà nước vì mục tiêu dân giàu, nước mạnh, công bằng và văn minh."
        ]
    )
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển đến Cổng 1, bấm phím E mở trắc nghiệm 25 giây, chọn phương án đúng ('Cơ chế thị trường') để hạ cánh cổng vòm. Toàn lớp cùng di chuyển bước sang Phòng 2."
    )

    builder.divider()

    # CHẶNG 3
    builder.heading2("CHẶNG 3: PHÒNG 2 — QUY LUẬT GIÁ TRỊ & MẬT MÃ LỊCH SỬ 1867 (04:00 – 06:00)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển sang Phòng 2. Bấm phím E mở bức tranh Dây chuyền may mặc công nghiệp và bức tranh Dây chuyền robot tự động hóa."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Bước vào Phòng số 02, chúng ta cùng nghiên cứu quy luật kinh tế cơ bản nhất của sản xuất hàng hóa: Quy luật Giá trị.",
            "Quy luật này đòi hỏi: Sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết.",
            "Đối với sinh viên Kinh tế và Marketing chúng ta, bài học thực tế ở đây là gì? Giả sử mức trung bình xã hội để may một chiếc áo là 5 giờ công. Nếu doanh nghiệp của bạn quản lý kém, máy móc lạc hậu tốn tới 10 giờ, khi đem ra thị trường người tiêu dùng vẫn chỉ trả tiền theo mức 5 giờ xã hội cần thiết mà thôi. 5 giờ lãng phí kia doanh nghiệp phải tự gánh chịu thua lỗ.",
            "Áp lực sống còn này buộc mọi nhà sản xuất phải liên tục cải tiến công nghệ, tự động hóa như hình ảnh robot các bạn đang thấy, nhằm hạ thấp hao phí lao động cá biệt xuống nhỏ hơn hoặc bằng mức xã hội cần thiết."
        ]
    )
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển tới Cổng 2, bấm phím E mở Bàn phím số Numpad 3D mô phỏng ổ khóa cổ điển."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Tại Cổng 2, chúng ta gặp một thử thách mật mã lịch sử với câu đố: 'Năm xuất bản tập 1 bộ Tư bản (Das Kapital) của Các Mác — tác phẩm kinh điển làm sáng tỏ Quy luật giá trị và Giá trị thặng dư'. Mật mã đã được giấu kín để các bạn tự suy nghĩ. Nếu không nhớ, người chơi có thể bấm nút 'GỢI Ý ĐÁP ÁN' nhưng sẽ bị trừ 20 điểm!",
            "Các bạn trong lớp có nhớ Các Mác xuất bản tập 1 bộ Tư bản vào năm nào không ạ? (Dừng 2 giây để lớp tương tác) — Vâng, chính xác là năm 1867! Bây giờ chúng ta nhập 4 số: 1 - 8 - 6 - 7 rồi bấm OK. Cánh cửa sắt đã mở toang, mời cả lớp cùng tiến vào phòng tiếp theo!"
        ]
    )

    # Sang trang 4: Chặng 4 và Chặng 5
    builder.page_break()

    # ================= TRANG 4: CHẶNG 4 & CHẶNG 5 =================
    builder.heading2("CHẶNG 4: PHÒNG 3 — QUY LUẬT CUNG – CẦU & LƯU THÔNG TIỀN TỆ (06:00 – 08:30)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển vào Phòng 3. Bấm mở bức tranh Tài xế xe công nghệ trời mưa và bức tranh Cọc tiền Ngân hàng Nhà nước."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Tại Căn phòng 03, chúng ta tiếp cận hai quy luật gắn liền trực tiếp với hoạt động chi tiêu hàng ngày: Quy luật Cung – Cầu và Quy luật Lưu thông tiền tệ.",
            "Thứ nhất là Quy luật Cung – Cầu: Khi cung lớn hơn cầu thì giá giảm; khi cung nhỏ hơn cầu thì giá tăng. Các bạn đi xe công nghệ vào giờ cao điểm trời mưa chắc chắn từng thấy cước tăng gấp đôi, gấp ba. Đó không phải hãng xe cố tình ép giá, mà chính là phản ứng nhạy bén của quy luật cung cầu: Cầu đặt xe tăng vọt trong khi cung tài xế nhận cuốc giảm. Giá tăng lên nhằm kích thích thêm tài xế ra đường (tăng cung), đồng thời khiến người chưa thực sự cần dời lại chuyến đi (giảm cầu), nhanh chóng đưa thị trường về trạng thái cân bằng.",
            "Thứ hai là Quy luật Lưu thông tiền tệ: Công thức của Các Mác: M = (P x Q) / V. Tại sao quốc gia khó khăn không thể tự in thêm tiền phát cho dân? Bức ảnh tiền polymer của Ngân hàng Nhà nước cho thấy câu trả lời: Lượng tiền đưa vào lưu thông bắt buộc phải tương ứng với tổng giá cả hàng hóa thực tế. In vượt mức cần thiết thì đồng tiền lập tức mất giá và lạm phát bùng nổ. Vì vậy việc phát hành tiền luôn phải tuân thủ nghiêm ngặt quy luật khách quan."
        ]
    )
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển đến Cổng 3, bấm phím E mở minigame trắc nghiệm tình huống giá xe và tiền tệ, chọn đáp án đúng để hạ cổng."
    )

    builder.divider()

    # CHẶNG 5
    builder.heading2("CHẶNG 5: PHÒNG 4 — QUY LUẬT CẠNH TRANH & GIẢI MÃ CÂU HỎI KINH TẾ SỐ (08:30 – 11:00)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển vào Phòng 4. Bấm xem bức tranh Phòng nghiên cứu R&D và bức tranh Xử lý hàng giả của Quản lý thị trường."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Căn phòng số 04 giới thiệu: Quy luật Cạnh tranh — động lực cốt lõi của nền kinh tế thị trường.",
            "Cạnh tranh có hai mặt: Mặt tích cực, như bức tranh phòng thí nghiệm R&D, áp lực cạnh tranh buộc doanh nghiệp phải liên tục đầu tư nghiên cứu công nghệ mới, nâng cao chất lượng sản phẩm để giữ chân khách hàng.",
            "Mặt tiêu cực, bức tranh tiếp theo cho thấy lực lượng chức năng thu giữ hàng giả: Vì lợi nhuận nhanh chóng, một số chủ thể đã gian lận, làm hàng nhái, bán phá giá, gây thiệt hại cho người tiêu dùng. Do đó, một môi trường kinh doanh tiến bộ luôn đòi hỏi hành lang pháp lý minh bạch và chế tài nghiêm minh từ Nhà nước."
        ]
    )
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Di chuyển đến Cổng 4, bấm phím E mở game Lật thẻ bài trí nhớ (Memory Cards). Ghép đúng 4 cặp quy luật -> Màn hình hiển thị Câu hỏi trọng tâm cốt lõi (CQ)."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Tại Cổng 4, chúng ta có trò chơi Lật thẻ bài trí nhớ để ghép nối 4 quy luật với khái niệm cốt lõi. Và ngay sau khi vượt qua thử thách, CÂU HỎI TRỌNG TÂM CỐT LÕI của bài học xuất hiện: 'Trong kỷ nguyên kinh tế số, khi hàng hóa số có chi phí sao chép xấp xỉ bằng 0 và giá cả thay đổi từng giây bằng AI, liệu Quy luật Cung – Cầu truyền thống của Các Mác có còn giá trị không, hay đã bị vô hiệu hóa?'",
            "Nhóm 05 xin khẳng định dứt khoát: Quy luật Cung – Cầu KHÔNG HỀ BỊ MẤT ĐI! Trái lại, dữ liệu lớn và thuật toán giúp quy luật này vận hành nhạy bén hơn, linh hoạt hơn theo thời gian thực. Hơn nữa, dù việc sao chép thêm một bản kỹ thuật số tốn rất ít chi phí, nhưng hao phí lao động xã hội của con người để xây dựng phần mềm, máy chủ và thuật toán không bao giờ bằng 0. Lý luận Kinh tế chính trị Mác – Lênin vẫn hoàn toàn vẹn nguyên giá trị trong thời đại kinh tế số!"
        ]
    )

    # Sang trang 5: Chặng 6, Chặng 7 và Mục IV Xử lý tình huống
    builder.page_break()

    # ================= TRANG 5: CHẶNG 6, 7 & MỤC IV XỬ LÝ TÌNH HUỐNG =================
    builder.heading2("CHẶNG 6: BẢNG XẾP HẠNG TRỰC TIẾP & VINH DANH NGƯỜI CHƠI (11:00 – 13:00)")
    builder.action_box(
        "THAO TÁC MÁY TÍNH",
        "Chuyển sang tab Admin hoặc bấm phím Q mở Bảng vàng vinh danh thành tích toàn lớp."
    )
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Và giờ phút hồi hộp nhất đã đến! Mời Thầy/Cô và các bạn cùng hướng mắt lên màn hình máy chiếu: BẢNG XẾP HẠNG TRỰC TIẾP TOÀN LỚP!",
            "(Xướng tên các bạn đứng đầu): Xin chúc mừng bạn [XƯỚNG TÊN QUÁN QUÂN] đã xuất sắc giành vị trí Quán quân với số điểm tuyệt đối và tốc độ nhanh nhất! Tiếp theo xin chúc mừng bạn [TÊN BẠN THỨ HAI], bạn [TÊN BẠN THỨ BA]... Cả lớp chúng ta hãy cùng dành một tràng pháo tay thật lớn để chúc mừng cho sự nỗ lực của tất cả thành viên trong buổi học hôm nay!"
        ]
    )

    builder.divider()

    # CHẶNG 7
    builder.heading2("CHẶNG 7: KẾT LUẬN & CAM KẾT LIÊM CHÍNH HỌC THUẬT (13:00 – 14:30)")
    builder.speech_box(
        "LỜI THOẠI NGƯỜI THUYẾT TRÌNH",
        [
            "Kính thưa Thầy/Cô và các bạn, để hoàn thành sản phẩm Không gian Triển lãm 3D này, tập thể nhóm 05 xin đưa ra 3 cam kết danh dự về tính liêm chính học thuật: (1) AI chỉ hỗ trợ kỹ thuật Three.js, toàn bộ ý tưởng và phân tích kinh tế do nhóm tự thực hiện; (2) 100% ẢNH THẬT từ báo chí chính thống (Dân Trí, Thanh Niên, Lao Động...), trích nguồn minh bạch; (3) Lý luận đối chiếu chuẩn xác từng trang Giáo trình KTCT Mác – Lênin của Bộ GD&ĐT (trang 53–67). Nhóm 05 xin trân trọng cảm ơn Thầy/Cô và các bạn!"
        ]
    )

    # MỤC IV
    builder.heading1("IV. KẾ HOẠCH DỰ PHÒNG & XỬ LÝ TÌNH HUỐNG TRÊN GIẢNG ĐƯỜNG")
    
    plan_headers = ["STT", "Tình huống phát sinh", "Phương án xử lý bình tĩnh, tự tin"]
    plan_rows = [
        [
            "1",
            "Thành viên vào lớp muộn khi phòng đã bấm Bắt đầu",
            "Người thuyết trình hướng dẫn nhanh: 'Các bạn vừa vào chỉ cần nhập đúng mã phòng trên máy chiếu, hệ thống có tính năng hỗ trợ vào muộn (Late-join) tự động đưa thẳng bạn vào triển lãm để tham gia cùng cả lớp'."
        ],
        [
            "2",
            "Đường truyền mạng tại phòng học chập chờn",
            "Dữ liệu bài giảng và mô hình 3D đã được lưu đệm trong trình duyệt; nếu có độ trễ chỉ cần nhấn F5 tải lại trang là mọi trạng thái sẽ phục hồi ngay trong 1 giây mà không mất dữ liệu."
        ],
        [
            "3",
            "Duy trì ánh mắt tương tác với Giảng viên và lớp học",
            "Tránh nhìn chằm chằm vào máy tính. Sau mỗi ý trình bày, hướng ánh mắt về phía Giảng viên và các bạn, kết hợp cử chỉ tay hướng lên màn hình chiếu để dẫn dắt sự chú ý tự nhiên."
        ],
        [
            "4",
            "Giảng viên hỏi: 'Tại sao nhóm chọn hình thức 3D thay vì slide thông thường?'",
            "Trả lời tự tin: 'Dạ thưa Thầy/Cô, môn Kinh tế chính trị có nhiều nội dung lý luận trừu tượng. Nếu chỉ chiếu slide chữ sẽ dễ gây cảm giác thụ động. Nhóm em mong muốn đưa bài học vào không gian trực quan đa chiều, giúp cả lớp cùng tham gia trải nghiệm và thấy rõ sự gắn kết với chuyên ngành Kinh tế & Marketing của chúng em'."
        ],
        [
            "5",
            "Giảng viên hỏi: 'Căn cứ nội dung học thuật trong sản phẩm lấy từ đâu?'",
            "Khẳng định dứt khoát: 'Dạ toàn bộ định nghĩa, nguyên lý và số liệu đều được nhóm đối chiếu trực tiếp từ Giáo trình Kinh tế chính trị Mác – Lênin của Bộ Giáo dục và Đào tạo (năm 2021, trang 53 đến 67); các hình ảnh thực tế đều có trích dẫn nguồn báo chí minh bạch'."
        ]
    ]
    builder.table_grid(plan_headers, plan_rows, [800, 3200, 5400], ["center", "left", "left"])

    builder.p("", space_before=40, space_after=40)
    builder.p("HẾT KỊCH BẢN THUYẾT TRÌNH — TẬP THỂ NHÓM 05 HOÀN THÀNH", align="center", space_before=100, space_after=60, bold=True, size_pt=11, color="1B365D")

    output_docx = "KICH_BAN_THUYET_TRINH_NHOM_05.docx"
    builder.save(output_docx)

if __name__ == "__main__":
    build_compact_formal_script()
