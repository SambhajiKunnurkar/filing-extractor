

from collections import Counter
import fitz  # PyMuPDF


def _lines_from_page(page):
    """Flatten a page into line-level records with font size info."""
    lines = []
    raw = page.get_text("dict")
    for block in raw.get("blocks", []):
        for line in block.get("lines", []):
            text = ""
            sizes = []
            for span in line.get("spans", []):
                t = span.get("text", "")
                if t.strip():
                    text += t
                    sizes.append(span.get("size", 0))
            text = text.strip()
            if text:
                lines.append({"text": text, "size": max(sizes) if sizes else 0})
    return lines


def _body_font_size(all_lines):
    """The most common font size in the doc = presumed body text size."""
    sizes = [round(l["size"]) for l in all_lines]
    if not sizes:
        return 10.0
    return Counter(sizes).most_common(1)[0][0]


def extract_structure(pdf_path: str) -> dict:
    doc = fitz.open(pdf_path)

    all_lines = []
    for page in doc:
        all_lines.extend(_lines_from_page(page))

    baseline = _body_font_size(all_lines)

    sections = []
    current = None

    for line in all_lines:
        is_heading = line["size"] / baseline >= 1.15 if baseline else False

        if is_heading:
            if current:
                sections.append(current)
            current = {"heading": line["text"], "text_parts": []}
        elif current:
            current["text_parts"].append(line["text"])

    if current:
        sections.append(current)

    return {
        "pages": len(doc),
        "sections": [
            {"heading": s["heading"], "text": " ".join(s["text_parts"])}
            for s in sections
        ],
    }


if __name__ == "__main__":
    import json
    import sys

    path = sys.argv[1] if len(sys.argv) > 1 else "sample_filing.pdf"
    result = extract_structure(path)
    print(json.dumps(result, indent=2))