import { getTMDBMovies } from "../utils/themoviedb.js";
import { Request, Response } from "express";

async function listMovies(req: Request, res: Response) {
  try {
    let movies = await getTMDBMovies();
    return res.send(movies.data);
  } catch (error) {
    res.send(error.message);
  }
}

export { listMovies };
