import express,{Request,Response,NextFunction} from 'express'
import createHttpError, { HttpError } from 'http-errors';
import { config } from '../config/config';


const globalErrorHandler = (err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        message:err.message || "Internal Server Error",
        errorStack:config.showError === "development" ? err.stack : ""
    })
}

export {globalErrorHandler}