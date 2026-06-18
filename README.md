# 🏀 CourtVision — Basketball Analytics App

A sleek, dark-mode sports analytics web app for tracking basketball practice sessions.

Visit @ https://frontend-zeta-blond-24.vercel.app
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

## Tech Stack
- **Frontend:** React 18, Vite, Recharts, CSS Variables
- **Backend:** FastAPI (Python), Pydantic
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (simulated locally for now)
