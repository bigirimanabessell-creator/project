export const schoolClasses = [
  { id: 'c1', name: 'Grade 10 - A' },
  { id: 'c2', name: 'Grade 10 - B' },
  { id: 'c3', name: 'Grade 11 - Sci' },
  { id: 'c4', name: 'Grade 12 - Arts' }
];

export const teachers = [
  { id: 't1', name: 'Dr. Sarah Uwimana', email: 'sarah@school.rw', subjectId: 's1' },
  { id: 't2', name: 'Mr. Jean Claude', email: 'jean@school.rw', subjectId: 's2' },
  { id: 't3', name: 'Ms. Alice Mutoni', email: 'alice@school.rw', subjectId: 's5' },
  { id: 't4', name: 'Mr. Eric Nkurunziza', email: 'eric@school.rw', subjectId: 's3' },
  { id: 't5', name: 'Mrs. Chantal Kamanzi', email: 'chantal@school.rw', subjectId: 's4' }
];

export const teacherById = (id) => teachers.find(t => t.id === id) || teachers[0];
