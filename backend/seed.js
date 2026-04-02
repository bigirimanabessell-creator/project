import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eduschedule';

const ROLES = [
  { id: 'h1', name: 'Principal Amina Keza', email: 'principal@school.rw', avatar: 'AK', role: 'headTeacher', password: 'password123' },
  { id: 't1', name: 'Dr. Sarah Uwimana', email: 'sarah@school.rw', avatar: 'SU', role: 'teacher', subjectId: 's1', classId: 'c1', password: 'password123' },
  { id: 't2', name: 'Mr. Jean Claude', email: 'jean@school.rw', avatar: 'JC', role: 'teacher', subjectId: 's2', password: 'password123' },
  { id: 't3', name: 'Ms. Alice Mutoni', email: 'alice@school.rw', avatar: 'AM', role: 'teacher', subjectId: 's5', password: 'password123' },
  { id: 'st1', name: 'Emmanuel Nziza', email: 'stu1@school.rw', avatar: 'EN', role: 'student', classId: 'c1', password: 'password123' },
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding data...');
    
    // Clear existing users
    await User.deleteMany({});
    
    // Insert new users
    await User.insertMany(ROLES);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to seed database', err);
    process.exit(1);
  });
