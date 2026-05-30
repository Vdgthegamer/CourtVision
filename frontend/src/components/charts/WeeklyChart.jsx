import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// Custom tooltip that matches the dark theme
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 14px",
      fontSize: 12,
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: "var(--text-primary)" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill, marginBottom: 2 }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
      {payload[1]?.value > 0 && (
        <p style={{ color: "var(--text-muted)", marginTop: 4, borderTop: "1px solid var(--border)", paddingTop: 4 }}>
          {Math.round((payload[0]?.value / payload[1]?.value) * 100)}% accuracy
        </p>
      )}
    </div>
  );
}

export default function WeeklyChart({ data }) {
  if (!data?.length) {
    return (
      <div style={{
        height: 220, display: "flex", alignItems: "center",
        justifyContent: "center", color: "var(--text-muted)", fontSize: 13,
      }}>
        No data yet — log your first session!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={3} barCategoryGap="30%">
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          vertical={false}
        />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 11 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 11 }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 12, color: "var(--text-secondary)" }}
        />
        <Bar
          dataKey="attempted"
          name="Attempted"
          fill="var(--border)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="made"
          name="Made"
          fill="var(--orange)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
