import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)", padding: "10px 14px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <p style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 4 }}>Session {d?.session} · {d?.date}</p>
      <p className="font-display" style={{ fontSize: 26, color: payload[0]?.value >= 50 ? "var(--green)" : "var(--orange)" }}>
        {payload[0]?.value}%
      </p>
      <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{d?.made}/{d?.attempted} shots</p>
    </div>
  );
}

export default function TrendChart({ data }) {
  if (!data?.length) return (
    <div style={{ height: 160, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-muted)", fontSize:13 }}>
      Log 2+ sessions to see trend
    </div>
  );
  const avg = Math.round(data.reduce((a,d) => a + d.pct, 0) / data.length);

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="var(--blue)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis dataKey="session" axisLine={false} tickLine={false}
          tick={{ fill:"var(--text-muted)", fontSize:10 }} />
        <YAxis domain={[0,100]} axisLine={false} tickLine={false}
          tick={{ fill:"var(--text-muted)", fontSize:10 }} tickFormatter={v=>`${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={avg} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        <Area type="monotone" dataKey="pct" stroke="var(--blue)" strokeWidth={2.5}
          fill="url(#blueGrad)"
          dot={{ fill:"var(--blue)", r:4, strokeWidth:0 }}
          activeDot={{ r:6, fill:"var(--blue)", stroke:"var(--bg-primary)", strokeWidth:2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
