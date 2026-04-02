// ─── src/App.jsx ──────────────────────────────────────────────────────────────
import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import LoginPage from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Timetable from './pages/Timetable.jsx';
import Notices from './pages/Notices.jsx';
import Staff from './pages/Staff.jsx';
import Manage from './pages/Manage.jsx';
import Reports from './pages/Reports.jsx';
import Profile from './pages/Profile.jsx';
import { sampleNotices } from './data/notices.js';
import { sampleSlots } from './data/timetable.js';

export default function App() {
  const [user, setUser]       = useState(null);
  const [page, setPage]       = useState('Dashboard');
  const [notices, setNotices] = useState(sampleNotices);
  const [slots, setSlots]     = useState(sampleSlots);

  /* ── Login ── */
  if (!user) return <LoginPage onLogin={setUser} />;

  /* ── Page renderer ── */
  const renderPage = () => {
    switch (page) {
      case 'timetable': return <Timetable currentUser={user} slots={slots} setSlots={setSlots} />;
      case 'notices':   return <Notices   currentUser={user} notices={notices} setNotices={setNotices} />;
      case 'staff':     return <Staff     currentUser={user} />;
      case 'manage':    return <Manage    currentUser={user} />;
      case 'reports':   return <Reports   currentUser={user} />;
      case 'profile':   return <Profile   currentUser={user} onLogout={() => { setUser(null); setPage('dashboard'); }} />;
      default:          return <Dashboard currentUser={user} slots={slots} notices={notices} setPage={setPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar page={page} setPage={setPage} currentUser={user} onLogout={() => { setUser(null); setPage('dashboard'); }} />
      <main style={{ flex: 1, padding: '28px', overflowX: 'hidden', overflowY: 'auto', minHeight: '100vh' }}>
        {renderPage()}
      </main>
    </div>
  );
}