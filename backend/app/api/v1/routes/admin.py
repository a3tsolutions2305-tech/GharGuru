from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter()

@router.get("/admin/metrics")
def get_metrics(db: Session = Depends(get_db)):
    return {
        "total_tutors": 14,
        "verified_tutors": 12,
        "pending_reviews": 1,
        "total_enquiries": 2,
        "active_complaints": 1
    }

@router.patch("/admin/tutors/{tutor_id}/listing-status")
def update_listing_status(tutor_id: str, status: str, db: Session = Depends(get_db)):
    return {
        "tutor_id": tutor_id,
        "status": status,
        "message": f"Tutor {tutor_id} listing status updated to {status}"
    }

@router.get("/boards")
def list_boards():
    return [
        {"code": "CBSE", "name": "Central Board of Secondary Education"},
        {"code": "Maharashtra SSC", "name": "Maharashtra State Board of Secondary and Higher Secondary Education"},
        {"code": "ICSE", "name": "Indian Certificate of Secondary Education"},
        {"code": "NIOS", "name": "National Institute of Open Schooling"}
    ]

@router.get("/subjects")
def list_subjects():
    return [
        "Mathematics", "Science & EVS", "Physics", "Chemistry", "Biology",
        "English Literature & Grammar", "Hindi", "Social Studies (History & Civics)",
        "Computer Science & Python"
    ]
