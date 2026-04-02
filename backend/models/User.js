import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, enum: ['headTeacher', 'teacher', 'student'], required: true },
  password: { type: String, required: true }, // Simple password field (not hashed for demo simplicity, but in prod would be)
  
  // Role-specific fields
  subjectId: { type: String }, // For teachers
  classId: { type: String }    // For teachers or students
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
