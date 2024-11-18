import createHttpError from "http-errors";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Response, Request } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";

const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Files received:", req.files);  // Check if bookFile exists here

    try {
        const files = req.files as { [key: string]: Express.Multer.File[] };

        // Check if required files are uploaded
        if (!files.coverImage) {
            return next(createHttpError(400, "cover image  are required"));
        }
        else if (!files || !files["bookFile"] || files["bookFile"].length === 0) {
            return next(createHttpError(400, "book file are required"));
        }
       
        // Process cover image
        const coverImage = files.coverImage[0];
        const coverImagePath = path.resolve(__dirname, "../../public/tempFiles", coverImage.filename);

        const uploadCoverImage = await cloudinary.uploader.upload(coverImagePath, {
            folder: 'book-cover',
            format: coverImage.mimetype.split("/").pop()
        });

        // Process book file
        const bookFile = files.bookFile[0];
        const bookFilePath = path.resolve(__dirname, "../../public/tempFiles", bookFile.filename);

        const uploadBookFile = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            folder: 'book-pdfs',
            format: 'pdf'
        });

        // Response or further logic after upload
        res.status(200).json({
            coverImage: uploadCoverImage.secure_url,
            bookFile: uploadBookFile.secure_url
        });
    } catch (error) {
        next(createHttpError(500, "An error occurred while creating the book"));
    }
});

export { createBook };
