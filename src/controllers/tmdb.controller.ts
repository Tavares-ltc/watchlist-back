import { Request, Response } from "express";
import {
  badRequestResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
} from "../utils/response.handler.js";
import { tmdb_service } from "../service/tmdb.service.js";

async function listMovies(req: Request, res: Response) {
  const { category } = req.params;
  const page = Number(req.query?.page);
  const language = String(req.query?.language);

  try {
    const movies = await tmdb_service.listMovies(category, language, page);
    okResponse(res, movies);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return badRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

async function getMovieDetails(req: Request, res: Response) {
  const { user_id } = res.locals;
  const { movie_id } = req.params;

  const language = String(req.query?.language);

  try {
    const movieDetails = await tmdb_service.getMovieDetails(
      user_id,
      movie_id,
      language
    );
    okResponse(res, movieDetails);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return notFoundRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}

async function listMoviesByName(req: Request, res: Response) {
  let page = Number(req.query?.page);
  let language = String(req.query?.language);
  const query = String(req.query?.query);
  try {
    const movies = await tmdb_service.listMoviesByName(query, language, page);
    okResponse(res, movies);
  } catch (error) {
    serverErrorResponse(res);
  }
}
export { listMovies, getMovieDetails, listMoviesByName };
