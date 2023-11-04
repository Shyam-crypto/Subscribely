import express from 'express';
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile, } from '../controller/User.js';
const router = express.Router();

// Route to get a user by ID
router.get('/user/:id', userController.getUserById);

// Route to create a user
router.post('/user', userController.createUser);

export default router;
