export default function Badge({ label, color, bg }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: 800,
      color: color || '#1d4ed8',
      background: bg || '#dbeafe',
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }}>
      {label}
    </span>
  );
}
