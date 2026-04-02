export const sampleNotices = [
  {
    id: 'n1',
    title: 'End of Term Exams Schedule',
    content: 'The final examinations will commence on the 15th of next month. Please ensure all syllabuses are covered.',
    date: new Date().toISOString().split('T')[0],
    author: 'Principal Amina Keza',
    type: 'important'
  },
  {
    id: 'n2',
    title: 'Science Fair Preparations',
    content: 'All science teachers are requested to submit their project lists by this Friday.',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    author: 'Dr. Sarah Uwimana',
    type: 'info'
  },
  {
    id: 'n3',
    title: 'Parent-Teacher Meeting',
    content: 'The termly parent-teacher meeting is scheduled for next Saturday at 9:00 AM in the main hall.',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    author: 'Admin Office',
    type: 'event'
  }
];
