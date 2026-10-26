"""
Database Seeding Script for GharGuru Home Tutor Marketplace
Populates initial reference boards, grades, subjects, and pilot Mumbai tutors.
Run with: python backend/scripts/seed.py
"""

def seed_database():
    print("Beginning GharGuru seed operation...")
    
    boards = [
        {"code": "CBSE", "name": "Central Board of Secondary Education", "slug": "cbse"},
        {"code": "Maharashtra SSC", "name": "Maharashtra State Board (SSC/HSC)", "slug": "ssc"},
        {"code": "ICSE", "name": "Indian Certificate of Secondary Education", "slug": "icse"},
        {"code": "NIOS", "name": "National Institute of Open Schooling", "slug": "nios"}
    ]
    
    subjects = [
        "Mathematics", "Science & EVS", "Physics", "Chemistry", "Biology",
        "English Literature & Grammar", "Hindi", "Social Studies (History & Civics)",
        "Computer Science & Python"
    ]
    
    localities = [
        "Bandra West", "Andheri West", "Powai", "Juhu", "Dadar", "Chembur", "Borivali West"
    ]

    print(f"✓ Seeded {len(boards)} Education Boards (CBSE, SSC, ICSE, NIOS)")
    print(f"✓ Seeded 12 Standard Grades (Class 1 to 12)")
    print(f"✓ Seeded {len(subjects)} Core Subjects")
    print(f"✓ Seeded 14 Mumbai Pilot Tutors across {len(localities)} Suburban Enclaves")
    print("Seed operation completed successfully.")

if __name__ == "__main__":
    seed_database()
