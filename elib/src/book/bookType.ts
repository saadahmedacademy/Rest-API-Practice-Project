import { userSchema } from "../user/userTypes"


export interface BookType {
    _id: string
    title: string
    author: userSchema
    genre: string
    coverImage: string
    bookFile: string
    createdAt: Date
    updatedAt: Date
}