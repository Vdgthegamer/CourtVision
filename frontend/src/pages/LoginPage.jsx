import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function LoginPage() {
  const { signIn, signUp, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setAuthError(null); };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setAuthError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    if (mode === "login") {
      await signIn(form.email, form.password);
    } else {
      await signUp(form.email, form.password, form.name);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background texture — large faded basketball court lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255,107,26,0.04) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,107,26,0.03) 0%, transparent 40%)
        `,
        pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }} />

      <div className="fade-in" style={{
        width: "100%",
        maxWidth: 420,
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60,
            borderRadius: "50%",
            background: "var(--orange-subtle)",
            border: "2px solid var(--orange)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: 28,
            animation: "pulse-orange 3s infinite",
          }}>🏀</div>

          <h1 className="font-display" style={{
            fontSize: 36,
            letterSpacing: "0.1em",
            color: "var(--text-primary)",
          }}>
            COURT<span style={{ color: "var(--orange)" }}>VISION</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
            Your personal basketball analytics platform
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "32px",
          boxShadow: "var(--shadow-card)",
        }}>
          {/* Mode toggle */}
          <div style={{
            display: "flex",
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-sm)",
            padding: 3,
            marginBottom: 24,
          }}>
            {["login", "signup"].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setAuthError(null); }}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 6,
                  background: mode === m ? "var(--orange)" : "transparent",
                  color: mode === m ? "#fff" : "var(--text-secondary)",
                  fontWeight: 600,
                  fontSize: 13,
                  transition: "all 0.2s",
                  border: "none",
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
                <input
                  type="text"
                  placeholder="Kobe Bryant"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="player@example.com"
                value={form.email}
                onChange={e => set("email", e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => set("password", e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Error */}
          {authError && (
            <div style={{
              marginTop: 14,
              padding: "10px 14px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "var(--radius-sm)",
              color: "var(--red)",
              fontSize: 13,
            }}>
              {authError}
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <Button variant="primary" onClick={handleSubmit} loading={loading} fullWidth size="lg">
              {mode === "login" ? "Enter the Court →" : "Start Tracking →"}
            </Button>
          </div>

          {/* Demo hint */}
          <p style={{
            textAlign: "center", color: "var(--text-muted)",
            fontSize: 11, marginTop: 16, lineHeight: 1.6,
          }}>
            {mode === "login"
              ? "New here? Switch to Sign Up to create an account."
              : "Data is stored locally in your browser for this demo."}
          </p>
        </div>

        {/* Features hint */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 24,
          marginTop: 24, flexWrap: "wrap",
        }}>
          {["📊 Track Stats", "🔥 Streaks", "📈 Analytics"].map(f => (
            <span key={f} style={{ color: "var(--text-muted)", fontSize: 12 }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: 6,
};
