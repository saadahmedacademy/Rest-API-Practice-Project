import createHttpError from "http-errors";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";


const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.files);
    console.log("I'm ready to create book");
    // if( ){
    //     return next(createHttpError(400, "All fields are required to create book"));
    // }
    // console.log(req.body);
});

export { createBook };