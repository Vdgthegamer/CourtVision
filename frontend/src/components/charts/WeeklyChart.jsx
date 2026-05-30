import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const attempted = payload.find(p => p.dataKey === "attempted")?.value || 0;
  const made = payload.find(p => p.dataKey === "made")?.value || 0;
  const pct = attempted > 0 ? Math.round((made / attempted) * 100) : 0;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)", padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontWeight: 800, fontSize: 13, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "0.06em" }}>{label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Attempted</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)" }}>{attempted}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Made</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--orange)" }}>{made}</span>
        </div>
        {attempted > 0 && (
          <div style={{
            marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--border)",
            display: "flex", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Accuracy</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: pct >= 50 ? "var(--green)" : "var(--orange)" }}>{pct}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WeeklyChart({ data }) {
  if (!data?.length) return (
    <div style={{ height: 200, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-muted)", fontSize:13 }}>
      No data yet — log your first session!
    </div>
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barGap={4} barCategoryGap="28%">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="day" axisLine={false} tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }} />
        <YAxis axisLine={false} tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 10 }} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)", radius: 4 }} />
        <Bar dataKey="attempted" name="Attempted" radius={[4,4,0,0]} fill="rgba(255,255,255,0.06)" />
        <Bar dataKey="made" name="Made" radius={[4,4,0,0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.made > 0 ? "url(#orangeGrad)" : "rgba(255,85,0,0.15)"} />
          ))}
        </Bar>
        <defs>
          <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7733" />
            <stop offset="100%" stopColor="#ff5500" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}
