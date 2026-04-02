export const subjects = [
  { id: 's1', name: 'Mathematics', icon: '📐', color: '#3b82f6', bg: '#eff6ff' },
  { id: 's2', name: 'Physics', icon: '⚡', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 's3', name: 'Chemistry', icon: '🧪', color: '#10b981', bg: '#ecfdf5' },
  { id: 's4', name: 'Biology', icon: '🧬', color: '#f59e0b', bg: '#fffbeb' },
  { id: 's5', name: 'Literature', icon: '📚', color: '#ef4444', bg: '#fef2f2' },
  { id: 's6', name: 'Geography', icon: '🌍', color: '#6366f1', bg: '#e0e7ff' },
];

export const subjectById = (id) => subjects.find(s => s.id === id) || subjects[0];
