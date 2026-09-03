import re
from collections import Counter


def get_body_font_size(spans):
    """
    Determine the most frequently used font size in the document.
    Assumes the most common size is the body text size.
    """
    sizes = [span["font_size"] for span in spans]

    if not sizes:
        return 12.0

    return Counter(sizes).most_common(1)[0][0]


def is_bold(font_name: str):
    """
    Detect whether the font is bold.
    """
    font_name = font_name.lower()

    keywords = [
        "bold",
        "black",
        "heavy",
        "semibold",
        "demibold"
    ]

    return any(word in font_name for word in keywords)


def is_numbered_heading(text: str):
    """
    Examples:
    1
    1.
    1.1
    1.2.3
    A.
    I.
    """
    text = text.strip()

    patterns = [
        r'^\d+\.?$',
        r'^\d+(\.\d+)+',
        r'^[A-Z]\.',
        r'^[IVXLCDM]+\.',
    ]

    return any(re.match(pattern, text) for pattern in patterns)


def is_all_caps(text: str):
    letters = [c for c in text if c.isalpha()]

    if not letters:
        return False

    return "".join(letters).isupper()


def score_heading(span, body_font_size):
    """
    Assign a heading score.
    """

    score = 0

    text = span["line_text"].strip()

    words = text.split()

    # Ignore empty lines
    if not text:
        return -999

    # Ignore very long sentences
    if len(words) > 18:
        return -999

    # Larger font
    if span["font_size"] > body_font_size:
        score += 3

    # Bold font
    if is_bold(span["font"]):
        score += 2

    # ALL CAPS
    if is_all_caps(text):
        score += 1

    # Numbered heading
    if is_numbered_heading(text):
        score += 2

    # Short line
    if len(words) <= 8:
        score += 1

    # Ends without punctuation
    if not text.endswith((".", ";", ":")):
        score += 1

    return score


def mark_headings(spans):
    """
    Mark spans that are headings.
    """

    body_font_size = get_body_font_size(spans)

    for span in spans:

        score = score_heading(span, body_font_size)

        span["is_heading"] = score >= 5

    return spans