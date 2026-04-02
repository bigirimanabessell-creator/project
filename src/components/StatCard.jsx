export default function StatCard({ icon, label, value, color, bg }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 18,
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        width: 54,
        height: 54,
        borderRadius: 14,
        background: bg || 'var(--primary-l)',
        color: color || 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24
      }}>
        {icon}
      </div>
      <div>
        <div style={{ color: 'var(--muted)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginTop: 4 }}>{value}</div>
      </div>
    </div>
  );
}
