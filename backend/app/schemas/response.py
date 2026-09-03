from pydantic import BaseModel
from typing import List


class Section(BaseModel):
    heading: str
    text: str


class ExtractionResponse(BaseModel):
    filename: str
    sections: List[Section]