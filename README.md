# GharGuru — Home Tutor Marketplace
> **"The right tutor. Right at home."**

A premium, production-quality full-stack Indian education marketplace connecting parents and students with verified, high-calibre home tutors across Mumbai neighborhoods (Bandra, Andheri, Powai, Juhu, Dadar, Chembur, Borivali) for **CBSE, Maharashtra SSC, ICSE, and NIOS** education boards.

---

## 🌟 Brand & Visual Identity
- **Logo Symbol**: Roof of a home harmoniously transitioning into the pages of an open book.
- **Color Palette**:
  - Forest Green (`#173F32`) — Primary trust and learning
  - Deep Forest (`#102C24`) — Headings and dark surfaces
  - Warm Ivory (`#F5F3E9`) — Welcoming editorial background
  - Sage (`#D7E6D3`) — Cards and subtle accents
  - Warm Amber (`#D99B58`) — Highlights and important actions
- **Typography**: Manrope for crisp UI readability paired with Fraunces serif for editorial hero typography.

---

## 🚀 Key Features

1. **Find Tutors Discovery Experience (`/tutors`)**
   - Multi-faceted real-time filters: Mumbai Locality, Education Board, Standard/Grade, Key Subject, Hourly Budget slider, Teaching Experience, Time Slot, and Gender Preference.
   - Live results count, applied filter chips with individual removal, and stable sorting (relevance, rating, experience, fee).
   - Information-rich tutor cards with transparent verified badges, location, hourly rates, and star ratings.

2. **Smart Match Preview & Compatibility Engine**
   - Transparent, explainable matching score based on 5 weighted criteria:
     - 35% Subject compatibility
     - 25% Board & Grade compatibility
     - 20% Neighborhood commute & service area
     - 15% Budget alignment
     - 5% Verification badge

3. **Parent Requirement Builder (`/requirement-builder`)**
   - 4-step wizard that guides parents through student grade, key subjects, neighborhood, and budget, instantly computing matched tutors with explainable breakdown.

4. **Compare Tutors Matrix (`/compare`)**
   - Side-by-side comparison tray for up to 3 selected tutors across hourly rates, qualifications, experience, boards, and availability.

5. **Tutor Profiles (`/tutor/:id`)**
   - Comprehensive tutor bio, verified university degree certificates, service areas & travel radius, weekly availability schedule, parent reviews, and direct in-home trial enquiry form.

6. **Become a Tutor Onboarding (`/become-a-tutor`)**
   - Recruitment landing page with value proposition (0% commission pilot, localized radius) and registration form with client-side validation.

7. **Parent Dashboard (`/parent/dashboard`)**
   - Enquiry tracker with real-time status updates (Submitted, Responded, Accepted), student learning profile, and saved favorites.

8. **Tutor Dashboard (`/tutor/dashboard`)**
   - Profile completeness score & checklist, received enquiries inbox with status action controls (propose trial, respond, decline), and interactive weekly availability manager.

9. **Administrative Review Desk (`/admin`)**
   - High-level KPIs, tutor listing queue with instant Approve, Suspend, and Reject controls, enquiry monitoring, and complaint grievance desk.

10. **One-Click ZIP Export**
    - Instant in-browser packaging of the entire full-stack project into a `.zip` file for sharing with colleagues and investors.

---

## 🛠️ Tech Stack

### Frontend:
- React 19 (Functional components & hooks)
- Vite 8 & TypeScript
- Tailwind CSS v4 (`@import "tailwindcss"`)
- React Router 7
- Lucide React Icons
- JSZip (for one-click codebase export)

### Backend:
- Python 3.10+
- FastAPI & Pydantic v2
- SQLAlchemy 2.0 ORM
- Alembic database migrations
- PostgreSQL (with SQLite development fallback)

---

## 🏃 Quick Start Guide

### 1. Frontend Development Server
```bash
npm install
npm run dev
```
Open **http://localhost:3000** in your browser.

### 2. Python FastAPI Backend Server
```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python scripts/seed.py
uvicorn app.main:app --reload --port 8000
```
Open **http://localhost:8000/docs** for interactive Swagger documentation.

---

## 🔒 Verification & Compliance
Every tutor profile in the demonstration dataset reflects realistic, fictional credentials created to model Mumbai's home tuition ecosystem without exposing real private identities.
