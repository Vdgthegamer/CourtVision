"""
models/schemas.py
-----------------
These Pydantic models define the SHAPE of data in the API.
When the frontend sends JSON, FastAPI automatically validates it against these models.
If data is missing or wrong type, FastAPI returns a helpful error before your code even runs.
"""

from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime


# ─── Auth Models ─────────────────────────────────────────────────────────────

class SignUpRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None


class SignInRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime


# ─── Session Models ───────────────────────────────────────────────────────────

class SessionCreate(BaseModel):
    """Data the frontend sends when creating a new session."""
    date: Optional[str] = None
    workout_type: str = "shooting"
    shots_made: int = Field(default=0, ge=0)       # ge=0 means "greater than or equal to 0"
    shots_attempted: int = Field(default=0, ge=0)
    duration_minutes: int = Field(default=0, ge=0)
    dribbling_minutes: int = Field(default=0, ge=0)
    notes: Optional[str] = None

    @validator("shots_made")
    def shots_made_lte_attempted(cls, v, values):
        """Validation: you can't make more shots than you attempted."""
        if "shots_attempted" in values and v > values["shots_attempted"]:
            raise ValueError("shots_made cannot exceed shots_attempted")
        return v


class SessionResponse(BaseModel):
    """Data the API returns for a session."""
    id: str
    user_id: str
    date: Optional[str]
    workout_type: str
    shots_made: int
    shots_attempted: int
    shooting_pct: int   # calculated automatically
    duration_minutes: int
    dribbling_minutes: int
    notes: Optional[str]
    created_at: datetime


# ─── Stats Models ─────────────────────────────────────────────────────────────

class UserStats(BaseModel):
    total_sessions: int
    total_shots: int
    total_made: int
    avg_shooting_pct: int
    total_practice_minutes: int
    current_streak: int
