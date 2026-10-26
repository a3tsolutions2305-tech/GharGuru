import unittest
from app.services.matching import calculate_tutor_match
from app.schemas.all_schemas import MatchRequest

class TestSmartMatching(unittest.TestCase):
    def setUp(self):
        self.tutor = {
            "id": "tut-1",
            "subjects": ["Mathematics", "Physics"],
            "boards": ["ICSE", "CBSE"],
            "grades": ["Class 8", "Class 9", "Class 10"],
            "primary_locality": "Bandra West (Pali Hill)",
            "service_areas": [{"locality": "Bandra West", "travel_radius_km": 5}],
            "hourly_fee": 950,
            "verification_status": "verified"
        }

    def test_high_compatibility_match(self):
        req = MatchRequest(
            board="ICSE",
            grade="Class 10 (Board Exam)",
            subjects=["Mathematics"],
            locality="Bandra West",
            hourly_budget_inr=1000
        )
        res = calculate_tutor_match(self.tutor, req)
        self.assertGreaterEqual(res.score_percentage, 80)
        self.assertTrue(any("Mathematics" in c for c in res.matched_criteria))

    def test_locality_mismatch(self):
        req = MatchRequest(
            board="ICSE",
            grade="Class 10 (Board Exam)",
            subjects=["Mathematics"],
            locality="Thane West",
            hourly_budget_inr=1000
        )
        res = calculate_tutor_match(self.tutor, req)
        self.assertTrue(any("Based in Bandra West" in c for c in res.unmatched_criteria))

if __name__ == "__main__":
    unittest.main()
