import mongoose , { Schema } from "mongoose";
import { BookType } from "./bookType";

const bookSchema = new Schema<BookType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    }
    ,
    bookFile: { 
        type: String,
        required: true
    }
},
    { timestamps: true });


export const Book = mongoose.model<BookType>('Book', bookSchema);