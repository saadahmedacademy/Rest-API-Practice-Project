import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler";
import { User } from "./user.model";
import { ApiResponse } from "../utils/responseHandler";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { userSchema } from "./userTypes";

const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Check that all fields are present
    if (!name || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }
    try {
      // Check if user with the email already exists
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        return next(
          createHttpError(409, "User with this email already exists")
        );
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const createUser: userSchema = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (!createUser) {
        return next(
          createHttpError(500, "Something went wrong while creating user")
        );
      }

      // Generate JWT token
      const token = sign(
        { _id: createUser._id },
        config.screte_key! as string,
        { expiresIn: "7d", algorithm: "HS256" }
      );

      // Send response with the created user ID and token
      return res.status(201).json(
        ApiResponse(201, "User created successfully", {
          accessToken: token,
        })
      );
    } catch (error) {
      return next(createHttpError(500, "Something went wrong whle registering user" + error));
    }
  }
);

const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  const { email, password } = req.body;
  if(!email || !password){
    
    return next(
      createHttpError(
        400,
        "Email and password are required to login. Please provide email and password"
      )
    );
  }
  try {

    // Check if user with the email already exists
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return next(createHttpError(40, "Invalid user email to login or user not found"));
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, existedUser.password);

    if (!isMatch) {
      return next(createHttpError(401, "Invalid user password to login or user not found"));
    }
     
   
      // Generate JWT token
      const token = sign(
        { _id: existedUser._id },
        config.screte_key! as string,
        { expiresIn: "7d", algorithm: "HS256" }
      );

      // Send response with the created user ID and token
      return res.json(
        ApiResponse(201,"User login successfully ",{
          accessToken:token
        })
      );
    
  } catch (error) {
    return next(createHttpError(500, "Something went wrong while login user" + error));
  }
});

export { registerUser, loginUser };