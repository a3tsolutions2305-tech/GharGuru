import {
  TutorProfile,
  Enquiry,
  ChildRequirement,
  Complaint,
  User,
  SmartMatchResult,
  ToastMessage,
  Review
} from '../types';
import { INITIAL_TUTORS, INITIAL_CHILD_REQUIREMENT } from '../data/mockTutors';

const DB_KEYS = {
  USERS: 'gharguru_db_users_v2',
  SESSION: 'gharguru_db_session_v2',
  TUTORS: 'gharguru_db_tutors_v2',
  SAVED_TUTORS: 'gharguru_db_saved_tutors_v2',
  ENQUIRIES: 'gharguru_db_enquiries_v2',
  CHILD_REQUIREMENT: 'gharguru_db_child_req_v2',
  COMPLAINTS: 'gharguru_db_complaints_v2',
  COMPARE_LIST: 'gharguru_db_compare_v2',
};

// Seed authentic registered user accounts
const DEFAULT_USERS: User[] = [
  {
    id: 'usr_parent_01',
    email: 'sunita.mehra@gmail.com',
    full_name: 'Sunita Mehra',
    role: 'parent',
    phone: '+91 98201 54321',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    created_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 'usr_tutor_01',
    email: 'ananya.sharma@gharguru.in',
    full_name: 'Ananya Sharma',
    role: 'tutor',
    phone: '+91 98192 67890',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    created_at: '2025-08-10T09:00:00Z'
  },
  {
    id: 'usr_admin_01',
    email: 'admin@gharguru.in',
    full_name: 'Platform Administrator',
    role: 'admin',
    phone: '+91 99300 11223',
    password: 'adminpassword',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    created_at: '2025-01-01T00:00:00Z'
  }
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'ENQ-8921',
    parentId: 'usr_parent_01',
    parentName: 'Sunita Mehra',
    parentEmail: 'sunita.mehra@gmail.com',
    parentPhone: '+91 98201 54321',
    tutorId: 'tut-1',
    tutorName: 'Ananya Sharma',
    board: 'ICSE',
    grade: 'Class 10 (Board Exam)',
    subject: 'Mathematics',
    preferredSchedule: 'Mon & Wed evenings (5:00 PM - 6:30 PM)',
    locality: 'Bandra West (Pali Hill)',
    message: 'Looking for structured board examination preparation for my son Aarav. Needs conceptual mastery in trigonometry and quadratic equations.',
    status: 'responded',
    createdAt: '2026-03-24T10:30:00Z',
    updatedAt: '2026-03-24T14:15:00Z',
    tutorResponseNote: 'Namaste Sunita ji! I have reviewed Aarav’s syllabus. I am happy to visit your residence this Saturday at 5 PM for the introductory 45-minute diagnostic session.'
  },
  {
    id: 'ENQ-8924',
    parentId: 'usr_parent_01',
    parentName: 'Sunita Mehra',
    parentEmail: 'sunita.mehra@gmail.com',
    parentPhone: '+91 98201 54321',
    tutorId: 'tut-2',
    tutorName: 'Dr. Vikramaditya Kulkarni',
    board: 'CBSE',
    grade: 'Class 9',
    subject: 'Physics',
    preferredSchedule: 'Sunday mornings (10:00 AM)',
    locality: 'Powai (Hiranandani)',
    message: 'Interested in weekly physical mechanics and foundation problem solving.',
    status: 'under_review',
    createdAt: '2026-03-25T11:00:00Z',
    updatedAt: '2026-03-25T11:00:00Z'
  }
];

type ToastListener = (toast: ToastMessage) => void;

