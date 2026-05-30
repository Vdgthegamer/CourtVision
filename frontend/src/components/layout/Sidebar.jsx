import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⚡" },
  { id: "sessions", label: "Sessions", icon: "🏀" },
  { id: "analytics", label: "Analytics", icon: "📊" },
];

export default function Sidebar({ currentPage, setCurrentPage }) {
  const { user, signOut } = useAuth();

  return (
    <aside style={{
      width: 220,
      minWidth: 220,
      height: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 10,
    }}>
      <div style={{
        padding: "24px 20px 20px",
        borderBottom: "1px solid var(--border-subtle)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--orange-subtle)",
            border: "1.5px solid var(--orange)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🏀</div>
          <div className="font-display" style={{ fontSize: 20, letterSpacing: "0.08em" }}>
            COURT<span style={{ color: "var(--orange)" }}>VISION</span>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map((item) => {
          const active = currentPage === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                background: active ? "var(--orange-subtle)" : "transparent",
                color: active ? "var(--orange)" : "var(--text-secondary)",
                border: active ? "1px solid rgba(255,107,26,0.2)" : "1px solid transparent",
                fontWeight: active ? 600 : 400,
                fontSize: 14, marginBottom: 4,
                cursor: "pointer",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border-subtle)" }}>
        <div
          onClick={signOut}
          style={{
            padding: "8px 12px", borderRadius: "var(--radius-sm)",
            background: "transparent", color: "var(--text-muted)",
            border: "1px solid var(--border)", fontSize: 12,
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          }}
        >
          → Sign Out
        </div>
      </div>
    </aside>
  );
}