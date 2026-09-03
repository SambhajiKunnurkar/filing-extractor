import fitz


def parse_pdf(pdf_path: str):
    """
    Parse a PDF and return text spans with formatting and position metadata.
    """

    document = fitz.open(pdf_path)
    spans = []

    for page_index, page in enumerate(document):

        page_dict = page.get_text("dict")

        for block in page_dict.get("blocks", []):

            if "lines" not in block:
                continue

            for line in block["lines"]:

                line_text = []

                for span in line["spans"]:

                    text = span["text"].strip()

                    if not text:
                        continue

                    line_text.append(text)

                    spans.append({
                        "page": page_index + 1,

                        "text": text,

                        "font": span["font"],

                        "font_size": round(span["size"], 2),

                        "flags": span["flags"],

                        "bbox": span["bbox"],

                        "x0": span["bbox"][0],
                        "y0": span["bbox"][1],
                        "x1": span["bbox"][2],
                        "y1": span["bbox"][3],

                        "line_text": "",

                        "is_heading": False
                    })

                # Save the complete line for every span in that line
                full_line = " ".join(line_text)

                for item in spans[-len(line_text):]:
                    item["line_text"] = full_line

    document.close()

    return spans