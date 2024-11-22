import express from "express";
import fs from 'node:fs/promises'
import multer from "multer";
import { createBook } from "./bookController";

const bookRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/tempFiles");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});

bookRouter.post(
  "/",
  upload.fields([
    { name: "bookFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBook
);





export default bookRouter;
