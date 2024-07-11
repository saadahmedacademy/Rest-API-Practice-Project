import { NextFunction, Response ,Request } from "express";
import createHttpError from 'http-errors';
const registerUser = async (req:Request, res:Response, next:NextFunction)=>{
    // User Validation
    const {name, email, password} = req.body;

    // To checks all fileds are not empty
    if(!name || !email || !password){
        const error =  createHttpError(400,"All fields are required");
        return next(error)
    }
}

export {registerUser}