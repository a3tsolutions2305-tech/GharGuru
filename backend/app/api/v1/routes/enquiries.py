from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.all_schemas import EnquiryCreate, EnquiryOut, EnquiryStatusUpdate

router = APIRouter()

@router.post("/enquiries")
def create_enquiry(enq: EnquiryCreate, db: Session = Depends(get_db)):
    """
    Submit a home tuition consultation enquiry.
    """
    return {
        "status": "success",
        "message": f"Enquiry sent to tutor {enq.tutor_id} for {enq.subject}",
        "enquiry_id": "enq-sample-1"
    }

@router.get("/enquiries/my")
def get_my_enquiries(db: Session = Depends(get_db)):
    """
    Get enquiries submitted by current parent or received by current tutor.
    """
    return []

@router.patch("/enquiries/{enquiry_id}/status")
def update_enquiry_status(enquiry_id: str, update: EnquiryStatusUpdate, db: Session = Depends(get_db)):
    """
    Update enquiry state (e.g. responded, accepted, declined).
    """
    return {
        "enquiry_id": enquiry_id,
        "new_status": update.status,
        "note": update.response_note
    }
