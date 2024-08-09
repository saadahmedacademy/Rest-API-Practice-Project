import { NextFunction, Response, Request } from "express";
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt'
import asyncHandler from "../utils/asyncHandler";
import { User } from "./user.model";
import { ApiResponse } from "../utils/responseHandler";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";


const registerUser = (asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        // To register the user
        const { name, email, password } = req.body;

        // To checks all fileds are not empty
        if (!name || !email || !password) {
            const error = createHttpError(400, "All fields are required");
            throw next(error)
        }

        const existedUser = await User.findOne({ email })

        if (existedUser) {
            throw next(createHttpError(409, "User with email already exists"))
        }
        

        // To hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // To create the user
        const createUser = await User.create({
            name,
            email,
            password : hashedPassword
        });

        if (!createUser) {
            throw next(createHttpError(500, "Shomthing went wrong while creating user"))
        }
        
        // To generate the jwt token
        const token = sign({_id: createUser._id}, config.screte_key! as string, {expiresIn: '7d'});

        // To send the response
        res.status(201).json(
            ApiResponse(
                200,
                "User created successfully",
                 createUser._id
            )
        );

    }
));


const loginUser = (asyncHandler(
    async (req, res, next) => {
        // User Validation
        const { email, password, name } = req.body;

        if (!password && (!email || !name)) {
            throw next(createHttpError(400, "password is must and and give one of email or name"));
        }

        // To find the user by email or name
        const user = await User.findOne({
            $or: [{ email }, { name }]
        });

        // To verify the user
        if (!user) {
            throw next(createHttpError(401, "User email or password is not correct "));
        };

        // To compar the password
        if (user.password !== password) {
            throw next(createHttpError(401, "User email or password is not correct "));
        };
       
        // To send the response 
        res.status(200).json(
            ApiResponse(
                200,
                "User login successfully",
                user
            )
        );

    }))
export { registerUser }