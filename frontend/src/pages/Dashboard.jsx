import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSessions } from "../context/SessionContext";
import StatCard from "../components/ui/StatCard";
import WeeklyChart from "../components/charts/WeeklyChart";
import TrendChart from "../components/charts/TrendChart";
import AddSessionModal from "../components/sessions/AddSessionModal";
import SessionCard from "../components/sessions/SessionCard";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "MORNING";
  if (h < 17) return "AFTERNOON";
  return "EVENING";
}

export default function Dashboard() {
  const { user } = useAuth();
  const { sessions, stats } = useSessions();
  const [showModal, setShowModal] = useState(false);
  const recentSessions = sessions.slice(0, 3);
  const totalHours = Math.floor(stats.totalPracticeMinutes / 60);
  const remainMins = stats.totalPracticeMinutes % 60;
  const timeDisplay = totalHours > 0 ? `${totalHours}h ${remainMins}m` : `${stats.totalPracticeMinutes}m`;

  return (
    <div style={{ maxWidth: 1000 }}>

      {/* ── Hero Header ──────────────────────────────── */}
      <div className="fade-up" style={{
        background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(255,85,0,0.06) 50%, rgba(14,165,233,0.04) 100%)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        padding: "28px 32px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background text */}
        <div className="font-display" style={{
          position: "absolute", right: -10, top: "50%",
          transform: "translateY(-50%)",
          fontSize: 120, color: "rgba(255,85,0,0.04)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>CV</div>

        {/* Top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, var(--orange), var(--blue), transparent)",
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 6 }}>
              GOOD {getGreeting()}, {user?.name?.split(" ")[0]?.toUpperCase()}
            </p>
            <h1 className="font-display-italic" style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>
              <span className="gradient-text-orange">YOUR</span>{" "}
              <span style={{ color: "var(--text-primary)" }}>DASHBOARD</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
              {stats.totalSessions === 0
                ? "Every legend starts somewhere. Log your first session."
                : stats.currentStreak >= 3
                  ? `🔥 ${stats.currentStreak} day streak — you're on fire. Keep it going.`
                  : "Track every rep. Every shot. Every session."}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "13px 24px",
              background: "linear-gradient(135deg, var(--orange), var(--orange-bright))",
              color: "#fff", border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 800, fontSize: 13,
              letterSpacing: "0.08em", textTransform: "uppercase",
              boxShadow: "0 4px 24px rgba(255,85,0,0.4)",
              display: "flex", alignItems: "center", gap: 8,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,85,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(255,85,0,0.4)"; }}
          >
            <span style={{ fontSize: 16 }}>+</span> LOG SESSION
          </button>
        </div>
      </div>

      {/* ── Streak Banner ─────────────────────────────── */}
      {stats.currentStreak >= 2 && (
        <div className="fade-up" style={{
          background: "linear-gradient(135deg, rgba(255,85,0,0.1), rgba(255,85,0,0.04))",
          border: "1px solid rgba(255,85,0,0.25)",
          borderRadius: "var(--radius-lg)",
          padding: "14px 20px",
          marginBottom: 20,
          display: "flex", alignItems: "center", gap: 14,
          animationDelay: "0.05s",
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "rgba(255,85,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>🔥</div>
          <div style={{ flex: 1 }}>
            <div className="font-display" style={{ fontSize: 20, color: "var(--orange)" }}>
              {stats.currentStreak} DAY STREAK
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>
              Don't break the chain. Show up tomorrow.
            </div>
          </div>
          <div className="font-display" style={{ fontSize: 36, color: "rgba(255,85,0,0.2)" }}>
            {stats.currentStreak}
          </div>
        </div>
      )}

      {/* ── Stat Cards ────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        gap: 12, marginBottom: 20,
      }}>
        <StatCard icon="🏀" label="Total Sessions" value={stats.totalSessions}
          sub="All time" color="orange" delay={0} />
        <StatCard icon="🎯" label="Shooting Avg" value={`${stats.avgShootingPct}%`}
          sub={`${stats.totalMade}/${stats.totalShots} shots`}
          color={stats.avgShootingPct >= 50 ? "green" : "orange"} delay={80} />
        <StatCard icon="⏱️" label="Court Time" value={timeDisplay || "0m"}
          sub="Total practice" color="blue" delay={160} />
        <StatCard icon="🔥" label="Streak" value={`${stats.currentStreak}d`}
          sub={stats.currentStreak > 0 ? "Days in a row" : "Start today"} color="yellow" delay={240} />
      </div>

      {/* ── Charts ────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "22px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <p className="font-display" style={{ fontSize: 16, letterSpacing: "0.06em" }}>WEEKLY SHOTS</p>
              <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>Made vs attempted — last 7 days</p>
            </div>
            <div style={{
              padding: "3px 10px", borderRadius: 4,
              background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
              fontSize: 10, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em",
            }}>THIS WEEK</div>
          </div>
          <WeeklyChart data={stats.weeklyData} />
        </div>

        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "22px",
        }}>
          <p className="font-display" style={{ fontSize: 16, letterSpacing: "0.06em", marginBottom: 4 }}>TREND</p>
          <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 16 }}>Shooting % over time</p>
          <TrendChart data={stats.recentTrend} />
        </div>
      </div>

      {/* ── Recent Sessions ───────────────────────────── */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "22px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p className="font-display" style={{ fontSize: 16, letterSpacing: "0.06em" }}>RECENT SESSIONS</p>
            <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>Your last 3 practices</p>
          </div>
        </div>
        {recentSessions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 20px", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🏀</div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 600 }}>No sessions yet</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Hit LOG SESSION to start tracking</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentSessions.map((s, i) => <SessionCard key={s.id} session={s} delay={i * 60} />)}
          </div>
        )}
      </div>

      {showModal && <AddSessionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
