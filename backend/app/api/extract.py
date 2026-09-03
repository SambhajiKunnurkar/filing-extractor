import os
import shutil
from uuid import uuid4

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.extraction.extractor import extract_pdf
from app.schemas.response import ExtractionResponse

router = APIRouter(prefix="/api", tags=["Extraction"])

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/extract", response_model=ExtractionResponse)
async def extract_document(file: UploadFile = File(...)):
    """
    Upload a PDF and extract structured heading/text pairs.
    """

    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Generate a unique filename
    file_name = f"{uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    try:
        # Save uploaded PDF
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run extraction
        sections = extract_pdf(file_path)

        return ExtractionResponse(
            filename=file.filename,
            sections=sections
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Extraction failed: {str(e)}"
        )

    finally:
        # Delete temporary file
        if os.path.exists(file_path):
            os.remove(file_path)