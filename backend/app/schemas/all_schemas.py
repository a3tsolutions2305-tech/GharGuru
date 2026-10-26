from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None

class UserOut(UserBase):
    id: str
    account_status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Service Area
class ServiceAreaSchema(BaseModel):
    locality: str
    city: str = "Mumbai"
    pincode: Optional[str] = None
    travel_radius_km: float = 5.0

# Fee
class TutorFeeSchema(BaseModel):
    pricing_type: str = "hourly"
    amount_inr: int
    session_duration_minutes: Optional[int] = 60
    notes: Optional[str] = None

# Availability
class AvailabilitySlotSchema(BaseModel):
    weekday: str
    time_slot: str
    active: bool = True

# Verification
class VerificationRecordSchema(BaseModel):
    id: str
    verification_type: str
    status: str
    reviewed_at: Optional[datetime] = None
    notes: Optional[str] = None

# Review
class ReviewOut(BaseModel):
    id: str
    parent_name: str
    rating: int
    review_text: str
    subject: str
    board: str
    grade: str
    is_verified_tuition: bool
    created_at: datetime

# Tutor Profile Schemas
class TutorProfileBase(BaseModel):
    headline: str
    biography: str
    qualification_summary: str
    years_of_experience: int
    teaching_approach: str
    profile_photo_path: Optional[str] = None
    gender: Optional[str] = "Other"
    languages: Optional[str] = "English, Hindi"
    primary_locality: str

class TutorProfileCreate(TutorProfileBase):
    boards: List[str]
    grades: List[str]
    subjects: List[str]
    hourly_fee: int

class TutorProfileOut(TutorProfileBase):
    id: str
    user_id: str
    full_name: Optional[str] = None
    listing_status: str
    verification_status: str
    rating: float
    total_reviews: int
    featured: bool
    boards: List[str] = []
    grades: List[str] = []
    subjects: List[str] = []
    fee: Optional[TutorFeeSchema] = None
    service_areas: List[ServiceAreaSchema] = []
    availability: List[AvailabilitySlotSchema] = []
    verification_records: List[VerificationRecordSchema] = []
    reviews: List[ReviewOut] = []

    class Config:
        from_attributes = True

# Smart Match Request & Response
class MatchRequest(BaseModel):
    board: str
    grade: str
    subjects: List[str]
    locality: str
    hourly_budget_inr: int

class MatchResponse(BaseModel):
    tutor_id: str
    score_percentage: int
    matched_criteria: List[str]
    unmatched_criteria: List[str]
    summary: str

# Enquiry Schemas
class EnquiryCreate(BaseModel):
    tutor_id: str
    parent_name: str
    parent_email: EmailStr
    parent_phone: str
    board: str
    grade: str
    subject: str
    locality: str
    preferred_schedule: Optional[str] = None
    message: str

class EnquiryStatusUpdate(BaseModel):
    status: str
    response_note: Optional[str] = None

class EnquiryOut(BaseModel):
    id: str
    parent_user_id: str
    tutor_profile_id: str
    parent_name: str
    parent_email: str
    parent_phone: str
    tutor_name: str
    board: str
    grade: str
    subject: str
    locality: str
    preferred_schedule: Optional[str]
    parent_message: str
    status: str
    tutor_response_note: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Complaint Schemas
class ComplaintCreate(BaseModel):
    tutor_profile_id: Optional[str] = None
    tutor_name: Optional[str] = None
    category: str
    description: str

class ComplaintUpdate(BaseModel):
    status: str
    resolution_notes: Optional[str] = None
