"""
CourtVision FastAPI Backend
---------------------------
This is the main file that starts the API server.
FastAPI automatically generates API docs at http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import sessions, auth, stats

# Create the FastAPI app
app = FastAPI(
    title="CourtVision API",
    description="Basketball analytics backend",
    version="1.0.0",
)

# CORS — allows the React frontend (running on port 5173) to talk to this API
# Without this, browsers block cross-origin requests for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route groups (each handles a different part of the API)
app.include_router(auth.router,     prefix="/api/auth",     tags=["Authentication"])
app.include_router(sessions.router, prefix="/api/sessions", tags=["Sessions"])
app.include_router(stats.router,    prefix="/api/stats",    tags=["Stats"])


@app.get("/")
def root():
    """Health check — visit http://localhost:8000 to confirm the API is running."""
    return {"status": "ok", "app": "CourtVision", "version": "1.0.0"}
