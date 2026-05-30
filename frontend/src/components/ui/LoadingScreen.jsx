export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--orange-subtle)",
          border: "2px solid var(--orange)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          animation: "pulse-orange 2s infinite",
        }}>
          <span style={{ fontSize: 28 }}>🏀</span>
        </div>
        <div className="font-display" style={{ fontSize: 28, color: "var(--text-primary)", letterSpacing: "0.1em" }}>
          COURT<span style={{ color: "var(--orange)" }}>VISION</span>
        </div>
      </div>

      {/* Spinner */}
      <div style={{
        width: 32,
        height: 32,
        border: "3px solid var(--border)",
        borderTopColor: "var(--orange)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />

      <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Loading your stats...</p>
    </div>
  );
}
