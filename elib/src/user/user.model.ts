import mongoose, { Schema } from "mongoose";
import { userSchema } from "./userTypes";

const userSchema = new Schema<userSchema>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    }
},
    { timestamps: true });


export const User = mongoose.model<userSchema>('User', userSchema);