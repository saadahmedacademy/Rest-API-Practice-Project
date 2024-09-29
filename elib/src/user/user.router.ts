import express from 'express';
import { registerUser } from './userControllers';

// create user routes
const userRouter = express.Router();

userRouter.route('/register').post(registerUser);

export default userRouter;