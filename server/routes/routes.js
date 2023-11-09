import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.js';
import { validateRegistration, validateLogin } from '../utils/validation.js';
import { verifyToken } from '../middleware/authm.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/logout', logoutUser);

router.get('/protected', verifyToken, (req, res) => {
    // Access the user data from req.user 
    res.status(200).json({ message: 'Access granted to protected route' });
  });


export default router;