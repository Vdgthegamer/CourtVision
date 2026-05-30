import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{
      background: "var(--bg-elevated)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 14px",
      fontSize: 12,
    }}>
      <p style={{ color: "var(--text-muted)", marginBottom: 6 }}>Session {label} · {d?.date}</p>
      <p style={{ color: "var(--orange)", fontWeight: 700, fontSize: 16 }}>{payload[0]?.value}%</p>
      <p style={{ color: "var(--text-muted)", marginTop: 4 }}>
        {d?.made} / {d?.attempted} shots
      </p>
    </div>
  );
}

export default function TrendChart({ data }) {
  if (!data?.length) {
    return (
      <div style={{
        height: 180, display: "flex", alignItems: "center",
        justifyContent: "center", color: "var(--text-muted)", fontSize: 13,
      }}>
        Log at least 2 sessions to see your trend
      </div>
    );
  }

  // Calculate average for reference line
  const avg = Math.round(data.reduce((a, d) => a + d.pct, 0) / data.length);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--orange)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--orange)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="session"
          axisLine={false} tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 10 }}
          label={{ value: "Session #", position: "insideBottom", offset: -2, fill: "var(--text-muted)", fontSize: 10 }}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false} tickLine={false}
          tick={{ fill: "var(--text-muted)", fontSize: 10 }}
          tickFormatter={v => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={avg}
          stroke="var(--text-muted)"
          strokeDasharray="4 4"
          label={{ value: `Avg ${avg}%`, fill: "var(--text-muted)", fontSize: 10, position: "insideTopRight" }}
        />
        <Area
          type="monotone"
          dataKey="pct"
          stroke="var(--orange)"
          strokeWidth={2.5}
          fill="url(#trendGrad)"
          dot={{ fill: "var(--orange)", r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: "var(--orange)", stroke: "var(--bg-primary)", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
