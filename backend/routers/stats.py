"""
Stats router — aggregated analytics for the user.
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_stats():
    # TODO: aggregate from Supabase sessions table
    return {
        "total_sessions": 0,
        "avg_shooting_pct": 0,
        "total_practice_minutes": 0,
        "current_streak": 0,
        "message": "Connect Supabase to load real stats."
    }
