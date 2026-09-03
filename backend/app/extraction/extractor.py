from app.extraction.parser import parse_pdf
from app.extraction.heading_detector import mark_headings


def clean_text(text: str) -> str:
    """
    Remove extra whitespace from extracted text.
    """
    return " ".join(text.split())


def extract_pdf(pdf_path: str):
    """
    Extract structured heading-text pairs from a PDF.
    """

    # Parse PDF
    spans = parse_pdf(pdf_path)

    if not spans:
        return []

    # Detect headings
    spans = mark_headings(spans)

    sections = []

    current_heading = "Document"
    current_body = []

    previous_line = None

    for span in spans:

        line = span["line_text"].strip()

        if not line:
            continue

        # Skip duplicate spans belonging to the same line
        if line == previous_line:
            continue

        previous_line = line

        # New heading found
        if span["is_heading"]:

            # Save previous section
            if current_body:

                sections.append({
                    "heading": clean_text(current_heading),
                    "text": clean_text(" ".join(current_body))
                })

            current_heading = line
            current_body = []

        else:

            current_body.append(line)

    # Save last section
    if current_body:

        sections.append({
            "heading": clean_text(current_heading),
            "text": clean_text(" ".join(current_body))
        })

    # Remove empty sections
    sections = [
        section
        for section in sections
        if section["text"]
    ]

    return sections