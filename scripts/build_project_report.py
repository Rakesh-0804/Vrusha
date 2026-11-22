from pathlib import Path
import re
import sys

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.text import WD_BREAK, WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.shared import Inches, Pt
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_LINE_SPACING
from docx.shared import RGBColor


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "PROJECT_DOCUMENTATION.md"
OUTPUT = ROOT / "docs" / "Vruksha_E-Commerce_Project_Report_Styled.docx"


def add_text_paragraph(document, text, style=None):
    paragraph = document.add_paragraph(style=style)
    paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    paragraph.paragraph_format.line_spacing = 1.15
    parts = re.split(r"(\*\*.*?\*\*|`.*?`)", text)
    for part in parts:
        if not part:
            continue
        if part.startswith("**") and part.endswith("**"):
            run = paragraph.add_run(part[2:-2])
            run.bold = True
        elif part.startswith("`") and part.endswith("`"):
            run = paragraph.add_run(part[1:-1])
            run.font.name = "Consolas"
        else:
            paragraph.add_run(part)
    return paragraph


def add_table(document, rows):
    if not rows:
        return
    table = document.add_table(rows=1, cols=len(rows[0]))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"
    for i, value in enumerate(rows[0]):
        table.rows[0].cells[i].text = value.strip()
        for paragraph in table.rows[0].cells[i].paragraphs:
            for run in paragraph.runs:
                run.bold = True
                run.font.color.rgb = RGBColor(0x1F, 0x38, 0x64)
    for row in rows[1:]:
        cells = table.add_row().cells
        for i, value in enumerate(row):
            cells[i].text = value.strip()
    for row in table.rows:
        for cell in row.cells:
            for paragraph in cell.paragraphs:
                for run in paragraph.runs:
                    run.font.name = "Times New Roman"
                    run.font.size = Pt(8.5)


def set_cell_shading(cell, fill):
    properties = cell._tc.get_or_add_tcPr()
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill)
    properties.append(shading)


def add_page_number(paragraph):
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = paragraph.add_run()
    field_begin = OxmlElement("w:fldChar")
    field_begin.set(qn("w:fldCharType"), "begin")
    instruction = OxmlElement("w:instrText")
    instruction.set(qn("xml:space"), "preserve")
    instruction.text = "PAGE"
    field_end = OxmlElement("w:fldChar")
    field_end.set(qn("w:fldCharType"), "end")
    run._r.append(field_begin)
    run._r.append(instruction)
    run._r.append(field_end)


def build():
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)
    document = Document()
    section = document.sections[0]
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.top_margin = Inches(0.79)
    section.bottom_margin = Inches(0.79)
    section.left_margin = Inches(0.59)
    section.right_margin = Inches(0.59)

    styles = document.styles
    styles["Normal"].font.name = "Times New Roman"
    styles["Normal"].font.size = Pt(12)
    styles["Normal"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    styles["Normal"].paragraph_format.line_spacing = 1.15
    for name, size in (("Title", 22), ("Heading 1", 16), ("Heading 2", 13), ("Heading 3", 11)):
        styles[name].font.name = "Times New Roman"
        styles[name].font.size = Pt(size)
    styles["Heading 1"].font.color.rgb = RGBColor(0x2E, 0x74, 0xB5)
    styles["Heading 2"].font.color.rgb = RGBColor(0x2E, 0x74, 0xB5)
    styles["Heading 3"].font.color.rgb = RGBColor(0x1F, 0x4D, 0x78)

    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    in_code = False
    code_lines = []
    table_rows = []
    cover_mode = True
    last_was_chapter = False
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("```"):
            if in_code:
                paragraph = document.add_paragraph()
                for code_line in code_lines:
                    run = paragraph.add_run(code_line + "\n")
                    run.font.name = "Consolas"
                    run.font.size = Pt(8)
                code_lines = []
                in_code = False
            else:
                in_code = True
            i += 1
            continue
        if in_code:
            code_lines.append(line)
            i += 1
            continue

        if line.startswith("|") and line.endswith("|"):
            values = [value.strip() for value in line.strip("|").split("|")]
            if all(re.fullmatch(r":?-{3,}:?", value) for value in values):
                i += 1
                continue
            table_rows.append(values)
            next_is_table = i + 1 < len(lines) and lines[i + 1].startswith("|")
            if not next_is_table:
                add_table(document, table_rows)
                table_rows = []
            i += 1
            continue

        if not line.strip():
            i += 1
            continue

        if re.match(r"^# CHAPTER \d+", line):
            if document.paragraphs:
                document.add_page_break()
            paragraph = document.add_paragraph()
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = paragraph.add_run(line[2:].strip())
            run.font.name = "Times New Roman"
            run.font.size = Pt(30)
            run.bold = True
            run.font.color.rgb = RGBColor(0x1F, 0x38, 0x64)
            last_was_chapter = True
        elif line.startswith("# "):
            paragraph = document.add_paragraph()
            centered = cover_mode or last_was_chapter
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER if centered else WD_ALIGN_PARAGRAPH.LEFT
            run = paragraph.add_run(line[2:].strip())
            run.font.name = "Times New Roman"
            run.font.size = Pt(18 if centered else 16)
            run.bold = True
            run.font.color.rgb = RGBColor(0x1F, 0x38, 0x64) if centered else RGBColor(0x2E, 0x74, 0xB5)
            last_was_chapter = False
        elif line.startswith("## "):
            paragraph = document.add_paragraph()
            paragraph.paragraph_format.space_before = Pt(8)
            title = line[3:].strip()
            if title in {"On", "CERTIFICATE", "DECLARATION", "ACKNOWLEDGEMENT", "ABSTRACT"}:
                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = paragraph.add_run(line[3:].strip())
            run.font.name = "Times New Roman"
            run.font.size = Pt(16 if title != "On" else 18)
            run.bold = True
            run.font.color.rgb = RGBColor(0xC0, 0x00, 0x00) if title in {"CERTIFICATE", "DECLARATION", "ACKNOWLEDGEMENT"} else RGBColor(0x1F, 0x38, 0x64)
        elif line.startswith("### "):
            paragraph = document.add_paragraph()
            run = paragraph.add_run(line[4:].strip())
            run.font.name = "Times New Roman"
            run.font.size = Pt(12)
            run.bold = True
            run.font.color.rgb = RGBColor(0x1F, 0x4D, 0x78)
        elif re.match(r"^\d+\.\s+", line) or line.startswith("* "):
            paragraph = document.add_paragraph(style="List Bullet" if line.startswith("* ") else "List Number")
            text = line[2:] if line.startswith("* ") else re.sub(r"^\d+\.\s+", "", line)
            paragraph.add_run(text)
        elif line.startswith("---"):
            document.add_paragraph()
        else:
            paragraph = add_text_paragraph(document, line)
            if cover_mode:
                paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            if line.strip() and not line.startswith("**") and not line.startswith("Submitted"):
                cover_mode = False
        i += 1

    for section in document.sections:
        footer = section.footer.paragraphs[0]
        footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
        footer.add_run("Vruksha E-Commerce Project Report  |  ")
        add_page_number(footer)

    document.core_properties.title = "Vruksha E-Commerce – Project Report"
    document.core_properties.subject = "Academic project documentation"
    document.core_properties.author = "Vruksha E-Commerce project team"
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build()
