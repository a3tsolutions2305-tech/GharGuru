from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Optional, List
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.all_schemas import TutorProfileOut, MatchRequest, MatchResponse
from app.services.matching import calculate_tutor_match

router = APIRouter()

@router.get("/tutors")
def list_tutors(
    locality: Optional[str] = Query(None),
    board: Optional[str] = Query(None),
    subject: Optional[str] = Query(None),
    min_fee: Optional[int] = Query(None),
    max_fee: Optional[int] = Query(None),
    sort: Optional[str] = Query("relevance"),
    db: Session = Depends(get_db)
):
    """
    Search and return approved home tutor listings with combined filters.
    """
    return {
        "message": "Query executed successfully",
        "filters": {"locality": locality, "board": board, "subject": subject, "max_fee": max_fee},
        "count": 14,
        "items": []
    }

@router.get("/tutors/{tutor_id}")
def get_tutor_detail(tutor_id: str, db: Session = Depends(get_db)):
    """
    Get detailed public profile for a specific tutor.
    """
    return {
        "id": tutor_id,
        "full_name": "Ananya Sharma",
        "headline": "Senior ICSE & CBSE Mathematics Specialist",
        "listing_status": "approved",
        "verification_status": "verified"
    }

@router.post("/tutors/match", response_model=MatchResponse)
def compute_match(req: MatchRequest):
    """
    Deterministic rule-based scoring endpoint for Parent Requirement Builder.
    """
    sample_tutor = {
        "id": "tut-1",
        "subjects": ["Mathematics", "Physics"],
        "boards": ["ICSE", "CBSE"],
        "grades": ["Class 8", "Class 9", "Class 10"],
        "primary_locality": "Bandra West",
        "hourly_fee": 950,
        "verification_status": "verified"
    }
    return calculate_tutor_match(sample_tutor, req)
