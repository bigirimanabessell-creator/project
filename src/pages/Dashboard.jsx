import StatCard from '../components/StatCard.jsx';
import Badge from '../components/Badge.jsx';
import Avatar from '../components/Avatar.jsx';

export default function Dashboard({ currentUser, slots, notices, setPage }) {
  // Mock logic to show some widgets based on role
  const todaySlots = slots.filter(s => s.dayIndex === 0);
  const recentNotices = notices.slice(0, 3);
  
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px' }}>Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Here is what's happening at EduSchedule today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard icon="📅" label="Classes Today" value={todaySlots.length} />
        <StatCard icon="📢" label="New Notices" value={notices.length} color="var(--success)" bg="var(--success-l)" />
        <StatCard icon="👥" label="Total Staff" value={5} color="var(--warning)" bg="var(--warning-l)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800 }}>Todays Schedule</h2>
            <button onClick={() => setPage('timetable')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ padding: 20 }}>
            {todaySlots.length === 0 ? (
               <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>No classes scheduled for today.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {todaySlots.map(s => (
                  <div key={s.id} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 12, borderRadius: 12, background: 'var(--bg)' }}>
                     <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary-l)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--primary)', fontSize: 13 }}>P{s.periodIndex + 1}</div>
                     <div>
                       <div style={{ fontWeight: 700, fontSize: 14 }}>Class {s.classId.toUpperCase()}</div>
                       <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Room: {s.room}</div>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800 }}>Recent Notices</h2>
            <button onClick={() => setPage('notices')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
             {recentNotices.map(n => (
                <div key={n.id} style={{ padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                     <div style={{ fontWeight: 700 }}>{n.title}</div>
                     <Badge label={n.type} color={n.type === 'important' ? 'var(--danger)' : 'var(--primary)'} bg={n.type === 'important' ? 'var(--danger-l)' : 'var(--primary-l)'} />
                   </div>
                   <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 12 }}>{n.content}</p>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                     <Avatar initial={n.author[0]} size={24} color="var(--text)" bg="var(--border)" />
                     <span style={{ fontSize: 11, color: 'var(--muted)' }}>{n.author} &bull; {n.date}</span>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
