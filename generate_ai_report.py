# -*- coding: utf-8 -*-
"""
Script to generate the comprehensive, official AI Usage & Academic Integrity Report
for Group 5 (Kinh tế chính trị Mác – Lênin) as a styled .docx file.
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_report():
    doc = docx.Document()

    # Set page margins (0.75 inch all around)
    for section in doc.sections:
        section.top_margin = Inches(0.75)
        section.bottom_margin = Inches(0.75)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Styles & Colors
    PRIMARY = RGBColor(27, 54, 93)     # Navy Blue
    SECONDARY = RGBColor(139, 0, 0)   # Dark Crimson / Red
    GOLD = RGBColor(180, 130, 20)     # Academic Gold
    DARK = RGBColor(40, 40, 40)       # Charcoal text
    GRAY = RGBColor(100, 100, 100)    # Subtitle gray

    # --- COVER / HEADER BLOCK ---
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(2)
    run_inst = p_inst.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO — TRƯỜNG ĐẠI HỌC\nKHOA LÝ LUẬN CHÍNH TRỊ")
    run_inst.font.name = "Times New Roman"
    run_inst.font.size = Pt(12)
    run_inst.font.bold = True
    run_inst.font.color.rgb = PRIMARY

    p_sub_inst = doc.add_paragraph()
    p_sub_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub_inst.paragraph_format.space_after = Pt(16)
    run_sub = p_sub_inst.add_run("BỘ MÔN: KINH TẾ CHÍNH TRỊ MÁC – LÊNIN")
    run_sub.font.name = "Times New Roman"
    run_sub.font.size = Pt(11)
    run_sub.font.bold = True
    run_sub.font.color.rgb = SECONDARY

    # Horizontal divider line
    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_div.paragraph_format.space_after = Pt(18)
    run_div = p_div.add_run("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    run_div.font.name = "Times New Roman"
    run_div.font.size = Pt(10)
    run_div.font.color.rgb = GOLD

    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(6)
    run_title = p_title.add_run("BÁO CÁO PHỤ LỤC:\nỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI USAGE)\n& CAM KẾT LIÊM CHÍNH HỌC THUẬT")
    run_title.font.name = "Times New Roman"
    run_title.font.size = Pt(17)
    run_title.font.bold = True
    run_title.font.color.rgb = PRIMARY

    p_topic = doc.add_paragraph()
    p_topic.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_topic.paragraph_format.space_after = Pt(20)
    run_topic = p_topic.add_run("Chuyên đề: NỀN KINH TẾ THỊ TRƯỜNG VÀ CÁC QUY LUẬT CỦA NỀN KINH TẾ THỊ TRƯỜNG\nSản phẩm sáng tạo: TRIỂN LÃM 3D WEBGL VÀ PHÒNG ĐẤU MULTIPLAYER TRỰC TUYẾN")
    run_topic.font.name = "Times New Roman"
    run_topic.font.size = Pt(12)
    run_topic.font.italic = True
    run_topic.font.color.rgb = SECONDARY

    # Meta Table (Nhóm & Sản phẩm)
    meta_table = doc.add_table(rows=5, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.style = 'Table Grid'
    
    meta_data = [
        ("Nhóm thực hiện:", "NHÓM 05 (Lớp Kinh tế & Marketing)"),
        ("Tên dự án sáng tạo:", "Triển lãm Tương tác 3D: 'Who Holds The Room? — Kinh tế Chính trị Mác – Lênin'"),
        ("Địa chỉ triển khai (Deploy):", "https://mln-chi-eight.vercel.app/ (Người chơi) | /admin.html (Host thi đấu)"),
        ("Mã nguồn dự án (GitHub):", "https://github.com/EnzoReacher/MLN.git"),
        ("Mục tiêu học phần (LOs):", "Nắm vững bản chất nền KTTT, 4 quy luật kinh tế cốt lõi và vận dụng vào Kinh tế số (CQ)")
    ]
    for i, (k, v) in enumerate(meta_data):
        row = meta_table.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.5)
        set_cell_background(c0, "F2F4F8")
        set_cell_margins(c0, 80, 80, 120, 120)
        set_cell_margins(c1, 80, 80, 120, 120)
        
        p0 = c0.paragraphs[0]
        r0 = p0.add_run(k)
        r0.font.name = "Times New Roman"
        r0.font.bold = True
        r0.font.size = Pt(10.5)
        r0.font.color.rgb = PRIMARY
        
        p1 = c1.paragraphs[0]
        r1 = p1.add_run(v)
        r1.font.name = "Times New Roman"
        r1.font.size = Pt(10.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # --- MỤC I: TỔNG QUAN VỀ SẢN PHẨM SÁNG TẠO ---
    h1 = doc.add_heading(level=1)
    r = h1.add_run("I. TỔNG QUAN VỀ SẢN PHẨM SÁNG TẠO & PHƯƠNG THỨC TRÌNH BÀY")
    r.font.name = "Times New Roman"
    r.font.color.rgb = PRIMARY
    h1.paragraph_format.space_before = Pt(12)
    h1.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.15
    p.paragraph_format.space_after = Pt(8)
    p.add_run("Thực hiện yêu cầu đổi mới hình thức đánh giá của môn học Kinh tế chính trị Mác – Lênin, Nhóm 05 đã xây dựng một ")
    r_bold = p.add_run("sản phẩm công nghệ tương tác 3D WebGL (Web Game)")
    r_bold.font.bold = True
    p.add_run(" thay thế hoàn toàn hình thức trình chiếu slide thuyết trình truyền thống (đúng theo tiêu chí 'Không sử dụng sản phẩm dạng slide thuyết trình').")

    bullet_pts = [
        ("Không gian Triển lãm 4 phòng chuyên đề: ", "Bao gồm Phòng 01 (Khái niệm & Đặc trưng KTTT), Phòng 02 (Quy luật Giá trị), Phòng 03 (Quy luật Cung – Cầu & Lưu thông tiền tệ), và Phòng 04 (Quy luật Cạnh tranh). Mỗi phòng chứa 3 tác phẩm tư liệu được gắn hồ sơ lý luận trích dẫn trực tiếp từ giáo trình."),
        ("Tính năng tương tác độc đáo (Multiplayer Lobby): ", "Sản phẩm đóng vai trò là TRUNG TÂM của buổi thuyết trình. Người thuyết trình (Admin) cấp mã phòng 4 số, toàn bộ khán giả trong lớp dùng điện thoại hoặc laptop truy cập để trực tiếp khám phá không gian 3D, thu thập sao bí mật, giải mật mã và đua Bảng xếp hạng thời gian thực."),
        ("Giải quyết câu hỏi cốt lõi (CQ - Core Question): ", "Cổng kết thúc (Gate 04) tích hợp câu hỏi tình huống thực tế: 'Kinh tế số có còn tuân theo quy luật cung – cầu truyền thống?'. Qua đó giúp sinh viên chuyên ngành Kinh tế & Marketing hiểu sâu sắc sự thích ứng của các quy luật kinh tế trong thời đại thuật toán và dữ liệu lớn.")
    ]
    for b_title, b_desc in bullet_pts:
        bp = doc.add_paragraph(style='List Bullet')
        bp.paragraph_format.line_spacing = 1.15
        bp.paragraph_format.space_after = Pt(4)
        rt = bp.add_run(b_title)
        rt.font.name = "Times New Roman"
        rt.font.bold = True
        rt.font.color.rgb = PRIMARY
        rd = bp.add_run(b_desc)
        rd.font.name = "Times New Roman"

    # --- MỤC II: PHỤ LỤC MINH BẠCH ỨNG DỤNG AI ---
    h2 = doc.add_heading(level=1)
    r = h2.add_run("II. PHỤ LỤC MINH BẠCH ỨNG DỤNG AI (TIÊU CHÍ 4.1 — 0.5 ĐIỂM)")
    r.font.name = "Times New Roman"
    r.font.color.rgb = PRIMARY
    h2.paragraph_format.space_before = Pt(14)
    h2.paragraph_format.space_after = Pt(6)

    p_ai_intro = doc.add_paragraph()
    p_ai_intro.paragraph_format.line_spacing = 1.15
    p_ai_intro.paragraph_format.space_after = Pt(8)
    p_ai_intro.add_run("Nhóm 05 cam kết minh bạch 100% về việc sử dụng các công cụ Trí tuệ Nhân tạo. AI được định vị chính xác là ")
    p_ai_intro.add_run("công cụ trợ lý lập trình và kỹ thuật (coding assistant)").font.bold = True
    p_ai_intro.add_run(", tuyệt đối không để AI làm thay tư duy lý luận chính trị và biên soạn nội dung học thuật.")

    # Table 1: AI Tools Summary
    t1 = doc.add_table(rows=4, cols=4)
    t1.alignment = WD_TABLE_ALIGNMENT.CENTER
    t1.style = 'Table Grid'
    
    t1_headers = ["Tên công cụ AI", "Mục đích sử dụng cụ thể", "Phạm vi hỗ trợ", "Tỷ lệ đóng góp"]
    for j, h in enumerate(t1_headers):
        cell = t1.rows[0].cells[j]
        set_cell_background(cell, "1B365D")
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.name = "Times New Roman"
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)

    t1_rows = [
        ("Google Antigravity AI\n(Gemini 3.8 Flash)", "Hỗ trợ tái cấu trúc mã nguồn Three.js, xử lý va chạm 3D, tối ưu hóa CSS responsive cho màn hình máy chiếu lớp học.", "Kỹ thuật / Frontend", "30% (Chỉ phần khung code)"),
        ("Claude 3.7 Sonnet / ChatGPT", "Gợi ý các dạng câu hỏi trắc nghiệm khách quan và kịch bản phân bố minigame tại 4 cổng triển lãm.", "Ý tưởng sư phạm", "20% (Chỉ gợi ý cấu trúc)"),
        ("Pillow / Python WebP Optimizer", "Hỗ trợ script tự động nén và chuẩn hóa định dạng ảnh tư liệu sang WebP chất lượng cao giúp tải nhanh trên mạng trường.", "Xử lý đa phương tiện", "15% (Chuyển đổi kỹ thuật)")
    ]
    for i, row_data in enumerate(t1_rows, start=1):
        row = t1.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F8F9FA"
        for j, val in enumerate(row_data):
            cell = row.cells[j]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 60, 60, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Times New Roman"
            r.font.size = Pt(9.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # Detailed Prompt Table
    p_prompt_title = doc.add_paragraph()
    p_prompt_title.paragraph_format.space_after = Pt(4)
    p_r = p_prompt_title.add_run("Bảng phân định Prompt, Đầu ra thô của AI và Phần sinh viên kiểm chứng / biên soạn lại:")
    p_r.font.name = "Times New Roman"
    p_r.font.bold = True
    p_r.font.color.rgb = PRIMARY

    t2 = doc.add_table(rows=4, cols=4)
    t2.alignment = WD_TABLE_ALIGNMENT.CENTER
    t2.style = 'Table Grid'
    
    t2_headers = ["Hạng mục", "Prompt chính đưa vào AI", "Kết quả đầu ra của AI (Output)", "Phần sinh viên chỉnh sửa & hoàn thiện"]
    for j, h in enumerate(t2_headers):
        cell = t2.rows[0].cells[j]
        set_cell_background(cell, "2C3E50")
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.name = "Times New Roman"
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(9.5)

    t2_rows = [
        (
            "1. Cấu trúc Triển lãm & Lý luận 4 phòng",
            "'Hãy tổ chức không gian triển lãm 3D chia làm 4 phòng tương ứng với đề tài Nền kinh tế thị trường và các quy luật.'",
            "AI đề xuất phân chia thành các chủ đề chung chung, một số thuật ngữ chưa bám sát giáo trình Kinh tế chính trị Mác – Lênin (Bộ GD&ĐT).",
            "Sinh viên loại bỏ các diễn giải sai lệch; trực tiếp đối chiếu và trích xuất nguyên văn từ Giáo trình (trang 53–67), phân thành 4 phòng chuẩn xác: KTTT, Quy luật Giá trị, Quy luật Cung – Cầu & Tiền tệ, Quy luật Cạnh tranh."
        ),
        (
            "2. Hệ thống Minigame tại các Cổng",
            "'Thiết kế các minigame mở cổng vượt ải phù hợp với sinh viên chuyên ngành Kinh tế & Marketing, không quá khó nhưng phải cuốn hút.'",
            "AI tạo ra câu đố kéo thả hình thái xã hội cũ (Triết học) và hệ thống câu hỏi lý thuyết hàn lâm 10 giây gây áp lực cho người chơi.",
            "Sinh viên tái cấu trúc hoàn toàn: Cổng 1 rút ngắn 2 câu hỏi thực tế (25s); Cổng 2 là Numpad mật mã năm 1867; Cổng 3 là trắc nghiệm cung - cầu/lạm phát; Cổng 4 là Lật thẻ 4 quy luật kinh tế + Câu hỏi vận dụng CQ."
        ),
        (
            "3. Tư liệu hình ảnh trưng bày",
            "'Hãy sinh ra các hình ảnh minh họa cho các quy luật kinh tế thị trường.'",
            "AI đề xuất tạo ảnh bằng AI Image Generator (Midjourney/DALL-E) với các chi tiết giả định, không có giá trị học thuật.",
            "Sinh viên KIÊN QUYẾT BÁC BỎ ảnh do AI tạo ra (tuân thủ nghiêm ngặt yêu cầu của Giảng viên); tự tìm kiếm, thẩm định 12 bức ảnh báo chí chính thống (Dân Trí, Thanh Niên, Lao Động, Co.opmart, NHNN) có nguồn dẫn minh bạch."
        )
    ]
    for i, row_data in enumerate(t2_rows, start=1):
        row = t2.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F9FBFD"
        for j, val in enumerate(row_data):
            cell = row.cells[j]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 60, 60, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Times New Roman"
            r.font.size = Pt(9)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # --- MỤC III: KIỂM CHỨNG BẰNG NGUỒN CHÍNH THỐNG ---
    h3 = doc.add_heading(level=1)
    r = h3.add_run("III. QUY TRÌNH ĐỐI CHIẾU & KIỂM CHỨNG BẰNG NGUỒN CHÍNH THỐNG (TIÊU CHÍ 4.2 — 0.5 ĐIỂM)")
    r.font.name = "Times New Roman"
    r.font.color.rgb = PRIMARY
    h3.paragraph_format.space_before = Pt(14)
    h3.paragraph_format.space_after = Pt(6)

    p_check_intro = doc.add_paragraph()
    p_check_intro.paragraph_format.line_spacing = 1.15
    p_check_intro.paragraph_format.space_after = Pt(8)
    p_check_intro.add_run("Toàn bộ nội dung lý luận hiển thị trên bảng thông tin (content viewer), câu hỏi thử thách mở cổng và ghi chú ôn tập đều được Nhóm 05 đối chiếu trực tiếp với các tài liệu pháp lý và giáo trình chuẩn của Bộ GD&ĐT:")

    t3 = doc.add_table(rows=5, cols=3)
    t3.alignment = WD_TABLE_ALIGNMENT.CENTER
    t3.style = 'Table Grid'

    t3_headers = ["Học phần / Căn phòng", "Nội dung lý thuyết trọng tâm", "Nguồn tài liệu chính thống đối chiếu"]
    for j, h in enumerate(t3_headers):
        cell = t3.rows[0].cells[j]
        set_cell_background(cell, "1B365D")
        set_cell_margins(cell, 80, 80, 100, 100)
        p = cell.paragraphs[0]
        r = p.add_run(h)
        r.font.name = "Times New Roman"
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(10)

    t3_rows = [
        (
            "Phòng 01:\nNền kinh tế thị trường",
            "• Khái niệm: Nền kinh tế vận hành theo cơ chế thị trường, sản phẩm văn minh nhân loại.\n• Đặc trưng: Tự chủ chủ thể, thị trường quyết định phân bổ, giá cả điều tiết.\n• Khuyết tật thị trường & sự can thiệp tất yếu của Nhà nước.",
            "Giáo trình Kinh tế chính trị Mác – Lênin (Dành cho bậc đại học không chuyên lý luận chính trị), Bộ GD&ĐT, NXB Chính trị quốc gia Sự thật, Hà Nội, 2021, trang 53–57."
        ),
        (
            "Phòng 02:\nQuy luật Giá trị",
            "• Quy luật kinh tế cơ bản của sản xuất hàng hóa.\n• Yêu cầu: Sản xuất và trao đổi phải dựa trên hao phí lao động xã hội cần thiết.\n• Tác động: Điều tiết sản xuất/lưu thông; kích thích cải tiến kỹ thuật; phân hóa người sản xuất.",
            "Giáo trình Kinh tế chính trị Mác – Lênin, Sđd, trang 59–60.\n(Mật mã cổng: Năm 1867 xuất bản tập 1 bộ Tư bản của C. Mác)."
        ),
        (
            "Phòng 03:\nQuy luật Cung – Cầu &\nLưu thông tiền tệ",
            "• Quan hệ cung – cầu điều tiết giá cả xoay quanh giá trị.\n• Công thức lưu thông tiền tệ: M = (P.Q) / V.\n• Hiện tượng phát hành thừa tiền giấy dẫn tới lạm phát.",
            "Giáo trình Kinh tế chính trị Mác – Lênin, Sđd, trang 61–63.\nĐối chiếu số liệu: Báo cáo thường niên Ngân hàng Nhà nước Việt Nam về điều tiết cung ứng tiền tệ."
        ),
        (
            "Phòng 04:\nQuy luật Cạnh tranh &\nKinh tế số (CQ)",
            "• Cạnh tranh nội bộ ngành (hình thành giá trị thị trường) & giữa các ngành (tỷ suất lợi nhuận bình quân).\n• Tác động tích cực (thúc đẩy LLSX) & Tiêu cực (hàng giả, cạnh tranh không lành mạnh).\n• Vận dụng CQ: Cung - cầu trong kinh tế số.",
            "Giáo trình Kinh tế chính trị Mác – Lênin, Sđd, trang 63–67.\nTrích dẫn P. Samuelson: Kinh tế học, t.1, tr. 547.\nBáo Lao Động / Cục Quản lý thị trường về kiểm soát hàng giả."
        )
    ]
    for i, row_data in enumerate(t3_rows, start=1):
        row = t3.rows[i]
        bg = "FFFFFF" if i % 2 != 0 else "F8F9FA"
        for j, val in enumerate(row_data):
            cell = row.cells[j]
            set_cell_background(cell, bg)
            set_cell_margins(cell, 60, 60, 80, 80)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Times New Roman"
            r.font.size = Pt(9.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # --- MỤC IV: BẢN CAM KẾT LIÊM CHÍNH HỌC THUẬT ---
    h4 = doc.add_heading(level=1)
    r = h4.add_run("IV. BẢN CAM KẾT LIÊM CHÍNH HỌC THUẬT (TIÊU CHÍ 4.4 — 0.5 ĐIỂM)")
    r.font.name = "Times New Roman"
    r.font.color.rgb = PRIMARY
    h4.paragraph_format.space_before = Pt(14)
    h4.paragraph_format.space_after = Pt(6)

    # Box for Pledge
    pledge_table = doc.add_table(rows=1, cols=1)
    pledge_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    pledge_table.style = 'Table Grid'
    p_cell = pledge_table.rows[0].cells[0]
    set_cell_background(p_cell, "FBF8F1")
    set_cell_margins(p_cell, 140, 140, 180, 180)

    p_pledge = p_cell.paragraphs[0]
    p_pledge.paragraph_format.line_spacing = 1.2
    
    run_pl_head = p_pledge.add_run("CAM KẾT CỦA TẬP THỂ NHÓM 05 VỀ LIÊM CHÍNH HỌC THUẬT:\n")
    run_pl_head.font.name = "Times New Roman"
    run_pl_head.font.bold = True
    run_pl_head.font.size = Pt(11)
    run_pl_head.font.color.rgb = SECONDARY

    pledge_text = (
        "1. KHÔNG PHÓ MẶC CHO AI: Chúng em khẳng định công cụ AI chỉ đóng vai trò hỗ trợ giải quyết các bài toán kỹ thuật lập trình giao diện 3D và tối ưu mã nguồn; toàn bộ cấu trúc bài thuyết trình, tư tưởng lý luận, phân tích chuyên môn và kịch bản tương tác đều do các thành viên nhóm tự thảo luận, nghiên cứu và xây dựng.\n"
        "2. NÓI KHÔNG VỚI ẢNH AI ẢO: Toàn bộ 12 bức ảnh tư liệu trưng bày trong bảo tàng 3D là ảnh báo chí, phóng sự thực tế từ các nguồn thông tấn, cơ quan nhà nước và doanh nghiệp uy tín (Dân Trí, Thanh Niên, Lao Động, Co.opmart, Tổng cục QLTT), có trích dẫn nguồn cụ thể ở chân từng bức tranh; không sử dụng bất kỳ ảnh deepfake hay ảnh AI tạo sinh không có nguồn gốc.\n"
        "3. TRÁCH NHIỆM CUỐI CÙNG: Nhóm 05 chịu trách nhiệm hoàn toàn 100% trước Giảng viên và Hội đồng đánh giá về tính chính xác, tính trung thực và tính học thuật của toàn bộ nội dung sản phẩm."
    )
    run_pl_body = p_pledge.add_run(pledge_text)
    run_pl_body.font.name = "Times New Roman"
    run_pl_body.font.size = Pt(10.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # Signatures Table
    sig_table = doc.add_table(rows=3, cols=2)
    sig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r in sig_table.rows:
        for c in r.cells:
            c.width = Inches(3.3)
            set_cell_margins(c, 40, 40, 60, 60)

    p_sig_left = sig_table.rows[0].cells[0].paragraphs[0]
    p_sig_left.add_run("XÁC NHẬN CỦA NHÓM TRƯỞNG\n(Ký và ghi rõ họ tên)\n\n\n\n").font.bold = True
    p_sig_left.add_run("................................................................").font.italic = True

    p_sig_right = sig_table.rows[0].cells[1].paragraphs[0]
    p_sig_right.add_run("ĐẠI DIỆN CÁC THÀNH VIÊN NHÓM 05\n(Đồng thuận cam kết)\n\n\n\n").font.bold = True
    p_sig_right.add_run("................................................................").font.italic = True

    # --- MỤC V: TÍNH SÁNG TẠO & LIÊN KẾT CHUYÊN NGÀNH ---
    h5 = doc.add_heading(level=1)
    r = h5.add_run("V. TÍNH SÁNG TẠO, TƯƠNG TÁC & LIÊN KẾT CHUYÊN NGÀNH (TIÊU CHÍ 4.3 — 0.5 ĐIỂM)")
    r.font.name = "Times New Roman"
    r.font.color.rgb = PRIMARY
    h5.paragraph_format.space_before = Pt(14)
    h5.paragraph_format.space_after = Pt(6)

    p_create = doc.add_paragraph()
    p_create.paragraph_format.line_spacing = 1.15
    p_create.paragraph_format.space_after = Pt(8)
    p_create.add_run("Sản phẩm của Nhóm 05 thể hiện sự bứt phá sáng tạo rõ nét trong phương pháp học tập lý luận chính trị, tạo cầu nối trực tiếp giữa lý thuyết Mác – Lênin với chuyên ngành Kinh tế & Marketing:")

    eval_items = [
        ("1. Chuyển hóa Gamification trong học tập:", "Thay vì đọc slide tĩnh, người học được trực tiếp di chuyển (WASD), nhập vai nhà nghiên cứu bước vào bảo tàng 3D, thu thập các mảnh ghép hồ sơ để mở các cổng kiểm tra. Mỗi cổng là một minigame kích thích tư duy (Trắc nghiệm tốc độ, Bàn phím số mật mã lịch sử, Ghép cặp trí nhớ 4 quy luật)."),
        ("2. Khả năng tương tác đám đông (Real-time Multiplayer):", "Hệ thống máy chủ tích hợp mã PIN 4 chữ số giúp Admin (sinh viên thuyết trình) quản lý đồng thời cả lớp. Mọi sinh viên trong phòng học đều có thể tham gia thi đấu cùng lúc trên điện thoại, Bảng xếp hạng cập nhật điểm số và thời gian trực tiếp, xóa bỏ hoàn toàn sự thụ động của người nghe."),
        ("3. Gắn kết chặt chẽ với chuyên môn Kinh tế & Marketing:", "Sản phẩm khai thác sâu các tình huống thương mại hiện đại: Chiến lược định giá theo cung – cầu trong giờ cao điểm của các nền tảng xe công nghệ (Grab, Be); Tầm quan trọng của R&D trong nâng cao năng lực cạnh tranh sản phẩm; Cuộc chiến bảo vệ thương hiệu và đạo đức marketing trước vấn nạn hàng giả, hàng nhái.")
    ]
    for e_title, e_desc in eval_items:
        ep = doc.add_paragraph(style='List Bullet')
        ep.paragraph_format.line_spacing = 1.15
        ep.paragraph_format.space_after = Pt(4)
        rt = ep.add_run(e_title)
        rt.font.name = "Times New Roman"
        rt.font.bold = True
        rt.font.color.rgb = PRIMARY
        rd = ep.add_run(" " + e_desc)
        rd.font.name = "Times New Roman"

    # Conclusion block
    doc.add_paragraph().paragraph_format.space_after = Pt(8)
    p_concl = doc.add_paragraph()
    p_concl.paragraph_format.line_spacing = 1.2
    run_c = p_concl.add_run("KẾT LUẬN: Báo cáo phụ lục này minh chứng rõ ràng việc ứng dụng AI của Nhóm 05 là có trách nhiệm, minh bạch, sáng tạo và tuyệt đối tuân thủ liêm chính học thuật. Sản phẩm công nghệ 3D tạo ra không chỉ đáp ứng xuất sắc yêu cầu của bài tập mà còn lan tỏa tinh thần đổi mới sáng tạo trong việc học tập và nghiên cứu các môn Lý luận Chính trị.")
    run_c.font.name = "Times New Roman"
    run_c.font.italic = True
    run_c.font.color.rgb = PRIMARY

    output_path = "/home/enzoreacher/MLN_Game/BAO_CAO_UNG_DUNG_AI_NHOM_05.docx"
    doc.save(output_path)
    print(f"Report successfully saved to {output_path}")

if __name__ == "__main__":
    create_report()
