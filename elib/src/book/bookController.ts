import createHttpError from "http-errors";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import fs from "node:fs/promises";
import { Book } from "./book.model";

const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { title, genre } = req.body;

    const files = req.files as { [key: string]: Express.Multer.File[] };

    // Validate required files
    if (!files?.coverImage || !files?.bookFile) {
        throw createHttpError(400, "Both 'coverImage' and 'bookFile' are required.");
    }

    const coverImage = files.coverImage[0];
    const bookFile = files.bookFile[0];

    const coverImagePath = path.resolve(__dirname, "../../public/tempFiles", coverImage.filename);
    const bookFilePath = path.resolve(__dirname, "../../public/tempFiles", bookFile.filename);

    try {
        // Parallel upload to Cloudinary
        const [uploadCoverImage, uploadBookFile] = await Promise.all([
            cloudinary.uploader.upload(coverImagePath, { folder: "book-cover" }),
            cloudinary.uploader.upload(bookFilePath, { resource_type: "raw", folder: "book-pdfs" ,format:"pdf"}),
        ]);

       
         //To upload the cloudinary's url on database
         const newBook = await Book.create({
            title ,
            genre ,
            author:"66f960978e49d42a4bacd8a4",
            coverImage:uploadCoverImage.secure_url,
            bookFile:uploadBookFile.secure_url
         });

         if(!newBook){
          next(createHttpError(400 ,"error while createing newBook model in database"))
         }

        res.status(200).json({
            message:"newBook moder created successfully",
            coverImageUrl: uploadCoverImage.secure_url,
            bookFileurl: uploadBookFile.secure_url,
        });
    } catch (error) {
        // Pass the error to the global error handler
        next(createHttpError(500, "Error while createing book and uploading files"));
    } finally {
        // Cleanup: Remove temporary files
        await Promise.allSettled([
            fs.unlink(coverImagePath),
            fs.unlink(bookFilePath),
        ]);
    }
});

export { createBook };
