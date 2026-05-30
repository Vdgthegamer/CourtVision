import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const { signIn, signUp, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setAuthError(null); };

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setAuthError("Fill in all fields."); return; }
    setLoading(true);
    if (mode === "login") await signIn(form.email, form.password);
    else await signUp(form.email, form.password, form.name);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* LEFT PANEL — branding */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Big background number */}
        <div className="font-display" style={{
          position: "absolute",
          fontSize: "40vw",
          color: "rgba(255,85,0,0.03)",
          lineHeight: 1,
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          userSelect: "none",
          pointerEvents: "none",
        }}>23</div>

        {/* Diagonal accent lines */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(255,85,0,0.3), transparent)",
        }} />

        {/* Content */}
        <div className="fade-up" style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 60 }}>
            <div style={{
              width: 44, height: 44,
              borderRadius: 10,
              background: "var(--orange)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22,
              boxShadow: "0 0 30px rgba(255,85,0,0.5)",
            }}>🏀</div>
            <span className="font-display" style={{ fontSize: 24, letterSpacing: "0.12em" }}>
              COURT<span style={{ color: "var(--orange)" }}>VISION</span>
            </span>
          </div>

          {/* Hero text */}
          <div className="font-display-italic" style={{
            fontSize: 72,
            lineHeight: 0.95,
            marginBottom: 24,
            color: "var(--text-primary)",
          }}>
            TRAIN<br />
            <span className="gradient-text-orange">HARDER.</span><br />
            TRACK<br />
            <span className="gradient-text-blue">SMARTER.</span>
          </div>

          <p style={{
            color: "var(--text-secondary)",
            fontSize: 15,
            maxWidth: 340,
            lineHeight: 1.7,
          }}>
            Every elite player tracks their progress. Join thousands of ballers who use CourtVision to level up their game.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 36, marginTop: 48 }}>
            {[
              { val: "94%", label: "Avg accuracy improvement" },
              { val: "2.4×", label: "Faster skill development" },
              { val: "10K+", label: "Sessions tracked" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: 28, color: "var(--orange)" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div style={{
        width: 460,
        minWidth: 460,
        background: "var(--bg-secondary)",
        borderLeft: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 48px",
        position: "relative",
      }}>
        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, var(--orange), var(--blue))",
        }} />

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-display" style={{ fontSize: 36, marginBottom: 6 }}>
            {mode === "login" ? "WELCOME BACK" : "JOIN THE GRIND"}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 36 }}>
            {mode === "login" ? "Your stats are waiting." : "Start tracking your journey today."}
          </p>

          {/* Toggle */}
          <div style={{
            display: "flex",
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            padding: 3,
            marginBottom: 28,
            border: "1px solid var(--border)",
          }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setAuthError(null); }}
                style={{
                  flex: 1, padding: "9px",
                  borderRadius: 4,
                  background: mode === m
                    ? "linear-gradient(135deg, var(--orange), var(--orange-bright))"
                    : "transparent",
                  color: mode === m ? "#fff" : "var(--text-secondary)",
                  fontWeight: 700, fontSize: 13,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  border: "none",
                  boxShadow: mode === m ? "0 2px 12px rgba(255,85,0,0.4)" : "none",
                }}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "signup" && (
              <div>
                <label style={labelStyle}>Your Name</label>
                <input type="text" placeholder="LeBron James"
                  value={form.name} onChange={e => set("name", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="player@example.com"
                value={form.email} onChange={e => set("email", e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••"
                value={form.password} onChange={e => set("password", e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
          </div>

          {authError && (
            <div style={{
              marginTop: 14, padding: "11px 14px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "var(--radius-sm)",
              color: "var(--red)", fontSize: 13,
            }}>{authError}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", marginTop: 24,
              padding: "14px",
              background: loading ? "var(--text-muted)" : "linear-gradient(135deg, var(--orange), var(--orange-bright))",
              color: "#fff", border: "none",
              borderRadius: "var(--radius-sm)",
              fontWeight: 800, fontSize: 15,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: loading ? "none" : "0 4px 24px rgba(255,85,0,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading
              ? <span style={{ width:16,height:16,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block" }} />
              : <>
                  {mode === "login" ? "Enter the Court" : "Start Training"}
                  <span style={{ fontSize: 18 }}>→</span>
                </>
            }
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28 }}>
            <div style={{ flex:1, height:1, background:"var(--border)" }} />
            <span style={{ color:"var(--text-muted)", fontSize:11 }}>POWERED BY</span>
            <div style={{ flex:1, height:1, background:"var(--border)" }} />
          </div>
          <p style={{ textAlign:"center", color:"var(--text-muted)", fontSize:11, marginTop:12 }}>
            🏀 CourtVision Analytics Platform
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", fontSize: 10, fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "var(--text-muted)", marginBottom: 6,
};
