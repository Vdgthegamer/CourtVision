import { useSessions } from "../../context/SessionContext";

const TYPE_LABELS = {
  shooting: { label: "Shooting", icon: "🎯", color: "var(--orange)" },
  dribbling: { label: "Dribbling", icon: "⚡", color: "var(--blue)" },
  full: { label: "Full Practice", icon: "🏀", color: "var(--green)" },
  conditioning: { label: "Conditioning", icon: "💪", color: "var(--yellow)" },
  scrimmage: { label: "Scrimmage", icon: "🏆", color: "var(--red)" },
};

export default function SessionCard({ session, delay = 0 }) {
  const { deleteSession } = useSessions();
  const typeInfo = TYPE_LABELS[session.workout_type] || TYPE_LABELS.full;

  const pct = session.shooting_pct;
  const pctColor = pct >= 60 ? "var(--green)" : pct >= 40 ? "var(--orange)" : "var(--red)";

  const formattedDate = new Date(session.created_at).toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });

  const formattedTime = new Date(session.created_at).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className="fade-in"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "18px 20px",
        animationDelay: `${delay}ms`,
        transition: "border-color 0.2s, transform 0.15s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = typeInfo.color;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Left accent */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 3, background: typeInfo.color, borderRadius: "3px 0 0 3px",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Top row: type + date */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              background: `${typeInfo.color}18`,
              color: typeInfo.color,
              border: `1px solid ${typeInfo.color}30`,
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 11, fontWeight: 600,
            }}>
              {typeInfo.icon} {typeInfo.label}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
              {formattedDate} · {formattedTime}
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {session.shots_attempted > 0 && (
              <>
                <Stat label="Shooting" value={`${pct}%`} color={pctColor} />
                <Stat label="Made/Att" value={`${session.shots_made}/${session.shots_attempted}`} />
              </>
            )}
            {session.duration_minutes > 0 && (
              <Stat label="Duration" value={`${session.duration_minutes}m`} color="var(--blue)" />
            )}
            {session.dribbling_minutes > 0 && (
              <Stat label="Dribbling" value={`${session.dribbling_minutes}m`} />
            )}
          </div>

          {/* Notes */}
          {session.notes && (
            <p style={{
              color: "var(--text-muted)", fontSize: 12,
              marginTop: 10, lineHeight: 1.5,
              overflow: "hidden", textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            }}>
              "{session.notes}"
            </p>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={() => {
            if (window.confirm("Delete this session?")) deleteSession(session.id);
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: 16, padding: "4px",
            borderRadius: "var(--radius-sm)",
            flexShrink: 0,
            transition: "color 0.15s",
          }}
          title="Delete session"
          onMouseEnter={e => e.currentTarget.style.color = "var(--red)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
        >
          ×
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, color = "var(--text-primary)" }) {
  return (
    <div>
      <p style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
        {label}
      </p>
      <p className="font-display" style={{ fontSize: 18, color, lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
}
