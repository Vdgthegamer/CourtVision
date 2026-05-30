import { useState } from "react";
import { useSessions } from "../../context/SessionContext";
import Button from "../ui/Button";

const DEFAULT_FORM = {
  date: new Date().toISOString().slice(0, 10),
  shots_made: "",
  shots_attempted: "",
  duration_minutes: "",
  dribbling_minutes: "",
  notes: "",
  workout_type: "shooting",
};

export default function AddSessionModal({ onClose, onSuccess }) {
  const { addSession } = useSessions();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Live shooting percentage preview
  const livePct = form.shots_attempted > 0
    ? Math.round((form.shots_made / form.shots_attempted) * 100)
    : null;

  const handleSubmit = async () => {
    setError(null);

    // Validation
    if (!form.shots_attempted && !form.duration_minutes) {
      setError("Add at least shot data or practice duration.");
      return;
    }
    if (form.shots_made > form.shots_attempted) {
      setError("Shots made can't exceed shots attempted.");
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 400)); // simulate save

    addSession({
      date: form.date,
      shots_made: Number(form.shots_made) || 0,
      shots_attempted: Number(form.shots_attempted) || 0,
      duration_minutes: Number(form.duration_minutes) || 0,
      dribbling_minutes: Number(form.dribbling_minutes) || 0,
      notes: form.notes,
      workout_type: form.workout_type,
    });

    setLoading(false);
    onSuccess?.();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 200,
        }}
      />

      {/* Modal */}
      <div
        className="fade-in"
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 201,
          width: "min(520px, 94vw)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "28px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 className="font-display" style={{ fontSize: 22, letterSpacing: "0.05em" }}>
              LOG SESSION
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 2 }}>Track your practice data</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              color: "var(--text-secondary)", width: 32, height: 32,
              borderRadius: "var(--radius-sm)", fontSize: 18,
            }}
          >×</button>
        </div>

        {/* Live shooting % badge */}
        {livePct !== null && (
          <div style={{
            background: livePct >= 50 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${livePct >= 50 ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
            borderRadius: "var(--radius-sm)",
            padding: "10px 16px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{livePct >= 50 ? "🔥" : "💪"}</span>
            <div>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Shooting Percentage</p>
              <p className="font-display" style={{ fontSize: 24, color: livePct >= 50 ? "var(--green)" : "var(--red)" }}>
                {livePct}%
              </p>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "var(--radius-sm)", padding: "10px 14px",
            color: "var(--red)", fontSize: 13, marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {/* Form fields */}
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={labelStyle}>Session Date</label>
            <input type="date" value={form.date} onChange={e => set("date", e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>Workout Type</label>
            <select value={form.workout_type} onChange={e => set("workout_type", e.target.value)}>
              <option value="shooting">Shooting Practice</option>
              <option value="dribbling">Dribbling Drills</option>
              <option value="full">Full Practice</option>
              <option value="conditioning">Conditioning</option>
              <option value="scrimmage">Scrimmage / Game</option>
            </select>
          </div>

          {/* Shots row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Shots Made</label>
              <input
                type="number" min="0" placeholder="0"
                value={form.shots_made}
                onChange={e => set("shots_made", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Shots Attempted</label>
              <input
                type="number" min="0" placeholder="0"
                value={form.shots_attempted}
                onChange={e => set("shots_attempted", e.target.value)}
              />
            </div>
          </div>

          {/* Duration row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Total Duration (min)</label>
              <input
                type="number" min="0" placeholder="60"
                value={form.duration_minutes}
                onChange={e => set("duration_minutes", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Dribbling (min)</label>
              <input
                type="number" min="0" placeholder="20"
                value={form.dribbling_minutes}
                onChange={e => set("dribbling_minutes", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Workout Notes</label>
            <textarea
              rows={3}
              placeholder="How did it go? Any specific drills, areas to improve..."
              value={form.notes}
              onChange={e => set("notes", e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <Button variant="ghost" onClick={onClose} fullWidth>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading} fullWidth icon="🏀">
            Save Session
          </Button>
        </div>
      </div>
    </>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: 6,
};
