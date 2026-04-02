import Avatar from './Avatar.jsx';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠', roles: ['headTeacher', 'teacher', 'student'] },
  { id: 'timetable', label: 'Timetable', icon: '📅', roles: ['headTeacher', 'teacher', 'student'] },
  { id: 'notices', label: 'Notices', icon: '📢', roles: ['headTeacher', 'teacher', 'student'] },
  { id: 'staff', label: 'Staff Directory', icon: '👥', roles: ['headTeacher', 'teacher'] },
  { id: 'manage', label: 'Manage Data', icon: '⚙️', roles: ['headTeacher'] },
  { id: 'reports', label: 'Reports', icon: '📊', roles: ['headTeacher'] }
];

export default function Sidebar({ page, setPage, currentUser, onLogout }) {
  const allowedItems = NAV_ITEMS.filter(item => item.roles.includes(currentUser.role));

  return (
    <aside style={{
      width: 260,
      background: '#fff',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0
    }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', boxShadow: 'var(--shadow-sm)' }}>
          🏫
        </div>
        <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--text)', letterSpacing: '-0.3px' }}>EduSchedule</div>
      </div>

      <div style={{ padding: '0 16px', flex: 1, overflowY: 'auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, paddingLeft: 8 }}>Menu</p>
        {allowedItems.map(item => {
          const isActive = page.toLowerCase() === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 12,
                border: 'none',
                background: isActive ? 'var(--primary-l)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--text)',
                cursor: 'pointer',
                marginBottom: 4,
                transition: 'all 0.2s',
                fontWeight: isActive ? 800 : 600,
                fontSize: 14.5
              }}
            >
              <span style={{ fontSize: 18, opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      <div style={{ padding: '20px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Avatar initial={currentUser.avatar} size={40} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>{currentUser.role.replace(/([A-Z])/g, ' $1').trim()}</div>
          </div>
        </div>
        <button
          onClick={() => setPage('profile')}
          style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginBottom: 8 }}
        >
          View Profile
        </button>
        <button
          onClick={onLogout}
          style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'var(--danger-l)', color: 'var(--danger)', border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
