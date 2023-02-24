import {Response} from "express";
import { QueryResultRow } from "pg";

const STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    UNPROCESSABLE_ENTITY: 422,
    BAD_REQUEST: 400,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    CONFLICT: 409
});
  
const STATUS_TEXT = Object.freeze({
    OK: "ok",
    CREATED: "created",
    UNPROCESSABLE_ENTITY: "unprocessable entity",
    BAD_REQUEST: "bad request",
    SERVER_ERROR: "internal server error",
    NOT_FOUND: "not found",
    UNAUTHORIZED: "unauthorized",
    CONFLICT: "conflict"
});
  
function badRequestResponse(res: Response, text = STATUS_TEXT.BAD_REQUEST) {
    return res.status(STATUS_CODE.BAD_REQUEST).send(text);
}
  
function notFoundRequestResponse(res: Response, text = STATUS_TEXT.NOT_FOUND) {
    return res.status(STATUS_CODE.NOT_FOUND).send(text);
}
  
function unprocessableRequestResponse(
    res: Response,
    text = STATUS_TEXT.UNPROCESSABLE_ENTITY
) {
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(text);
}
function okResponse(res: Response, text: string | QueryResultRow = STATUS_TEXT.OK) {
    return res.status(STATUS_CODE.OK).send(text);
}
  
function serverErrorResponse(res: Response, text = STATUS_TEXT.SERVER_ERROR) {
    return res.status(STATUS_CODE.SERVER_ERROR).send(text);
}

function unauthorizedRequestResponse(res: Response, text: string | string[] = STATUS_TEXT.UNAUTHORIZED) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send(text);
}

function conflictResponse(res: Response, text = STATUS_TEXT.CONFLICT) {
    return res.status(STATUS_CODE.CONFLICT).send(text);
}

function createdResponse(res: Response, text = STATUS_TEXT.CREATED) {
    return res.status(STATUS_CODE.CREATED).send(text);
}
  
export {
    badRequestResponse,
    unprocessableRequestResponse,
    notFoundRequestResponse,
    okResponse,
    serverErrorResponse,
    unauthorizedRequestResponse,
    conflictResponse,
    createdResponse
};