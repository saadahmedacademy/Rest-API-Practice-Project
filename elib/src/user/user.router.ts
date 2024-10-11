import express from 'express';
import { loginUser, registerUser } from './userControllers';

// create user routes
const userRouter = express.Router();

// To register a new user
userRouter.route('/register').post(registerUser);
// To login a user
userRouter.route('/login').post(loginUser);

export default userRouter;