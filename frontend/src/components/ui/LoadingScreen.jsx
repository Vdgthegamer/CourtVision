export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 28,
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: "linear-gradient(135deg, var(--orange), var(--orange-bright))",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 18px",
          fontSize: 34,
          boxShadow: "0 0 60px rgba(255,85,0,0.4)",
          animation: "pulseGlow 2s infinite",
        }}>🏀</div>
        <div className="font-display" style={{ fontSize: 32, letterSpacing: "0.12em" }}>
          COURT<span style={{ color: "var(--orange)" }}>VISION</span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6, letterSpacing: "0.08em" }}>
          ANALYTICS PLATFORM
        </p>
      </div>

      {/* Loading bar */}
      <div style={{ width: 200, height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: "40%",
          background: "linear-gradient(90deg, var(--orange), var(--blue))",
          borderRadius: 1,
          animation: "shimmer 1.2s infinite",
          backgroundSize: "200% 100%",
        }} />
      </div>

      <p style={{ color: "var(--text-muted)", fontSize: 11, letterSpacing: "0.1em" }}>
        LOADING YOUR STATS...
      </p>
    </div>
  );
}
