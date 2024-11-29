import { NextFunction, Response, Request } from "express";
import asyncHandler from "../utils/asyncHandler";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../user/user.model";

// Extend Express's Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
      };
    }
  }
}

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from cookies or Authorization header
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return next(createHttpError(401, "Unauthorized: Token not provided."));
      }

      // Decode token
      const decodedToken = verify(token, config.screte_key as string);

      // Ensure `_id` exists in the decoded token
      if (typeof decodedToken !== "object" || !decodedToken._id) {
        return next(createHttpError(401, "Unauthorized: Invalid token payload."));
      }

      // Find user by ID
      const userData = await User.findById(decodedToken._id).select("-password");

      if (!userData) {
        return next(createHttpError(401, "Invalid Access Token: User not found"));
      }

      // Assign user to req.user
      req.user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
      };

      // Call next middleware
      next();
    } catch (error) {
      return next(
        createHttpError(400, "Something went wrong during authentication.")
      );
    }
  }
);

export default authenticate;
