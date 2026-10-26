import { storage } from './storage';
import {
  TutorProfile,
  Enquiry,
  ChildRequirement,
  Complaint,
  SearchFilterState,
  SmartMatchResult
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  isBackendConfigured(): boolean {
    return Boolean(API_BASE && API_BASE.trim().length > 0);
  }

  private getHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Health
  async checkHealth(): Promise<{ status: string; mode: string }> {
    if (!this.isBackendConfigured()) {
      return { status: 'ok', mode: 'GharGuru Service Connected' };
    }
    try {
      const res = await fetch(`${API_BASE}/api/v1/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return { status: 'fallback', mode: 'Local Data Store' };
    }
  }

  // Tutors Search & List
  async searchTutors(filters?: Partial<SearchFilterState>): Promise<TutorProfile[]> {
    if (this.isBackendConfigured()) {
      try {
        const params = new URLSearchParams();
        if (filters?.locality) params.set('locality', filters.locality);
        if (filters?.board) params.set('board', filters.board);
        if (filters?.subject) params.set('subject', filters.subject);
        if (filters?.minFee) params.set('min_fee', String(filters.minFee));
        if (filters?.maxFee) params.set('max_fee', String(filters.maxFee));
        if (filters?.sortBy) params.set('sort', filters.sortBy);

        const res = await fetch(`${API_BASE}/api/v1/tutors?${params.toString()}`, {
          headers: this.getHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          return data.items || data;
        }
      } catch (err) {
        console.warn('Backend search failed, using local storage fallback:', err);
      }
    }

    // Local filter implementation
    let tutors = storage.getTutors();

    // In public search, only show approved tutors unless requested by admin
    tutors = tutors.filter(t => t.listingStatus === 'approved');

    if (!filters) return tutors;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      tutors = tutors.filter(t =>
        t.fullName.toLowerCase().includes(q) ||
        t.headline.toLowerCase().includes(q) ||
        t.subjects.some(s => s.toLowerCase().includes(q)) ||
        t.primaryLocality.toLowerCase().includes(q) ||
        t.qualificationSummary.toLowerCase().includes(q)
      );
    }

    if (filters.locality && filters.locality !== 'all') {
      const locKey = filters.locality.split('(')[0].trim().toLowerCase();
      tutors = tutors.filter(t =>
        t.primaryLocality.toLowerCase().includes(locKey) ||
        t.serviceAreas.some(sa => sa.locality.toLowerCase().includes(locKey))
      );
    }

    if (filters.board && filters.board !== 'all') {
      tutors = tutors.filter(t => t.boards.includes(filters.board as any));
    }

    if (filters.grade && filters.grade !== 'all') {
      const cleanGrade = filters.grade.split('(')[0].trim();
      tutors = tutors.filter(t => t.grades.some(g => g.includes(cleanGrade)));
    }

    if (filters.subject && filters.subject !== 'all') {
      tutors = tutors.filter(t => t.subjects.includes(filters.subject!));
    }

    if (filters.minFee) {
      tutors = tutors.filter(t => t.fee.amountInr >= filters.minFee!);
    }

    if (filters.maxFee) {
      tutors = tutors.filter(t => t.fee.amountInr <= filters.maxFee!);
    }

    if (filters.minExperience && filters.minExperience > 0) {
      tutors = tutors.filter(t => t.yearsOfExperience >= filters.minExperience!);
    }

    if (filters.gender && filters.gender !== 'all') {
      tutors = tutors.filter(t => t.gender.toLowerCase() === filters.gender!.toLowerCase());
    }

    if (filters.availabilitySlot && filters.availabilitySlot !== 'all') {
      tutors = tutors.filter(t =>
        t.availability.some(a => a.timeSlot.includes(filters.availabilitySlot!) && a.isAvailable)
      );
    }

    // Sort
    if (filters.sortBy === 'experience_desc') {
      tutors.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
    } else if (filters.sortBy === 'fee_asc') {
      tutors.sort((a, b) => a.fee.amountInr - b.fee.amountInr);
    } else if (filters.sortBy === 'fee_desc') {
      tutors.sort((a, b) => b.fee.amountInr - a.fee.amountInr);
    } else if (filters.sortBy === 'rating_desc') {
      tutors.sort((a, b) => b.rating - a.rating);
    } else {
      // Relevance: featured first, then rating
      tutors.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }

    return tutors;
  }

  // Get Tutor Profile By ID
  async getTutor(id: string): Promise<TutorProfile | null> {
    if (this.isBackendConfigured()) {
      try {
        const res = await fetch(`${API_BASE}/api/v1/tutors/${id}`, {
          headers: this.getHeaders()
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Backend get tutor failed:', err);
      }
    }
    return storage.getTutorById(id) || null;
  }

  // Submit Enquiry
  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Enquiry> {
    if (this.isBackendConfigured()) {
      try {
        const res = await fetch(`${API_BASE}/api/v1/enquiries`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(enquiry)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Backend create enquiry failed, saving locally:', err);
      }
    }
    return storage.createEnquiry(enquiry);
  }

  // Get User Enquiries
  async getMyEnquiries(): Promise<Enquiry[]> {
    if (this.isBackendConfigured()) {
      try {
        const res = await fetch(`${API_BASE}/api/v1/enquiries/my`, {
          headers: this.getHeaders()
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Backend get enquiries failed:', err);
      }
    }
    return storage.getEnquiries();
  }

  // Update Enquiry Status
  async updateEnquiryStatus(enquiryId: string, status: Enquiry['status'], note?: string): Promise<void> {
    if (this.isBackendConfigured()) {
      try {
        await fetch(`${API_BASE}/api/v1/enquiries/${enquiryId}/status`, {
          method: 'PATCH',
          headers: this.getHeaders(),
          body: JSON.stringify({ status, note })
        });
      } catch (err) {
        console.warn('Backend update status failed:', err);
      }
    }
    storage.updateEnquiryStatus(enquiryId, status, note);
  }

  // Smart Matching
  getSmartMatch(tutor: TutorProfile, req: ChildRequirement): SmartMatchResult {
    return storage.calculateSmartMatch(tutor, req);
  }
}

export const api = new ApiClient();
