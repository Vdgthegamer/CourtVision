import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useSessions } from "../context/SessionContext";
import StatCard from "../components/ui/StatCard";
import WeeklyChart from "../components/charts/WeeklyChart";
import TrendChart from "../components/charts/TrendChart";
import Button from "../components/ui/Button";
import AddSessionModal from "../components/sessions/AddSessionModal";
import SessionCard from "../components/sessions/SessionCard";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getMotivationalQuote(stats) {
  if (stats.totalSessions === 0) return "Every legend starts with zero sessions. Log your first one.";
  if (stats.currentStreak >= 7) return "7+ day streak! You're built different. Keep going.";
  if (stats.currentStreak >= 3) return `${stats.currentStreak} days straight. Momentum is building.`;
  if (stats.avgShootingPct >= 60) return "60%+ shooting. Elite tier. Keep that consistency.";
  if (stats.avgShootingPct >= 40) return "Solid form. Every shot counts. Push for 50%.";
  return "The grind is real. Consistency beats talent every time.";
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
      {/* Header */}
      <div className="fade-in" style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <p style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            {getGreeting()}, {user?.name?.split(" ")[0]} 👋
          </p>
          <h1 className="font-display" style={{ fontSize: 32, letterSpacing: "0.04em" }}>
            YOUR <span style={{ color: "var(--orange)" }}>DASHBOARD</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
            {getMotivationalQuote(stats)}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          icon="+"
          size="md"
        >
          Log Session
        </Button>
      </div>

      {/* Streak Banner */}
      {stats.currentStreak >= 2 && (
        <div className="fade-in" style={{
          background: "linear-gradient(135deg, rgba(255,107,26,0.12), rgba(255,107,26,0.04))",
          border: "1px solid rgba(255,107,26,0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "14px 20px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}>
          <span style={{ fontSize: 24 }}>🔥</span>
          <div>
            <p className="font-display" style={{ fontSize: 18, color: "var(--orange)" }}>
              {stats.currentStreak} DAY STREAK
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 12 }}>
              Keep showing up. Don't break the chain.
            </p>
          </div>
        </div>
      )}

      {/* Stat Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 14,
        marginBottom: 28,
      }}>
        <StatCard
          icon="🏀"
          label="Total Sessions"
          value={stats.totalSessions}
          sub={stats.totalSessions === 0 ? "Log your first session" : "All time"}
          color="orange"
          delay={0}
        />
        <StatCard
          icon="🎯"
          label="Avg Shooting %"
          value={`${stats.avgShootingPct}%`}
          sub={`${stats.totalMade} made / ${stats.totalShots} attempted`}
          color={stats.avgShootingPct >= 50 ? "green" : "orange"}
          delay={80}
        />
        <StatCard
          icon="⏱️"
          label="Total Practice Time"
          value={timeDisplay || "0m"}
          sub="Combined court time"
          color="blue"
          delay={160}
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={`${stats.currentStreak}d`}
          sub={stats.currentStreak > 0 ? "Days in a row" : "Log today to start"}
          color="yellow"
          delay={240}
        />
      </div>

      {/* Charts Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 14,
        marginBottom: 28,
      }}>
        {/* Weekly Chart */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          gridColumn: "1 / -1", // full width by default
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                WEEKLY SHOTS
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>
                Last 7 days — made vs attempted
              </p>
            </div>
          </div>
          <WeeklyChart data={stats.weeklyData} />
        </div>
      </div>

      {/* Trend chart + Recent sessions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Trend Chart */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
        }}>
          <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em", marginBottom: 4 }}>
            SHOOTING TREND
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 16 }}>
            Last 10 sessions
          </p>
          <TrendChart data={stats.recentTrend} />
        </div>

        {/* Recent Sessions */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
                RECENT SESSIONS
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>Latest 3</p>
            </div>
          </div>

          {recentSessions.length === 0 ? (
            <div style={{
              textAlign: "center", padding: "32px 16px",
              color: "var(--text-muted)", fontSize: 13,
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🏀</div>
              <p>No sessions yet.</p>
              <p style={{ fontSize: 11, marginTop: 4 }}>Hit "Log Session" to start tracking.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recentSessions.map((s, i) => (
                <SessionCard key={s.id} session={s} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddSessionModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}
