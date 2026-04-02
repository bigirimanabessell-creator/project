import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';

export default function Profile({ currentUser, onLogout }) {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.4px' }}>User Profile</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>Manage your account settings.</p>
      </div>

      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
         <div style={{ height: 120, background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-d) 100%)' }} />
         <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ marginTop: -40, marginBottom: 16 }}>
               <Avatar initial={currentUser.avatar} size={88} color="var(--primary)" bg="#fff" />
            </div>
            
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{currentUser.name}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>{currentUser.email}</p>
            
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
               <Badge label={currentUser.role} />
               {currentUser.classId && <Badge label={`Class: ${currentUser.classId.toUpperCase()}`} color="var(--warning)" bg="var(--warning-l)" />}
            </div>

            <button className="btn-danger" onClick={onLogout} style={{ padding: '12px 24px', fontSize: 14, fontWeight: 700 }}>Log Out</button>
         </div>
      </div>
    </div>
  );
}