class DatabaseService {
  private toastListeners: ToastListener[] = [];

  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Storage write failed', err);
    }
  }

  // --- Toast Subscriptions ---
  subscribeToast(listener: ToastListener) {
    this.toastListeners.push(listener);
    return () => {
      this.toastListeners = this.toastListeners.filter(l => l !== listener);
    };
  }

  notify(title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') {
    const toast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };
    this.toastListeners.forEach(fn => fn(toast));
  }

  // --- Real User Authentication & Database ---
  getUsers(): User[] {
    const users = this.get<User[]>(DB_KEYS.USERS, []);
    if (!users || users.length === 0) {
      this.set(DB_KEYS.USERS, DEFAULT_USERS);
      return DEFAULT_USERS;
    }
    return users;
  }

  getCurrentUser(): User | null {
    const session = this.get<User | null>(DB_KEYS.SESSION, null);
    if (!session) {
      // Default initial session for immediate access to Sunita Mehra
      const defaultUser = DEFAULT_USERS[0];
      this.set(DB_KEYS.SESSION, defaultUser);
      return defaultUser;
    }
    return session;
  }

  registerUser(params: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    role: 'parent' | 'tutor';
  }): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === params.email.trim().toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: params.email.trim(),
      password: params.password,
      full_name: params.fullName.trim(),
      phone: params.phone.trim(),
      role: params.role,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    this.set(DB_KEYS.USERS, users);
    this.set(DB_KEYS.SESSION, newUser);
    this.notify('Account Created Successfully', `Welcome to GharGuru, ${newUser.full_name}!`, 'success');
    return { success: true, user: newUser };
  }

  loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, error: 'No account found with this email address. Please sign up.' };
    }

    // In production client verification
    if (user.password && user.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    this.set(DB_KEYS.SESSION, user);
    this.notify('Welcome Back', `Signed in as ${user.full_name}`, 'success');
    return { success: true, user };
  }

  setCurrentUser(user: User): void {
    this.set(DB_KEYS.SESSION, user);
  }

  logout(): void {
    localStorage.removeItem(DB_KEYS.SESSION);
    this.notify('Signed Out', 'You have been safely signed out.', 'info');
  }

  updateUserProfile(updated: Partial<User>): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;

    const merged = { ...current, ...updated };
    this.set(DB_KEYS.SESSION, merged);

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === current.id);
    if (index !== -1) {
      users[index] = merged;
      this.set(DB_KEYS.USERS, users);
    }
    this.notify('Profile Updated', 'Your profile details have been saved.', 'success');
    return merged;
  }

  // --- Tutors Database ---
  getTutors(): TutorProfile[] {
    const tutors = this.get<TutorProfile[]>(DB_KEYS.TUTORS, []);
    if (!tutors || tutors.length === 0) {
      this.set(DB_KEYS.TUTORS, INITIAL_TUTORS);
      return INITIAL_TUTORS;
    }
    return tutors;
  }

  getTutorById(id: string): TutorProfile | undefined {
    return this.getTutors().find(t => t.id === id);
  }

  updateTutor(updated: TutorProfile): void {
    const list = this.getTutors();
    const index = list.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      list[index] = updated;
    } else {
      list.push(updated);
    }
    this.set(DB_KEYS.TUTORS, list);
  }

  addReview(tutorId: string, review: Omit<Review, 'id' | 'date' | 'isVerifiedTuition'>): void {
    const list = this.getTutors();
    const index = list.findIndex(t => t.id === tutorId);
    if (index === -1) return;

    const tutor = list[index];
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isVerifiedTuition: true
    };

    const newReviews = [newRev, ...tutor.reviews];
    const totalScore = newReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAverage = Number((totalScore / newReviews.length).toFixed(2));

    tutor.reviews = newReviews;
    tutor.totalReviews = newReviews.length;
    tutor.rating = newAverage;

    list[index] = tutor;
    this.set(DB_KEYS.TUTORS, list);
    this.notify('Review Published', `Your feedback for ${tutor.fullName} has been recorded.`, 'success');
  }

  // --- Saved / Favorites ---
  getSavedTutorIds(): string[] {
    return this.get<string[]>(DB_KEYS.SAVED_TUTORS, ['tut-1', 'tut-4']);
  }

  toggleSavedTutor(tutorId: string): boolean {
    const current = this.getSavedTutorIds();
    const exists = current.includes(tutorId);
    let updated: string[];
    if (exists) {
      updated = current.filter(id => id !== tutorId);
      this.notify('Removed from Favorites', 'Tutor removed from your saved list.', 'info');
    } else {
      updated = [...current, tutorId];
      this.notify('Saved to Favorites', 'Tutor added to your saved list.', 'success');
    }
    this.set(DB_KEYS.SAVED_TUTORS, updated);
    return !exists;
  }

  isTutorSaved(tutorId: string): boolean {
    return this.getSavedTutorIds().includes(tutorId);
  }

  // --- Compare System ---
  getCompareList(): string[] {
    return this.get<string[]>(DB_KEYS.COMPARE_LIST, []);
  }

  toggleCompare(tutorId: string): boolean {
    const list = this.getCompareList();
    const exists = list.includes(tutorId);
    if (exists) {
      const updated = list.filter(id => id !== tutorId);
      this.set(DB_KEYS.COMPARE_LIST, updated);
      this.notify('Comparison Updated', 'Tutor removed from comparison tray.', 'info');
      return false;
    } else {
      if (list.length >= 3) {
        this.notify('Maximum 3 Tutors', 'You can compare up to 3 tutors at a time.', 'error');
        return false;
      }
      const updated = [...list, tutorId];
      this.set(DB_KEYS.COMPARE_LIST, updated);
      this.notify('Added to Compare', 'Tutor added to side-by-side comparison tray.', 'success');
      return true;
    }
  }

  clearCompare(): void {
    this.set(DB_KEYS.COMPARE_LIST, []);
    this.notify('Comparison Cleared', 'All tutors removed from comparison tray.', 'info');
  }

  // --- Enquiries / Consultations ---
  getEnquiries(): Enquiry[] {
    const list = this.get<Enquiry[]>(DB_KEYS.ENQUIRIES, []);
    if (!list || list.length === 0) {
      this.set(DB_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
      return INITIAL_ENQUIRIES;
    }
    return list;
  }

  createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Enquiry {
    const current = this.getEnquiries();
    const newEnq: Enquiry = {
      ...enquiry,
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.set(DB_KEYS.ENQUIRIES, [newEnq, ...current]);
    this.notify('Enquiry Dispatched', `Your in-home consultation request has been sent to ${enquiry.tutorName}.`, 'success');
    return newEnq;
  }

  updateEnquiryStatus(enquiryId: string, status: Enquiry['status'], responseNote?: string): void {
    const list = this.getEnquiries();
    const index = list.findIndex(e => e.id === enquiryId);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        status,
        updatedAt: new Date().toISOString(),
        ...(responseNote ? { tutorResponseNote: responseNote } : {})
      };
      this.set(DB_KEYS.ENQUIRIES, list);
      this.notify('Status Updated', `Enquiry #${enquiryId} updated to ${status}.`, 'success');
    }
  }

  // --- Child Requirement Profile ---
  getChildRequirement(): ChildRequirement {
    return this.get<ChildRequirement>(DB_KEYS.CHILD_REQUIREMENT, INITIAL_CHILD_REQUIREMENT);
  }

  updateChildRequirement(req: ChildRequirement): void {
    this.set(DB_KEYS.CHILD_REQUIREMENT, req);
    this.notify('Requirements Saved', 'Child learning preferences updated.', 'success');
  }

  // --- Complaints ---
  getComplaints(): Complaint[] {
    return this.get<Complaint[]>(DB_KEYS.COMPLAINTS, []);
  }

  updateComplaintStatus(complaintId: string, status: Complaint['status'], resolutionNotes?: string): void {
    const list = this.getComplaints();
    const index = list.findIndex(c => c.id === complaintId);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        status,
        updatedAt: new Date().toISOString(),
        ...(resolutionNotes ? { resolutionNotes } : {})
      };
      this.set(DB_KEYS.COMPLAINTS, list);
      this.notify('Dispute Status Updated', `Case #${complaintId} marked as ${status}.`, 'info');
    }
  }

  // Smart Match Engine
  calculateSmartMatch(tutor: TutorProfile, req: ChildRequirement): SmartMatchResult {
    let score = 0;
    const matched: string[] = [];
    const unmatched: string[] = [];

    // 1. Subject match (35 pts)
    const matchedSubjects = req.subjects.filter(s => tutor.subjects.includes(s));
    if (matchedSubjects.length > 0) {
      score += 35;
      matched.push(`Teaches ${matchedSubjects.join(', ')}`);
    } else {
      unmatched.push(`Specializes in other subjects (${tutor.subjects.slice(0, 2).join(', ')})`);
    }

    // 2. Board & Grade match (25 pts)
    const matchesBoard = tutor.boards.some(b => b === req.board);
    const cleanGrade = req.grade.replace(/ \(.*\)/, '');
    const matchesGrade = tutor.grades.some(g => g.includes(cleanGrade));

    if (matchesBoard && matchesGrade) {
      score += 25;
      matched.push(`Covers ${req.board} for ${req.grade}`);
    } else if (matchesBoard) {
      score += 15;
      matched.push(`Covers ${req.board} syllabus`);
      unmatched.push(`Focus differs from ${req.grade}`);
    } else {
      unmatched.push(`Focuses on ${tutor.boards.join(', ')}`);
    }

    // 3. Locality match (20 pts)
    const tutorLoc = tutor.primaryLocality.toLowerCase();
    const reqLoc = req.locality.toLowerCase().split('(')[0].trim();
    const isNearby = tutorLoc.includes(reqLoc) ||
      tutor.serviceAreas.some(sa => sa.locality.toLowerCase().includes(reqLoc));

    if (isNearby) {
      score += 20;
      matched.push(`In-home visits in your neighborhood (${tutor.primaryLocality.split('(')[0].trim()})`);
    } else {
      unmatched.push(`Based in ${tutor.primaryLocality.split('(')[0].trim()} (May require travel buffer)`);
    }

    // 4. Budget match (15 pts)
    if (tutor.fee.amountInr <= req.hourlyBudgetInr) {
      score += 15;
      matched.push(`Within budget: ₹${tutor.fee.amountInr}/hr (Budget: ₹${req.hourlyBudgetInr}/hr)`);
    } else if (tutor.fee.amountInr <= req.hourlyBudgetInr * 1.25) {
      score += 8;
      matched.push(`Close to budget: ₹${tutor.fee.amountInr}/hr`);
    } else {
      unmatched.push(`Fee ₹${tutor.fee.amountInr}/hr exceeds target ₹${req.hourlyBudgetInr}/hr`);
    }

    // 5. Verification bonus (5 pts)
    if (tutor.verificationStatus === 'verified') {
      score += 5;
      matched.push('Government ID & Degree audited');
    }

    const percentage = Math.min(100, Math.max(30, score));
    const summary = percentage >= 80
      ? 'Exceptional curriculum, neighborhood and schedule match.'
      : percentage >= 60
      ? 'Strong compatibility with minor variance in timing.'
      : 'Moderate match; review travel radius and subject focus.';

    return {
      tutorId: tutor.id,
      scorePercentage: percentage,
      matchedCriteria: matched,
      unmatchedCriteria: unmatched,
      summary
    };
  }
}

export const storage = new DatabaseService();
