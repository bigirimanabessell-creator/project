import { useState } from 'react';
import Badge from '../components/Badge.jsx';

export default function Notices({ currentUser, notices, setNotices }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: 'info' });

  const isTeacherOrHead = currentUser.role === 'teacher' || currentUser.role === 'headTeacher';

  const addNotice = () => {
    if (!form.title || !form.content) return alert('Please fill all fields');
    setNotices([{ 
      id: `n${Date.now()}`, 
      ...form, 
      author: currentUser.name, 
      date: new Date().toISOString().split('T')[0] 
    }, ...notices]);
    setShowAdd(false);
    setForm({ title: '', content: '', type: 'info' });
  };

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.4px' }}>Notice Board</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>School announcements and important updates</p>
        </div>
        {isTeacherOrHead && (
          <button className="btn-primary" onClick={() => setShowAdd(true)}>+ New Notice</button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {notices.map(n => (
          <div key={n.id} className="card" style={{ padding: 24 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
               <h2 style={{ fontSize: 18, fontWeight: 800 }}>{n.title}</h2>
               <Badge label={n.type} color={n.type === 'important' ? 'var(--danger)' : 'var(--primary)'} bg={n.type === 'important' ? 'var(--danger-l)' : 'var(--primary-l)'} />
             </div>
             <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.6, marginBottom: 16 }}>{n.content}</p>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>By {n.author}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{n.date}</div>
             </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal-box">
            <h2 className="modal-title">Post New Notice</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
               <div>
                  <label className="field-label">Title</label>
                  <input className="field-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Announcement Title" />
               </div>
               <div>
                  <label className="field-label">Type</label>
                  <select className="field-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                     <option value="info">Information</option>
                     <option value="event">Event</option>
                     <option value="important">Important Action Required</option>
                  </select>
               </div>
               <div>
                  <label className="field-label">Content</label>
                  <textarea className="field-input" value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{ minHeight: 100, paddingTop: 12 }} placeholder="Details of the notice..." />
               </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn-primary" onClick={addNotice} style={{ flex: 2, justifyContent: 'center' }}>Post Notice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
