
import { useState } from 'react';
import Badge from '../components/Badge.jsx';
import { subjectById, subjects } from '../data/subjects.js';
import { teacherById, teachers, schoolClasses } from '../data/teachers.js';
import { DAYS, PERIODS, PERIOD_LABELS } from '../data/timetable.js';

export default function Timetable({ currentUser, slots, setSlots }) {
  const [selClass, setSelClass] = useState('c1');
  const [view, setView]         = useState('grid');
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm] = useState({ dayIndex: 0, periodIndex: 0, subjectId: 's1', teacherId: 't1', room: 'R101' });

  const isHead    = currentUser.role === 'headTeacher';
  const filtered  = slots.filter((s) => s.classId === selClass);
  const getSlot   = (d, p) => filtered.find((s) => s.dayIndex === d && s.periodIndex === p);
  const deleteSlot = (id) => setSlots(slots.filter((s) => s.id !== id));

  const addSlot = () => {
    if (filtered.find((s) => s.dayIndex === form.dayIndex && s.periodIndex === form.periodIndex)) {
      alert('A period already exists there. Delete it first.'); return;
    }
    setSlots([...slots, { ...form, id: `sl${Date.now()}`, classId: selClass }]);
    setShowAdd(false);
  };

  const sel = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-.4px' }}>Timetable</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>Weekly schedule — {schoolClasses.find(c=>c.id===selClass)?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* View toggle */}
          <div style={{ display: 'flex', gap: 3, background: 'var(--bg)', borderRadius: 10, padding: 3, border: '1px solid var(--border)' }}>
            {[['grid','📊 Grid'],['list','📋 List']].map(([v,l]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: view===v ? 'var(--primary)' : 'transparent', color: view===v ? '#fff' : 'var(--muted)', fontWeight: 700, fontSize: 12, transition: 'all .18s' }}>{l}</button>
            ))}
          </div>
          {isHead && <button className="btn-primary" onClick={() => setShowAdd(true)}>+ Add Period</button>}
        </div>
      </div>

      {/* Class tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {schoolClasses.map((c) => (
          <button key={c.id} onClick={() => setSelClass(c.id)} style={{ padding: '7px 16px', borderRadius: 9, border: `1.5px solid ${selClass===c.id ? 'var(--primary)' : 'var(--border)'}`, background: selClass===c.id ? 'var(--primary)' : '#fff', color: selClass===c.id ? '#fff' : 'var(--text)', fontWeight: 700, fontSize: 12.5, cursor: 'pointer', transition: 'all .18s' }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* ── GRID VIEW ── */}
      {view === 'grid' && (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <table className="data-table" style={{ minWidth: 720 }}>
            <thead>
              <tr>
                <th style={{ width: 88 }}>Period</th>
                {DAYS.map((d) => <th key={d} style={{ textAlign: 'center' }}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period, pi) => (
                <>
                  {pi === 4 && (
                    <tr key="br1">
                      <td colSpan={6} style={{ padding: '7px 16px', background: 'var(--warning-l)', textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: 'var(--warning)', borderBottom: '1px solid var(--border)' }}>
                        ☕ Short Break — 10:15 to 10:30
                      </td>
                    </tr>
                  )}
                  {pi === 7 && (
                    <tr key="br2">
                      <td colSpan={6} style={{ padding: '7px 16px', background: 'var(--success-l)', textAlign: 'center', fontSize: 11.5, fontWeight: 700, color: 'var(--success)', borderBottom: '1px solid var(--border)' }}>
                        🥗 Lunch Break — 12:00 to 13:00
                      </td>
                    </tr>
                  )}
                  <tr key={pi}>
                    <td style={{ padding: '8px 14px' }}>
                      <div style={{ fontWeight: 800, fontSize: 12, color: 'var(--primary)' }}>{PERIOD_LABELS[pi]}</div>
                      <div style={{ fontSize: 10.5, color: 'var(--muted)', marginTop: 1 }}>{period}</div>
                    </td>
                    {DAYS.map((_, di) => {
                      const slot = getSlot(di, pi);
                      const sub  = slot ? subjectById(slot.subjectId) : null;
                      const tea  = slot ? teacherById(slot.teacherId) : null;
                      return (
                        <td key={di} style={{ padding: 6, borderLeft: '1px solid var(--border)', width: `${100/5}%`, verticalAlign: 'top' }}>
                          {slot ? (
                            <div className="tt-cell" style={{ background: sub.bg, borderColor: `${sub.color}22` }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                                <span style={{ fontSize: 14 }}>{sub.icon}</span>
                                <span style={{ fontSize: 11.5, fontWeight: 800, color: sub.color }}>{sub.name}</span>
                              </div>
                              <div style={{ fontSize: 10.5, color: 'var(--muted)' }}>{tea.name.split(' ').pop()}</div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, alignItems: 'center' }}>
                                <span style={{ fontSize: 10, fontWeight: 700, background: `${sub.color}18`, color: sub.color, padding: '1px 6px', borderRadius: 4 }}>{slot.room}</span>
                                {isHead && (
                                  <button onClick={() => deleteSlot(slot.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, color: 'var(--danger)', opacity: .65, padding: 0 }}>✕</button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="tt-cell empty"><span>—</span></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {filtered.sort((a,b)=>a.dayIndex-b.dayIndex||a.periodIndex-b.periodIndex).map((slot) => {
            const sub = subjectById(slot.subjectId);
            const tea = teacherById(slot.teacherId);
            return (
              <div key={slot.id} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 6, height: 48, borderRadius: 3, background: sub.color, flexShrink: 0 }} />
                <div style={{ width: 40, height: 40, borderRadius: 11, background: sub.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{sub.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{sub.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{DAYS[slot.dayIndex]} · {PERIODS[slot.periodIndex]} · {tea.name}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge label={`Room ${slot.room}`} color={sub.color} bg={sub.bg} />
                  <Badge label={schoolClasses.find(c=>c.id===slot.classId)?.name} color="var(--muted)" bg="var(--bg)" />
                  {isHead && <button className="btn-danger" onClick={() => deleteSlot(slot.id)}>Remove</button>}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
              <p style={{ fontWeight: 600, fontSize: 15 }}>No periods for this class</p>
            </div>
          )}
        </div>
      )}

      {/* ── ADD MODAL ── */}
      {showAdd && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal-box">
            <h2 className="modal-title">Add Timetable Period</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="field-label">Day</label>
                <select className="field-select" value={form.dayIndex} onChange={(e) => sel('dayIndex', +e.target.value)}>
                  {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Period</label>
                <select className="field-select" value={form.periodIndex} onChange={(e) => sel('periodIndex', +e.target.value)}>
                  {PERIODS.map((p, i) => <option key={i} value={i}>{PERIOD_LABELS[i]} — {p}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Subject</label>
                <select className="field-select" value={form.subjectId} onChange={(e) => sel('subjectId', e.target.value)}>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label">Teacher</label>
                <select className="field-select" value={form.teacherId} onChange={(e) => sel('teacherId', e.target.value)}>
                  {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label className="field-label">Room</label>
                <input className="field-input" value={form.room} onChange={(e) => sel('room', e.target.value)} placeholder="e.g. R101, Lab1, Gym" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button className="btn-ghost" onClick={() => setShowAdd(false)} style={{ flex: 1 }}>Cancel</button>
              <button className="btn-primary" onClick={addSlot} style={{ flex: 2, justifyContent: 'center' }}>Add Period</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





