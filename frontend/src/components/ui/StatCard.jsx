export default function StatCard({ icon, label, value, sub, trend, color = "orange", delay = 0 }) {
  const colors = {
    orange: { main: "var(--orange)", glow: "rgba(255,85,0,0.15)", subtle: "rgba(255,85,0,0.06)" },
    blue:   { main: "var(--blue)",   glow: "rgba(14,165,233,0.15)", subtle: "rgba(14,165,233,0.06)" },
    green:  { main: "var(--green)",  glow: "rgba(34,197,94,0.15)",  subtle: "rgba(34,197,94,0.06)" },
    yellow: { main: "var(--yellow)", glow: "rgba(245,158,11,0.15)", subtle: "rgba(245,158,11,0.06)" },
  };
  const c = colors[color] || colors.orange;

  return (
    <div
      className="fade-up"
      style={{
        background: `linear-gradient(135deg, var(--bg-card) 0%, ${c.subtle} 100%)`,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "22px",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${delay}ms`,
        transition: "transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s, border-color 0.25s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = c.main;
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${c.glow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 60, height: 60,
        background: `radial-gradient(circle at top right, ${c.glow}, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${c.main}, transparent)`,
      }} />

      {/* Icon */}
      <div style={{
        width: 38, height: 38,
        borderRadius: 8,
        background: `${c.main}18`,
        border: `1px solid ${c.main}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 17, marginBottom: 16,
      }}>{icon}</div>

      {/* Value */}
      <div className="font-display" style={{
        fontSize: 40, color: "var(--text-primary)",
        lineHeight: 1, marginBottom: 6,
        animation: "numberCount 0.5s ease forwards",
        animationDelay: `${delay + 100}ms`,
      }}>{value}</div>

      {/* Label */}
      <div style={{
        fontSize: 11, fontWeight: 600,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "var(--text-muted)", marginBottom: sub ? 8 : 0,
      }}>{label}</div>

      {sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{sub}</div>}

      {trend !== undefined && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          marginTop: 10, fontSize: 11, fontWeight: 700,
          color: trend >= 0 ? "var(--green)" : "var(--red)",
          background: trend >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          padding: "3px 8px", borderRadius: 4,
        }}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
