# GharGuru Backend (FastAPI & PostgreSQL)

The production-ready backend service for GharGuru Home Tutor Marketplace.

## Tech Stack
- **Framework**: Python 3.10+, FastAPI
- **ORM & Migrations**: SQLAlchemy 2.0, Alembic
- **Database**: PostgreSQL (with SQLite development fallback)
- **Validation**: Pydantic v2
- **Testing**: Pytest & Unittest

## Local Setup

1. **Create Virtual Environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment:**
   Copy `.env.example` to `.env` and configure `DATABASE_URL`:
   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/gharguru
   ```

4. **Run Migrations & Seed Data:**
   ```bash
   alembic upgrade head
   python scripts/seed.py
   ```

5. **Start Dev Server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

Interactive Swagger Documentation: http://localhost:8000/docs
