import { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";
import ApiError from "../shared/apiError";
import { jwtFunctions } from "../shared/jwt";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization?.split(" ")[1];
      console.log("token from auth.ts file backend: ", token);
      if (!token) {
        throw new ApiError(400, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;
      verifiedUser = jwtFunctions.verifyToken(token);
      (req as any).user = verifiedUser; // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(400, "You are not authorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
