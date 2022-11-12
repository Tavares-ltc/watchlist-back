import {
  get5starsMovies,
  getUserWatchlist,
  insertMovieOnWatchlist,
  isOnWatchlist,
  removeMovieFromList,
} from "../repositories/watchlist.repository.js";
import { Request, Response } from "express";
import {
  badRequestResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
  unprocessableRequestResponse,
} from "./controller.helper.js";
import { getMovieData } from "../utils/themoviedb.js";
import { deleteRatingByWathlistId } from "../repositories/ratings.repository.js";

async function listMoviesWatchlist(req: Request, res: Response) {
  const { user_id } = req.params;
  let page = 0;
  if (req.query.page) {
    page = Number(req.query.page);
  }

  if (!user_id) {
    return badRequestResponse(res);
  }

  try {
    const movies = await getUserWatchlist(user_id, page);
    if (!movies) {
      return notFoundRequestResponse(res);
    }
    okResponse(res, movies.rows);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function addMovieToList(req: Request, res: Response) {
  const { user_id } = res.locals;
 

  const TMDB_movie_id: string = req.body.movie_id;

  try {
    const movie = (await isOnWatchlist(TMDB_movie_id, user_id)).rows;
    if (movie.length > 0) return okResponse(res, "Already on the list");

    const movieData = await getMovieData(TMDB_movie_id);
    if (!movieData) return notFoundRequestResponse(res);

    const { title, poster_path, overview, release_date } = movieData.data;
    insertMovieOnWatchlist(
      TMDB_movie_id,
      title,
      poster_path,
      overview,
      release_date,
      user_id
    );
    okResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function removeFromList(req: Request, res: Response) {
  const { user_id } = res.locals;
  const TMDB_movie_id = req.params.movie_id;
  try {
    const movie = await isOnWatchlist(TMDB_movie_id, user_id);
    if (!movie) return notFoundRequestResponse(res);
    deleteRatingByWathlistId(movie.rows[0].id)
    removeMovieFromList(TMDB_movie_id, user_id);
    okResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function listFavoritesMovies(req: Request, res: Response){
  const {user_id} = req.params;
  if(!user_id){
    return unprocessableRequestResponse(res);
  }
  try {
    const favoriteMovies = (await get5starsMovies(user_id)).rows
    if(!favoriteMovies) okResponse(res, []);
    okResponse(res, favoriteMovies)
  } catch (error) {
    notFoundRequestResponse(res)
  }
}

export { listMoviesWatchlist, addMovieToList, removeFromList, listFavoritesMovies };
