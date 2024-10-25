import express from 'express';
import path from 'node:path';
import multer from 'multer';
import { createBook } from './bookController';

// To upload multiple files

const upload = multer({
    dest: path.resolve(__dirname , "../../public/tempFiles",),
    limits:{fileSize:3e7}
})

// create user routes
const bookRouter = express.Router();
bookRouter.route("/").post(upload.fields([
    {name : "coverImage" , maxCount : 1},
    {name : "bookFile" , maxCount : 1}
]),createBook)

export default bookRouter;