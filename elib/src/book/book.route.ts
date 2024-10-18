import express from 'express';
import { createBook } from './bookController';
import { upload } from '../middleware/multer';

// create user routes
const bookRouter = express.Router();
bookRouter.route("/").post(createBook)
export default bookRouter;