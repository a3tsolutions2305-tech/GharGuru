from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def get_health():
    return {
        "status": "healthy",
        "service": "GharGuru FastAPI Backend",
        "version": "1.0.0",
        "database": "PostgreSQL Ready (SQLAlchemy 2.x)",
        "mode": "Production Architecture"
    }
