from typing import List, Dict, Any
from app.schemas.all_schemas import MatchRequest, MatchResponse

def calculate_tutor_match(tutor_data: Dict[str, Any], req: MatchRequest) -> MatchResponse:
    score = 0
    matched_criteria: List[str] = []
    unmatched_criteria: List[str] = []

    # 1. Subject match (35%)
    tutor_subjects = [s.lower() for s in tutor_data.get("subjects", [])]
    matched_subs = [s for s in req.subjects if s.lower() in tutor_subjects]
    if matched_subs:
        score += 35
        matched_criteria.append(f"Teaches {', '.join(matched_subs)}")
    else:
        unmatched_criteria.append(f"Primary focus on {', '.join(tutor_data.get('subjects', [])[:2])}")

    # 2. Board & Grade match (25%)
    tutor_boards = [b.lower() for b in tutor_data.get("boards", [])]
    tutor_grades = [g.lower() for g in tutor_data.get("grades", [])]

    req_board = req.board.lower()
    req_grade = req.grade.lower().split("(")[0].strip()

    board_matches = req_board in tutor_boards
    grade_matches = any(req_grade in g for g in tutor_grades)

    if board_matches and grade_matches:
        score += 25
        matched_criteria.append(f"Certified for {req.board} {req.grade}")
    elif board_matches:
        score += 15
        matched_criteria.append(f"Covers {req.board} curriculum")
        unmatched_criteria.append(f"Different primary grade focus")
    else:
        unmatched_criteria.append(f"Teaches {', '.join(tutor_data.get('boards', []))}")

    # 3. Locality / Neighborhood match (20%)
    req_locality = req.locality.lower().split("(")[0].strip()
    primary_loc = tutor_data.get("primary_locality", "").lower()
    service_areas = [a.get("locality", "").lower() for a in tutor_data.get("service_areas", [])]

    is_nearby = req_locality in primary_loc or any(req_locality in sa for sa in service_areas)
    if is_nearby:
        score += 20
        matched_criteria.append(f"In-person home visits available in {tutor_data.get('primary_locality', '').split('(')[0].strip()}")
    else:
        unmatched_criteria.append(f"Based in {tutor_data.get('primary_locality', '').split('(')[0].strip()}")

    # 4. Budget match (15%)
    hourly_rate = tutor_data.get("hourly_fee", 800)
    if hourly_rate <= req.hourly_budget_inr:
        score += 15
        matched_criteria.append(f"Within budget: ₹{hourly_rate}/hr")
    elif hourly_rate <= req.hourly_budget_inr * 1.25:
        score += 8
        matched_criteria.append(f"Close to budget: ₹{hourly_rate}/hr")
    else:
        unmatched_criteria.append(f"Fee ₹{hourly_rate}/hr exceeds target ₹{req.hourly_budget_inr}/hr")

    # 5. Verification Bonus (5%)
    if tutor_data.get("verification_status") == "verified":
        score += 5
        matched_criteria.append("100% ID & university degree verified")

    percentage = max(30, min(100, score))
    summary = (
        "Exceptional curriculum and neighborhood match."
        if percentage >= 80
        else "Strong match with minor scheduling variance."
        if percentage >= 60
        else "Moderate match; check travel radius."
    )

    return MatchResponse(
        tutor_id=tutor_data.get("id", ""),
        score_percentage=percentage,
        matched_criteria=matched_criteria,
        unmatched_criteria=unmatched_criteria,
        summary=summary
    )
