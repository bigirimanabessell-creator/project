import { useState, useEffect } from 'react';
import { subjects, subjectById } from '../data/subjects.js';
import Avatar from '../components/Avatar.jsx';
import Badge from '../components/Badge.jsx';

export default function Staff({ currentUser }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teachers', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.4px' }}>Staff Directory</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>Contact information for all educators and staff members.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>Loading directory...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {teachers.map(t => {
            const subject = subjectById(t.subjectId) || subjects[0];
            return (
              <div key={t.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                 <Avatar initial={t.name.split(' ').map(n=>n[0]).join('').slice(0,2)} size={72} color={subject.color} bg={subject.bg} />
                 <h3 style={{ fontSize: 16, fontWeight: 800, marginTop: 16 }}>{t.name}</h3>
                 <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>{t.email}</p>
                 <Badge label={subject.name} color={subject.color} bg={subject.bg} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
