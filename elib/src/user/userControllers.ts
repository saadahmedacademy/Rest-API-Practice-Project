import { NextFunction, Response, Request } from "express";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import asyncHandler from "../utils/asyncHandler";
import { User } from "./user.model";
import { ApiResponse } from "../utils/responseHandler";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    // Check that all fields are present
    if (!name || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    // Check if user with the email already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return next(createHttpError(409, "User with this email already exists"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!createUser) {
      return next(createHttpError(500, "Something went wrong while creating user"));
    }

    // Generate JWT token
    const token = sign(
      { _id: createUser._id },
      config.screte_key! as string, 
      { expiresIn: '7d' , algorithm:"HS256"}
    );

    // Send response with the created user ID and token
    return res.status(201).json(
      ApiResponse(201, "User created successfully", {
        "accessToken": token,
      })
    );
  }
);

const loginUser = asyncHandler(
    async (req, res, next) => {
      const { email, password, name } = req.body;
  
      if (!password || (!email && !name)) {
        return next(createHttpError(400, "Password is required along with either email or name"));
      }
  
      // Find user by email or name
      const user = await User.findOne({
        $or: [{ email }, { name }],
      });
  
      if (!user) {
        return next(createHttpError(401, "Invalid email or password"));
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid =  bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(createHttpError(401, "Invalid email or password"));
      }
  
      // Send successful response with the user data
      res.status(200).json(
        ApiResponse(200, "User login successful", user)
      );
    }
  );
  


export { registerUser ,loginUser};