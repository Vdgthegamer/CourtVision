import { useSessions } from "../context/SessionContext";
import TrendChart from "../components/charts/TrendChart";
import WeeklyChart from "../components/charts/WeeklyChart";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip,
} from "recharts";

function ProgressBar({ label, value, max, color = "var(--orange)", suffix = "" }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
        <span className="font-display" style={{ fontSize: 14, color }}>
          {value}{suffix}
        </span>
      </div>
      <div style={{
        height: 6, background: "var(--bg-elevated)", borderRadius: 3, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: 3,
          transition: "width 1s ease",
        }} />
      </div>
    </div>
  );
}

function InsightCard({ icon, title, value, description, color = "var(--orange)" }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 20px",
      transition: "border-color 0.2s",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = color}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {title}
        </span>
      </div>
      <p className="font-display" style={{ fontSize: 28, color, marginBottom: 4 }}>{value}</p>
      <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

const WORKOUT_COLORS = {
  shooting: "#ff6b1a",
  dribbling: "#3b82f6",
  full: "#22c55e",
  conditioning: "#eab308",
  scrimmage: "#ef4444",
};

export default function AnalyticsPage() {
  const { sessions, stats } = useSessions();

  if (sessions.length === 0) {
    return (
      <div style={{ maxWidth: 800 }}>
        <h1 className="font-display fade-in" style={{ fontSize: 32, marginBottom: 24 }}>
          ANALYTICS
        </h1>
        <div style={{
          textAlign: "center", padding: "80px 20px",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, fontWeight: 600 }}>
            No data to analyze yet
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
            Log at least a few sessions to unlock detailed analytics.
          </p>
        </div>
      </div>
    );
  }

  // Workout type distribution
  const typeCounts = sessions.reduce((acc, s) => {
    acc[s.workout_type] = (acc[s.workout_type] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(typeCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: WORKOUT_COLORS[type] || "var(--orange)",
  }));

  // Best session
  const bestSession = sessions.filter(s => s.shots_attempted > 0)
    .sort((a, b) => b.shooting_pct - a.shooting_pct)[0];

  // Most productive day
  const dayMap = {};
  sessions.forEach(s => {
    const day = new Date(s.created_at).toLocaleDateString("en-US", { weekday: "long" });
    if (!dayMap[day]) dayMap[day] = { total: 0, made: 0, attempted: 0 };
    dayMap[day].total++;
    dayMap[day].made += s.shots_made || 0;
    dayMap[day].attempted += s.shots_attempted || 0;
  });
  const bestDay = Object.entries(dayMap)
    .sort((a, b) => b[1].total - a[1].total)[0]?.[0];

  const totalHours = Math.round(stats.totalPracticeMinutes / 60 * 10) / 10;
  const maxSessions = Math.max(...stats.weeklyData.map(d => d.sessions), 1);

  return (
    <div style={{ maxWidth: 1000 }}>
      <h1 className="font-display fade-in" style={{
        fontSize: 32, letterSpacing: "0.04em", marginBottom: 8,
      }}>
        ANALYTICS <span style={{ color: "var(--orange)" }}>DEEP DIVE</span>
      </h1>
      <p className="fade-in" style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 28 }}>
        {sessions.length} sessions analyzed
      </p>

      {/* Key Insights */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
        marginBottom: 24,
      }}>
        <InsightCard
          icon="🎯"
          title="Shooting Avg"
          value={`${stats.avgShootingPct}%`}
          description={`${stats.totalMade} made out of ${stats.totalShots} attempts`}
          color="var(--orange)"
        />
        <InsightCard
          icon="⏱️"
          title="Court Hours"
          value={`${totalHours}h`}
          description={`${stats.totalPracticeMinutes} minutes total practice`}
          color="var(--blue)"
        />
        <InsightCard
          icon="🏆"
          title="Best Performance"
          value={bestSession ? `${bestSession.shooting_pct}%` : "N/A"}
          description={bestSession
            ? `${bestSession.shots_made}/${bestSession.shots_attempted} shots`
            : "No shooting data yet"}
          color="var(--green)"
        />
        <InsightCard
          icon="📅"
          title="Best Day"
          value={bestDay || "—"}
          description="Day with most sessions"
          color="var(--yellow)"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Shooting Trend */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "20px",
        }}>
          <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em", marginBottom: 4 }}>
            SHOOTING TREND
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 14 }}>
            Accuracy over your last 10 sessions
          </p>
          <TrendChart data={stats.recentTrend} />
        </div>

        {/* Workout Breakdown */}
        <div style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "20px",
        }}>
          <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em", marginBottom: 4 }}>
            WORKOUT TYPES
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 14 }}>
            Session breakdown by type
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Mini pie */}
            <div style={{ width: 100, height: 100, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={28}
                    outerRadius={46}
                    strokeWidth={0}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--bg-elevated)", border: "1px solid var(--border)",
                      borderRadius: 8, fontSize: 11,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{ flex: 1 }}>
              {pieData.map((d) => (
                <div key={d.name} style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 6,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{d.name}</span>
                  </div>
                  <span className="font-display" style={{ fontSize: 14, color: d.color }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Volume */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "20px",
        marginBottom: 14,
      }}>
        <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em", marginBottom: 4 }}>
          WEEKLY SHOTS VOLUME
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 11, marginBottom: 16 }}>
          This week's shooting volume
        </p>
        <WeeklyChart data={stats.weeklyData} />
      </div>

      {/* Progress to Goals */}
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "20px",
      }}>
        <p className="font-display" style={{ fontSize: 14, letterSpacing: "0.06em", marginBottom: 20 }}>
          PROGRESS BENCHMARKS
        </p>
        <ProgressBar
          label="Shooting Accuracy (goal: 60%)"
          value={stats.avgShootingPct}
          max={60}
          color="var(--orange)"
          suffix="%"
        />
        <ProgressBar
          label="Sessions this month (goal: 20)"
          value={getSessionsThisMonth(sessions)}
          max={20}
          color="var(--blue)"
        />
        <ProgressBar
          label="Total shots taken (milestone: 500)"
          value={stats.totalShots}
          max={500}
          color="var(--green)"
        />
        <ProgressBar
          label="Practice hours (goal: 50h)"
          value={Math.round(totalHours)}
          max={50}
          color="var(--yellow)"
          suffix="h"
        />
      </div>
    </div>
  );
}

function getSessionsThisMonth(sessions) {
  const now = new Date();
  return sessions.filter(s => {
    const d = new Date(s.created_at);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
}
