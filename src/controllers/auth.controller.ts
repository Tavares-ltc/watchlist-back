import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  sessionUpsert,
} from "../repositories/auth.repository.js";
import {
  conflictResponse,
  createdResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
} from "./controller.helper.js";

dotenv.config();

async function signup(req: Request, res: Response) {
  const { name, email, password, image } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  try {
    const emailExists = await getUserByEmail(email);
    if (emailExists.rows.length > 0) {
      return conflictResponse(res);
    }

    createUser(name, email, encryptedPassword, image);
    createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function signin(req: Request, res: Response) {
  const { password, email } = req.body;

  try {
    const user = (await getUserByEmail(email)).rows[0];

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return unauthorizedRequestResponse(res);
    }
    const token = jwt.sign(
      {
        user_id: user.id,
      },
      process.env.TOKEN_SECRET
    );

    sessionUpsert(user.id, token);
    okResponse(res, {token: token});
  } catch (error) {
    serverErrorResponse(res, error.message)
  }
}

export { signup, signin };
