import { NextFunction, Response, Request } from "express";
import asyncHandler from "../utils/asyncHandler";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      console.log("token", token);

      if (!token) {
        return next(
          createHttpError(401, "unauthorized user and token not found")
        );
      }
      
      const decodedToken = verify(token, config.screte_key as string);
      console.log("decodedTokem", decodedToken);

      if (!decodedToken) {
        return res.status(401).json({
          message: "Invalid token or user anauthorized",
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        message: "somthing went wrong while getting accessToken",
        error,
      });
    }
  }
);

export default authenticate;
