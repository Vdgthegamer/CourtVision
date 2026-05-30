export default function StatCard({ icon, label, value, sub, trend, color = "orange", delay = 0 }) {
  const colors = {
    orange: "var(--orange)",
    green: "var(--green)",
    blue: "var(--blue)",
    yellow: "var(--yellow)",
    red: "var(--red)",
  };
  const accentColor = colors[color] || colors.orange;

  return (
    <div
      className="fade-in"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${delay}ms`,
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentColor}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Background accent line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Icon */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-sm)",
        background: `${accentColor}18`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        marginBottom: 14,
        border: `1px solid ${accentColor}30`,
      }}>
        {icon}
      </div>

      {/* Value */}
      <div className="font-display" style={{
        fontSize: 36,
        color: "var(--text-primary)",
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {value}
      </div>

      {/* Label */}
      <div style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 500, marginBottom: sub ? 8 : 0 }}>
        {label}
      </div>

      {/* Sub / trend */}
      {sub && (
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
          {sub}
        </div>
      )}
      {trend !== undefined && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginTop: 8,
          fontSize: 11,
          fontWeight: 600,
          color: trend >= 0 ? "var(--green)" : "var(--red)",
          background: trend >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
          padding: "2px 8px",
          borderRadius: 4,
        }}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}
