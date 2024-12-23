import express from "express";
import multer from "multer";
import { createBook } from "./bookController";
import authenticate from "../middleware/auth.middleware";

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
  limits: { fileSize: 20 * 1024 * 1024 },
});

bookRouter.route("/").post(
  authenticate,
  upload.fields([
    { name: "bookFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBook
);

export default bookRouter;
