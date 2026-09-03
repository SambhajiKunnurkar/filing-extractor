from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.extract import router as extract_router

app = FastAPI(
    title="PDF Extraction API",
    version="1.0.0",
    description="API for extracting headings and body text from PDF documents."
)

# Allow frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(extract_router)

@app.get("/")
def root():
    return {
        "message": "PDF Extraction API is running."
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }