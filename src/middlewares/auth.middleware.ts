import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { unauthorizedRequestResponse } from "../utils/response.handler.js";
import { auth_repository } from "../repositories/auth.repository.js";
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
    const user_id = Number(decoded.user_id);
    const userToken = await auth_repository.getUserSessionToken(user_id);
    if (!userToken || token !== userToken.token) {
      return unauthorizedRequestResponse(res);
    }
    res.locals.user_id = user_id;

    next();
  } catch (error) {
    return unauthorizedRequestResponse(res);
  }
}

export default checkAuthorization;
