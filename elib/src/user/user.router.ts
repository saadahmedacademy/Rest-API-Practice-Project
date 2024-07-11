import express from 'express';
import { registerUser } from './userControllers';

// create user routes
const userRouter = express.Router();

userRouter.post('/register',registerUser);


export default userRouter;