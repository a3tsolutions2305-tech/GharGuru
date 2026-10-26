import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, Enum
)
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    auth_provider_user_id = Column(String(128), unique=True, nullable=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(32), nullable=True)
    full_name = Column(String(128), nullable=False)
    role = Column(String(32), nullable=False, default="parent")  # parent, tutor, admin
    account_status = Column(String(32), nullable=False, default="active")  # active, suspended, pending
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    parent_profile = relationship("ParentProfile", back_populates="user", uselist=False)
    tutor_profile = relationship("TutorProfile", back_populates="user", uselist=False)

class ParentProfile(Base):
    __tablename__ = "parent_profiles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    preferred_locality = Column(String(128), nullable=True)
    preferred_language = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="parent_profile")

class TutorProfile(Base):
    __tablename__ = "tutor_profiles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    headline = Column(String(255), nullable=False)
    biography = Column(Text, nullable=False)
    qualification_summary = Column(String(255), nullable=False)
    years_of_experience = Column(Integer, default=1, nullable=False)
    teaching_approach = Column(Text, nullable=False)
    profile_photo_path = Column(String(512), nullable=True)
    gender = Column(String(32), default="Other")
    languages = Column(String(255), default="English, Hindi")
    listing_status = Column(String(32), default="pending_review", nullable=False, index=True) # draft, pending_review, approved, rejected, suspended
    verification_status = Column(String(32), default="pending", nullable=False) # not_started, pending, verified, rejected
    review_notes = Column(Text, nullable=True)
    rating = Column(Float, default=5.0)
    total_reviews = Column(Integer, default=0)
    featured = Column(Boolean, default=False)
    primary_locality = Column(String(128), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="tutor_profile")
    service_areas = relationship("TutorServiceArea", back_populates="tutor", cascade="all, delete-orphan")
    fees = relationship("TutorFee", back_populates="tutor", cascade="all, delete-orphan")
    availabilities = relationship("TutorAvailability", back_populates="tutor", cascade="all, delete-orphan")
    verification_records = relationship("VerificationRecord", back_populates="tutor", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="tutor", cascade="all, delete-orphan")

class EducationBoard(Base):
    __tablename__ = "education_boards"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(128), nullable=False)
    code = Column(String(32), unique=True, nullable=False)
    slug = Column(String(64), unique=True, nullable=False)
    active = Column(Boolean, default=True)

class Grade(Base):
    __tablename__ = "grades"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    display_name = Column(String(64), nullable=False)
    category = Column(String(64), nullable=False)
    grade_number = Column(Integer, nullable=True)
    active = Column(Boolean, default=True)

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(64), unique=True, nullable=False)
    slug = Column(String(64), unique=True, nullable=False)
    active = Column(Boolean, default=True)

class TutorBoard(Base):
    __tablename__ = "tutor_boards"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    board_code = Column(String(32), nullable=False)

class TutorGrade(Base):
    __tablename__ = "tutor_grades"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    grade_name = Column(String(64), nullable=False)

class TutorSubject(Base):
    __tablename__ = "tutor_subjects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    subject_name = Column(String(64), nullable=False)

class TutorServiceArea(Base):
    __tablename__ = "tutor_service_areas"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    locality = Column(String(128), nullable=False, index=True)
    city = Column(String(64), default="Mumbai", nullable=False)
    postal_code = Column(String(16), nullable=True)
    travel_radius_km = Column(Float, default=5.0)

    tutor = relationship("TutorProfile", back_populates="service_areas")

class TutorFee(Base):
    __tablename__ = "tutor_fees"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    pricing_type = Column(String(32), default="hourly", nullable=False)  # hourly, per_session, monthly
    amount_inr = Column(Integer, nullable=False)
    session_duration_minutes = Column(Integer, default=60)
    notes = Column(String(255), nullable=True)

    tutor = relationship("TutorProfile", back_populates="fees")

class TutorAvailability(Base):
    __tablename__ = "tutor_availability"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    weekday = Column(String(32), nullable=False)
    time_slot = Column(String(64), nullable=False)
    active = Column(Boolean, default=True)

    tutor = relationship("TutorProfile", back_populates="availabilities")

class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    verification_type = Column(String(64), nullable=False)  # ID Proof, Degree Certificate, Address Proof, Background Check
    status = Column(String(32), default="pending", nullable=False)
    reviewed_by = Column(String(36), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    internal_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    tutor = relationship("TutorProfile", back_populates="verification_records")

class SavedTutor(Base):
    __tablename__ = "saved_tutors"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    parent_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    parent_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    parent_name = Column(String(128), nullable=False)
    parent_email = Column(String(255), nullable=False)
    parent_phone = Column(String(32), nullable=False)
    tutor_name = Column(String(128), nullable=False)
    board = Column(String(32), nullable=False)
    grade = Column(String(64), nullable=False)
    subject = Column(String(64), nullable=False)
    locality = Column(String(128), nullable=False)
    preferred_schedule = Column(String(255), nullable=True)
    parent_message = Column(Text, nullable=False)
    status = Column(String(32), default="submitted", nullable=False, index=True)  # submitted, under_review, responded, accepted, declined, closed
    tutor_response_note = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    parent_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    tutor_profile_id = Column(String(36), ForeignKey("tutor_profiles.id", ondelete="CASCADE"), nullable=False)
    parent_name = Column(String(128), nullable=False)
    rating = Column(Integer, nullable=False)
    review_text = Column(Text, nullable=False)
    subject = Column(String(64), nullable=False)
    board = Column(String(32), nullable=False)
    grade = Column(String(64), nullable=False)
    moderation_status = Column(String(32), default="approved")
    is_verified_tuition = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    tutor = relationship("TutorProfile", back_populates="reviews")

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    submitted_by_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    submitted_by_name = Column(String(128), nullable=False)
    tutor_profile_id = Column(String(36), nullable=True)
    tutor_name = Column(String(128), nullable=True)
    enquiry_id = Column(String(36), nullable=True)
    category = Column(String(64), nullable=False)
    description = Column(Text, nullable=False)
    status = Column(String(32), default="open", nullable=False)  # open, investigating, resolved, dismissed
    resolution_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    acting_user_id = Column(String(36), nullable=False)
    action_type = Column(String(64), nullable=False)
    affected_resource = Column(String(128), nullable=False)
    metadata_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
