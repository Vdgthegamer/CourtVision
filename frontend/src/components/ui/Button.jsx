export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  icon,
}) {
  const sizes = {
    sm: { padding: "7px 14px", fontSize: 12 },
    md: { padding: "10px 20px", fontSize: 14 },
    lg: { padding: "13px 28px", fontSize: 15 },
  };

  const variants = {
    primary: {
      background: disabled ? "var(--text-muted)" : "var(--orange)",
      color: "#fff",
      border: "none",
      hoverBg: "var(--orange-dim)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)",
      hoverBg: "var(--bg-elevated)",
    },
    danger: {
      background: "rgba(239,68,68,0.1)",
      color: "var(--red)",
      border: "1px solid rgba(239,68,68,0.2)",
      hoverBg: "rgba(239,68,68,0.2)",
    },
    success: {
      background: "rgba(34,197,94,0.1)",
      color: "var(--green)",
      border: "1px solid rgba(34,197,94,0.2)",
      hoverBg: "rgba(34,197,94,0.2)",
    },
  };

  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        ...s,
        background: v.background,
        color: v.color,
        border: v.border || "none",
        borderRadius: "var(--radius-sm)",
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = v.hoverBg;
        }
      }}
      onMouseLeave={e => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = v.background;
        }
      }}
    >
      {loading ? (
        <span style={{
          width: 14, height: 14,
          border: "2px solid rgba(255,255,255,0.3)",
          borderTopColor: "white",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
          display: "inline-block",
        }} />
      ) : icon}
      {children}
    </button>
  );
}
