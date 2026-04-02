export default function Manage({ currentUser }) {
  return (
     <div className="fade-up">
       <div style={{ marginBottom: 24 }}>
         <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.4px' }}>Manage Data</h1>
         <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>System configuration and batch management.</p>
       </div>
 
       <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
          <h2 style={{ fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>Configuration Settings</h2>
          <p style={{ fontSize: 14 }}>Only head teachers can access these controls. Features under development.</p>
       </div>
     </div>
   );
 }
