import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Mock Login Route
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Simplistic auth logic for demo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        subjectId: user.subjectId,
        classId: user.classId
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
