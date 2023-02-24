import { watchlist_repository } from "../repositories/watchlist.repository.js";
import { Request, Response } from "express";
import {
  badRequestResponse,
  conflictResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
  unprocessableRequestResponse,
} from "../utils/response.handler.js";
import { ratings_repository } from "../repositories/ratings.repository.js";
import { watchlist_service } from "../service/watchlist.service.js";

async function listWatchlistMovies(req: Request, res: Response) {
  const chosed_user_id = Number(req.query.user_id);
  const user_id = Number(res.locals.user_id);
  try {
    const moviesWithUserData = await watchlist_service.listWatchlistMovies(
      user_id,
      chosed_user_id
    );
    okResponse(res, moviesWithUserData);
  } catch (error) {
    if (error.name === "BadRequestError") {
      return badRequestResponse(res);
    }
    if (error.name === "NotFoundError") {
      return notFoundRequestResponse(res);
    }
    serverErrorResponse(res, error.message);
  }
}

async function addMovieToList(req: Request, res: Response) {
  const { user_id } = res.locals;
  const TMDB_movie_id: string = req.body.movie_id;

  try {
    await watchlist_service.addMovieToList(user_id, TMDB_movie_id);
    okResponse(res);
  } catch (error) {
    if (error.name === "ConflictError") {
      return conflictResponse(res);
    }
    if (error.name === "NotFoundError") {
      return notFoundRequestResponse(res);
    }
    if (error.name === "UnprocessableError"){
      return unprocessableRequestResponse(res)
    }
    serverErrorResponse(res, error.message);
  }
}

async function removeFromList(req: Request, res: Response) {
  const { user_id } = res.locals;
  const TMDB_movie_id = req.params.movie_id;
  try {
    await watchlist_service.removeFromList(user_id, TMDB_movie_id);
    okResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function listFavoritesMovies(req: Request, res: Response) {
  const user_id = Number(res.locals);

  const chosed_user_id = Number(req.params.user_id);

  try {
    const favoriteMovies = await watchlist_service.listFavoritesMovies(
      user_id,
      chosed_user_id
    );
    okResponse(res, favoriteMovies);
  } catch (error) {
    notFoundRequestResponse(res);
  }
}

export {
  listWatchlistMovies,
  addMovieToList,
  removeFromList,
  listFavoritesMovies,
};
