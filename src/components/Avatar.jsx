export default function Avatar({ src, initial, size = 40, color = '#3b82f6', bg = '#eff6ff' }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: size * 0.4,
      overflow: 'hidden',
      border: `2px solid ${bg}`,
      flexShrink: 0
    }}>
      {src ? <img src={src} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
    </div>
  );
}
