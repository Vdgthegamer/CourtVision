import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⚡", desc: "Overview" },
  { id: "sessions",  label: "Sessions",  icon: "🏀", desc: "Practice log" },
  { id: "analytics", label: "Analytics", icon: "📊", desc: "Deep dive" },
];

export default function Sidebar({ currentPage, setCurrentPage }) {
  const { user, signOut } = useAuth();

  return (
    <aside style={{
      width: 220, minWidth: 220,
      height: "100vh",
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, zIndex: 10,
    }}>
      {/* Top orange+blue gradient line */}
      <div style={{
        height: 2,
        background: "linear-gradient(90deg, var(--orange), var(--blue))",
      }} />

      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "var(--orange)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17,
            boxShadow: "0 0 20px rgba(255,85,0,0.4)",
          }}>🏀</div>
          <div className="font-display" style={{ fontSize: 19, letterSpacing: "0.1em" }}>
            COURT<span style={{ color: "var(--orange)" }}>VISION</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 10px" }}>
        <p style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
          color: "var(--text-muted)", textTransform: "uppercase",
          padding: "0 10px", marginBottom: 8,
        }}>NAVIGATE</p>

        {NAV_ITEMS.map((item, i) => {
          const active = currentPage === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={active ? "" : ""}
              style={{
                display: "flex", alignItems: "center", gap: 11,
                padding: "10px 12px",
                borderRadius: "var(--radius-sm)",
                marginBottom: 3,
                cursor: "pointer",
                position: "relative",
                background: active
                  ? "linear-gradient(135deg, rgba(255,85,0,0.12), rgba(14,165,233,0.06))"
                  : "transparent",
                border: active ? "1px solid rgba(255,85,0,0.2)" : "1px solid transparent",
                transition: "all 0.2s",
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => {
                if (!active) {
                  e.currentTarget.style.background = "var(--bg-elevated)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "transparent";
                }
              }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: "absolute", left: 0, top: "20%", bottom: "20%",
                  width: 3, borderRadius: "0 2px 2px 0",
                  background: "linear-gradient(to bottom, var(--orange), var(--blue))",
                }} />
              )}

              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <div>
                <div style={{
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  lineHeight: 1.2,
                }}>{item.label}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{item.desc}</div>
              </div>

              {active && (
                <div style={{
                  marginLeft: "auto", width: 6, height: 6,
                  borderRadius: "50%",
                  background: "var(--orange)",
                  boxShadow: "0 0 8px var(--orange)",
                }} />
              )}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "14px 10px", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", marginBottom: 8,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--orange), var(--blue))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 13, color: "#fff", flexShrink: 0,
          }}>
            {user?.avatar || "?"}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: "var(--text-primary)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{user?.name}</div>
            <div style={{
              fontSize: 10, color: "var(--text-muted)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{user?.email}</div>
          </div>
        </div>

        <div
          onClick={signOut}
          style={{
            padding: "8px 12px", borderRadius: "var(--radius-sm)",
            color: "var(--text-muted)", border: "1px solid var(--border)",
            fontSize: 11, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8,
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "var(--red)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            e.currentTarget.style.background = "rgba(239,68,68,0.06)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span>⎋</span> SIGN OUT
        </div>
      </div>
    </aside>
  );
}
