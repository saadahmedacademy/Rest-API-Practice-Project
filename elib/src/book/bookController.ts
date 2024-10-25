import createHttpError from "http-errors";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";


const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.file",req.files);
 try {
     
    const files = req.files as { [filename: string]: Express.Multer.File[] };

    if (!files.coverImage || !files.coverImage[0]) {
        return next(createHttpError(400, "Cover image file is required"));
    }
    
    const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, "../../public/tempFiles", fileName);
    
    // Upload the cover image to Cloudinary
    const uploadCoverImage = await cloudinary.uploader.upload(filePath, {
        filename_override: fileName,
        folder: 'book-cover',
        format: coverImageMimeType
    });
    
    if (!files.bookFile || !files.bookFile[0]) {
        return next(createHttpError(400, "Book file is required"));
    }
    
    const bookFileName = files.bookFile[0].filename;
    const bookFilePath = path.resolve(__dirname, "../../public/tempFiles", bookFileName);
    
    // Upload the book file to Cloudinary
    const uploadBook = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: 'raw',
        filename_override: bookFileName,
        folder: 'book-pdfs',
        format: 'pdf'
    });
    

    // if( ){
    //     return next(createHttpError(400, "All fields are required to create book"));
    // }
    // console.log(req.body);
 } catch (error) {
    console.log("something went wrong while creating book",error);
 }
});

export { createBook };