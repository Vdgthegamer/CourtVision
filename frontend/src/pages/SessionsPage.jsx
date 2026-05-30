import { useState } from "react";
import { useSessions } from "../context/SessionContext";
import SessionCard from "../components/sessions/SessionCard";
import Button from "../components/ui/Button";
import AddSessionModal from "../components/sessions/AddSessionModal";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "shooting", label: "Shooting" },
  { value: "dribbling", label: "Dribbling" },
  { value: "full", label: "Full Practice" },
  { value: "conditioning", label: "Conditioning" },
  { value: "scrimmage", label: "Scrimmage" },
];

export default function SessionsPage() {
  const { sessions } = useSessions();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Apply filter
  const filtered = sessions.filter(s =>
    filter === "all" || s.workout_type === filter
  );

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === "oldest") return new Date(a.created_at) - new Date(b.created_at);
    if (sortBy === "best_pct") return b.shooting_pct - a.shooting_pct;
    if (sortBy === "longest") return b.duration_minutes - a.duration_minutes;
    return 0;
  });

  return (
    <div style={{ maxWidth: 800 }}>
      {/* Header */}
      <div className="fade-in" style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h1 className="font-display" style={{ fontSize: 32, letterSpacing: "0.04em" }}>
            ALL <span style={{ color: "var(--orange)" }}>SESSIONS</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>
            {sessions.length} session{sessions.length !== 1 ? "s" : ""} logged
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)} icon="+">
          Log Session
        </Button>
      </div>

      {/* Filters row */}
      <div className="fade-in" style={{
        display: "flex", gap: 10, marginBottom: 20,
        flexWrap: "wrap", alignItems: "center",
      }}>
        {/* Type filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              style={{
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                background: filter === opt.value ? "var(--orange)" : "var(--bg-card)",
                color: filter === opt.value ? "#fff" : "var(--text-secondary)",
                border: filter === opt.value ? "none" : "1px solid var(--border)",
                transition: "all 0.15s",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ width: "auto", marginLeft: "auto" }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="best_pct">Best Shooting %</option>
          <option value="longest">Longest Session</option>
        </select>
      </div>

      {/* Sessions list */}
      {sorted.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "64px 20px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          color: "var(--text-muted)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏀</div>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 6 }}>
            {filter !== "all" ? "No sessions with this filter" : "No sessions yet"}
          </p>
          <p style={{ fontSize: 13 }}>
            {filter !== "all"
              ? "Try a different filter or log a new session."
              : "Log your first practice session to start tracking your progress."}
          </p>
          <div style={{ marginTop: 20 }}>
            <Button variant="primary" onClick={() => setShowModal(true)} icon="🏀">
              Log First Session
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sorted.map((s, i) => (
            <SessionCard key={s.id} session={s} delay={i * 40} />
          ))}
        </div>
      )}

      {showModal && (
        <AddSessionModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
