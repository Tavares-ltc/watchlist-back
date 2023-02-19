import { auth_repository } from "../repositories/auth.repository.js";

import { conflictError } from "../errors/conflict.error.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import {
  conflictResponse,
  createdResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
} from "../utils/response.handler.js";
import { signup_schema, signin_schema } from "../schemas/auth.schema.js";
import { validateDataBySchema } from "../utils/schema_validation.helper.js";
import auth_service from "../service/auth.service.js";

async function signup(req: Request, res: Response) {
  const { name, email, password, image } = req.body;
  const userData = { name, email, password, image };

  try {
    const user = await auth_service.signup(userData);
    return createdResponse(res);
  } catch (error) {
    if(error.name === "ConflictError") {
      return conflictResponse(res, error.message)
    }
    serverErrorResponse(res, error.message);
  }
}

async function signin(req: Request, res: Response) {
  const {email, password} = req.body;

  try {
    const userData = await auth_service.signin(email, password)
    okResponse(res, userData);
    
  } catch (error) {
    if(error.name === "UnauthorizedError"){
    return unauthorizedRequestResponse(res, error.message);
    }
    serverErrorResponse(res, error.message);
  }
}

export { signup, signin };
