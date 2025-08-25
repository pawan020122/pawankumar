import express from 'express';
import { registerUser,loginUser, getAllUsers } from '../controllers/userControllers.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/get-users', verifyToken, getAllUsers);

export default userRouter; 