export type UserRole = 'parent' | 'tutor' | 'admin';

export type ListingStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'suspended';

export type VerificationStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

export type EnquiryStatus = 'submitted' | 'under_review' | 'responded' | 'accepted' | 'declined' | 'closed';

export type PricingType = 'hourly' | 'per_session' | 'monthly';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  password?: string;
  avatar?: string;
  created_at: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'info' | 'error';
}

export interface Board {
  id: string;
  name: string;
  code: 'CBSE' | 'Maharashtra SSC' | 'ICSE' | 'NIOS';
  description: string;
}

export interface Grade {
  id: string;
  displayName: string;
  category: 'Primary (1-5)' | 'Middle (6-8)' | 'Secondary (9-10)' | 'Higher Secondary (11-12)';
}

export interface Subject {
  id: string;
  name: string;
  iconName: string;
}

export interface ServiceArea {
  locality: string;
  city: string;
  pincode: string;
  travelRadiusKm: number;
}

export interface AvailabilitySlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: 'Morning (8 AM - 12 PM)' | 'Afternoon (12 PM - 4 PM)' | 'Evening (4 PM - 8 PM)';
  isAvailable: boolean;
}

export interface TutorFee {
  pricingType: PricingType;
  amountInr: number;
  sessionDurationMinutes?: number;
  notes?: string;
}

export interface VerificationRecord {
  id: string;
  type: 'ID Proof' | 'Degree Certificate' | 'Address Proof' | 'Background Check';
  status: VerificationStatus;
  verifiedAt?: string;
  notes?: string;
}

export interface Review {
  id: string;
  parentName: string;
  rating: number;
  comment: string;
  date: string;
  subject: string;
  board: string;
  grade: string;
  isVerifiedTuition: boolean;
}

export interface TutorProfile {
  id: string;
  userId: string;
  fullName: string;
  headline: string;
  bio: string;
  qualificationSummary: string;
  educationDegrees: string[];
  yearsOfExperience: number;
  teachingApproach: string;
  profilePhoto: string;
  gender: 'Female' | 'Male' | 'Other';
  languages: string[];
  listingStatus: ListingStatus;
  verificationStatus: VerificationStatus;
  boards: ('CBSE' | 'Maharashtra SSC' | 'ICSE' | 'NIOS')[];
  grades: string[];
  subjects: string[];
  serviceAreas: ServiceArea[];
  primaryLocality: string;
  fee: TutorFee;
  availability: AvailabilitySlot[];
  verificationRecords: VerificationRecord[];
  reviews: Review[];
  rating: number;
  totalReviews: number;
  featured?: boolean;
  profileCompleteness: number; // percentage 0-100
  responseTimeHours?: number;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  tutorId: string;
  tutorName: string;
  board: string;
  grade: string;
  subject: string;
  preferredSchedule: string;
  locality: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
  tutorResponseNote?: string;
}

export interface ChildRequirement {
  studentName: string;
  board: string;
  grade: string;
  subjects: string[];
  locality: string;
  monthlyBudgetInr: number;
  hourlyBudgetInr: number;
  preferredTiming: string;
}

export interface Complaint {
  id: string;
  submittedByUserId: string;
  submittedByName: string;
  tutorId?: string;
  tutorName?: string;
  enquiryId?: string;
  category: 'Late Attendance' | 'Syllabus Mismatch' | 'Behavioral Concern' | 'Pricing Dispute' | 'Other';
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SmartMatchResult {
  tutorId: string;
  scorePercentage: number;
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  summary: string;
}

export interface SearchFilterState {
  searchQuery: string;
  locality: string;
  board: string;
  grade: string;
  subject: string;
  minFee: number;
  maxFee: number;
  minExperience: number;
  gender: string;
  availabilitySlot: string;
  sortBy: 'relevance' | 'experience_desc' | 'fee_asc' | 'fee_desc' | 'rating_desc';
}
