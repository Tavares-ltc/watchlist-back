import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { unauthorizedRequestResponse } from "../controllers/controller.helper.js";
import { getUserSessionToken } from "../repositories/auth.repository.js";

dotenv.config();

async function checkAuthorization(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = String(req.headers?.authorization);
    if (!authorization) return unauthorizedRequestResponse(res);
    const token = authorization.replace("Bearer ", "");
  interface JwtPayload {
    user_id: string;
  }

  try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;
      const user_id = decoded.user_id;
    
      const userToken = (await getUserSessionToken(user_id)).rows[0];
      if (token !== userToken.token) {
          return unauthorizedRequestResponse(res);
      }

      res.locals.user_id = user_id;
      next();
  } catch (error) {
      return unauthorizedRequestResponse(res);
  }
}

export default checkAuthorization;
