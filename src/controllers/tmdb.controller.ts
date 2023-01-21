import { getTMDBMovies } from "../utils/themoviedb.js";
import { Request, Response } from "express";
import { okResponse } from "./controller.helper.js";

async function listMovies(req: Request, res: Response) {
    let page = Number(req.query?.page);
    if(!page) page = 1;
    let language = String(req.query?.language);
    if(!language) language = "en-US";
    try {
        const movies = await getTMDBMovies(page, language);
        okResponse(res, movies.data);
    } catch (error) {
        res.send(error.message);
    }
}

export { listMovies };
