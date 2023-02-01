import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
import { signup_schema, signin_schema } from "../schemas/auth.schema.js";
import { validateDataBySchema } from "../middlewares/validate_schema.middleware.js";
import { prisma } from "../config/database.js";

async function signup(req: Request, res: Response) {
    const errors: string[] | false = validateDataBySchema(
        req.body,
        signup_schema
    );
    if (errors) return unauthorizedRequestResponse(res, errors);
    const { name, email, password, image } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {
        const emailExists = await getUserByEmail(email);
        if (emailExists) {
            return conflictResponse(res);
        }
        createUser(name, email, encryptedPassword, image);
        createdResponse(res);
    } catch (error) {
        serverErrorResponse(res, error.message);
    }
}

async function signin(req: Request, res: Response) {
    const errors: string[] | false = validateDataBySchema(
        req.body,
        signin_schema
    );
    if (errors) return unauthorizedRequestResponse(res, errors);

    const { password, email } = req.body;
    try {
        const user = await getUserByEmail(email);

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
        okResponse(res, { name: user.name, image: user.image, token: token });
    } catch (error) {
        serverErrorResponse(res, error.message);
    }
}

export { signup, signin};
