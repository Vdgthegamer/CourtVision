import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const SessionContext = createContext(null);

// Generates a unique key per user so data is isolated
const getStorageKey = (userId) => `cv_sessions_${userId}`;

export function SessionProvider({ children }) {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load sessions whenever the logged-in user changes
  useEffect(() => {
    if (!user) {
      setSessions([]);
      return;
    }
    const key = getStorageKey(user.id);
    try {
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setSessions(stored);
    } catch {
      setSessions([]);
    }
  }, [user]);

  // Save to localStorage whenever sessions change
  const persist = (newSessions) => {
    if (!user) return;
    localStorage.setItem(getStorageKey(user.id), JSON.stringify(newSessions));
  };

  const addSession = (sessionData) => {
    const newSession = {
      id: `sess_${Date.now()}`,
      ...sessionData,
      created_at: new Date().toISOString(),
      // Calculate shooting % automatically
      shooting_pct: sessionData.shots_attempted > 0
        ? Math.round((sessionData.shots_made / sessionData.shots_attempted) * 100)
        : 0,
    };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    persist(updated);
    return newSession;
  };

  const deleteSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    persist(updated);
  };

  // ─── Computed Stats ─────────────────────────────────────────────────────
  const stats = computeStats(sessions);

  return (
    <SessionContext.Provider value={{ sessions, loading, addSession, deleteSession, stats }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSessions must be used within SessionProvider");
  return ctx;
}

// Pure function that crunches all the numbers from session array
function computeStats(sessions) {
  if (!sessions.length) return {
    totalSessions: 0,
    totalShots: 0,
    totalMade: 0,
    avgShootingPct: 0,
    totalPracticeMinutes: 0,
    currentStreak: 0,
    weeklyData: [],
    recentTrend: [],
  };

  const totalShots = sessions.reduce((a, s) => a + (s.shots_attempted || 0), 0);
  const totalMade = sessions.reduce((a, s) => a + (s.shots_made || 0), 0);
  const avgShootingPct = totalShots > 0 ? Math.round((totalMade / totalShots) * 100) : 0;
  const totalPracticeMinutes = sessions.reduce((a, s) => a + (s.duration_minutes || 0), 0);

  // Current streak: consecutive days with at least one session
  const currentStreak = computeStreak(sessions);

  // Last 7 days of data for the weekly chart
  const weeklyData = computeWeeklyData(sessions);

  // Last 10 sessions for trend line
  const recentTrend = sessions.slice(0, 10).reverse().map((s, i) => ({
    session: i + 1,
    pct: s.shooting_pct,
    made: s.shots_made,
    attempted: s.shots_attempted,
    date: formatDate(s.created_at),
  }));

  return {
    totalSessions: sessions.length,
    totalShots,
    totalMade,
    avgShootingPct,
    totalPracticeMinutes,
    currentStreak,
    weeklyData,
    recentTrend,
  };
}

function computeStreak(sessions) {
  if (!sessions.length) return 0;
  const dates = [...new Set(sessions.map(s =>
    new Date(s.created_at).toDateString()
  ))].sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const d of dates) {
    const date = new Date(d);
    const diff = Math.round((cursor - date) / (1000 * 60 * 60 * 24));
    if (diff <= 1) {
      streak++;
      cursor = date;
    } else {
      break;
    }
  }
  return streak;
}

function computeWeeklyData(sessions) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const label = days[d.getDay()];

    const daySessions = sessions.filter(s => {
      const sd = new Date(s.created_at);
      sd.setHours(0, 0, 0, 0);
      return sd.getTime() === d.getTime();
    });

    const made = daySessions.reduce((a, s) => a + (s.shots_made || 0), 0);
    const attempted = daySessions.reduce((a, s) => a + (s.shots_attempted || 0), 0);
    const minutes = daySessions.reduce((a, s) => a + (s.duration_minutes || 0), 0);

    result.push({
      day: label,
      made,
      attempted,
      pct: attempted > 0 ? Math.round((made / attempted) * 100) : 0,
      minutes,
      sessions: daySessions.length,
    });
  }
  return result;
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
