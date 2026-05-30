# 🏀 CourtVision — Basketball Analytics App

A sleek, dark-mode sports analytics web app for tracking basketball practice sessions.

## Quick Start (Frontend Only — works immediately)

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Features
- Sign up / log in (data stored locally in your browser)
- Log practice sessions (shots, duration, drills)
- Dashboard with streak counter and stat cards
- Weekly bar chart and shooting trend line
- Full analytics page with progress benchmarks

## Project Structure

```
courtvision/
├── frontend/          ← React + Vite app (start here)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── context/   ← AuthContext, SessionContext (state management)
│   │   ├── pages/     ← Dashboard, Sessions, Analytics, Login
│   │   ├── components/
│   │   │   ├── ui/      ← Button, StatCard, LoadingScreen
│   │   │   ├── layout/  ← Sidebar, Layout
│   │   │   ├── charts/  ← WeeklyChart, TrendChart (Recharts)
│   │   │   └── sessions/← AddSessionModal, SessionCard
│   │   └── index.css  ← All CSS variables and global styles
│   └── package.json
│
└── backend/           ← FastAPI Python API (optional, for later)
    ├── main.py
    ├── routers/       ← auth.py, sessions.py, stats.py
    ├── models/        ← schemas.py (Pydantic data validation)
    └── requirements.txt
```

## Backend Setup (Optional)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # fill in your Supabase credentials
uvicorn main:app --reload
```

API docs at http://localhost:8000/docs

## Tech Stack
- **Frontend:** React 18, Vite, Recharts, CSS Variables
- **Backend:** FastAPI (Python), Pydantic
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (simulated locally for now)
