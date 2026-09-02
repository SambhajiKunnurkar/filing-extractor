import fitz

def extract_pdf(pdf_path):

    doc = fitz.open(pdf_path)

    spans = []

    for page in doc:

        blocks = page.get_text("dict")["blocks"]

        for block in blocks:

            if "lines" not in block:
                continue

            for line in block["lines"]:

                for span in line["spans"]:

                    text = span["text"].strip()

                    if text:

                        spans.append({

                            "text": text,

                            "size": span["size"],

                            "font": span["font"]

                        })

    average_size = sum(s["size"] for s in spans) / len(spans)

    output = []

    current = None

    for span in spans:

        is_heading = span["size"] > average_size

        if is_heading:

            if current:

                output.append(current)

            current = {

                "heading": span["text"],

                "text": ""

            }

        else:

            if current:

                current["text"] += span["text"] + " "

    if current:

        output.append(current)

    return output