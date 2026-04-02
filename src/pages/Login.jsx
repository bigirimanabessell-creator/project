import { useState } from 'react';

const ROLES = [
  {
    id: 'headTeacher',
    label: 'Head Teacher',
    desc: 'Full access: manage staff, timetables, classes & notices',
    icon: '👨‍💼',
    user: { email: 'principal@school.rw' },
  },
  {
    id: 'teacher',
    label: 'Teacher',
    desc: 'View schedule, post notices, manage your classes',
    icon: '👨‍🏫',
    user: { email: 'sarah@school.rw' },
  },
  {
    id: 'student',
    label: 'Student',
    desc: 'View your timetable, notices and upcoming classes',
    icon: '🧑‍🎓',
    user: { email: 'stu1@school.rw' },
  },
];

export default function LoginPage({ onLogin }) {
  const [selected, setSelected] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const role = ROLES.find((r) => r.id === selected);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: role.user.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error occurred');
      
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1A56DB 0%,#0C35A0 55%,#061F7A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 22,
            background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(12px)',
            border: '2px solid rgba(255,255,255,.28)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, margin: '0 auto 16px',
          }}>🏫</div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>EduSchedule</h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 15, marginTop: 6 }}>
            School Timetable Management System
          </p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(18px)',
          borderRadius: 24, padding: 28, border: '1px solid rgba(255,255,255,.22)',
        }}>
          <p style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            Sign in as
          </p>

          {ROLES.map((r) => (
            <div key={r.id} onClick={() => setSelected(r.id)} style={{
              padding: 16, borderRadius: 14, marginBottom: 10, cursor: 'pointer',
              border: `1.5px solid ${selected === r.id ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.18)'}`,
              background: selected === r.id ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)',
              transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 13, fontSize: 22,
                background: selected === r.id ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
              }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: '#fff' }}>{r.label}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.58)', marginTop: 2 }}>{r.desc}</div>
              </div>
              {selected === r.id && <span style={{ fontSize: 18 }}>✅</span>}
            </div>
          ))}

          {error && <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 8, textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}

          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', padding: '14px', marginTop: 12, fontSize: 15, borderRadius: 14, background: 'rgba(255,255,255,.95)', color: '#1A56DB', justifyContent: 'center', ...(loading ? {opacity: 0.7, cursor: 'not-allowed'} : {}) }}
          >
            {loading ? 'Authenticating...' : 'Continue →'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 10 }}>
            Connects to MongoDB Backend Server
          </p>
        </div>
      </div>
    </div>
  );
}