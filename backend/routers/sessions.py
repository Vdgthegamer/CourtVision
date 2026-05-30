"""
Sessions router — CRUD for practice sessions.
"""
from fastapi import APIRouter
from models.schemas import SessionCreate

router = APIRouter()

@router.get("/")
def get_sessions():
    # TODO: query Supabase sessions table for current user
    return {"sessions": [], "message": "Connect Supabase to load real sessions."}

@router.post("/")
def create_session(body: SessionCreate):
    shooting_pct = 0
    if body.shots_attempted > 0:
        shooting_pct = round((body.shots_made / body.shots_attempted) * 100)
    return {
        "message": "Session validated successfully",
        "shooting_pct": shooting_pct,
        "data": body.dict()
    }

@router.delete("/{session_id}")
def delete_session(session_id: str):
    # TODO: delete from Supabase
    return {"message": f"Session {session_id} would be deleted."}
