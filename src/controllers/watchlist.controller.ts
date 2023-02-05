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
  conflictResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
  unprocessableRequestResponse,
} from "./controller.helper.js";
import { getMovieData } from "../utils/themoviedb.js";
import { deleteRatingByWathlistId } from "../repositories/ratings.repository.js";
import { validateDataBySchema } from "../middlewares/validate_schema.middleware.js";
import { movie_schema } from "../schemas/watchlist.schema.js";
import { getUserData } from "../repositories/auth.repository.js";

async function listMoviesWatchlist(req: Request, res: Response) {
  let user_id = Number(req.query.user_id);
  if (!user_id) {
    user_id = Number(res.locals.user_id);
  }
  let page = 0;
  if (req.query.page) {
    page = Number(req.query.page);
  }

  if (!user_id) {
    return badRequestResponse(res);
  }

  try {
    const movies = await getUserWatchlist(user_id);
    movies.forEach(movie => movie.genres = JSON.parse(movie.genres))
    if (!movies) {
      return notFoundRequestResponse(res);
    }
    const {id, name, image, created_at} = await getUserData(user_id)
    const moviesWithUserData = {movies, userData: {name, image, id, created_at}}
    okResponse(res, moviesWithUserData);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function addMovieToList(req: Request, res: Response) {
  const errors: string[] | false = validateDataBySchema(req.body, movie_schema);
  if (errors) return unauthorizedRequestResponse(res, errors);

  const { user_id } = res.locals;
  const noPosterImage =
    "https://www.sda.pf/wp-content/themes/dt-the7/images/noimage.jpg";

  const TMDB_movie_id: string = req.body.movie_id;

  try {
    const movie = await isOnWatchlist(Number(TMDB_movie_id), Number(user_id));
    if (movie) return conflictResponse(res);
    const movieData = await getMovieData(TMDB_movie_id);
    if (!movieData) return notFoundRequestResponse(res);

    const { title, overview, release_date, genres } = movieData.data;
    const genresArray = []
    genres.forEach((genre)=> genresArray.push(genre.name))
    const genresString = JSON.stringify(genresArray);
    let { poster_path } = movieData.data;
    if (!poster_path) poster_path = noPosterImage;
    await insertMovieOnWatchlist(
      Number(TMDB_movie_id),
      title,
      poster_path,
      overview,
      release_date,
      Number(user_id),
      genresString,
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
    const movie = await isOnWatchlist(Number(TMDB_movie_id), user_id);
    if (!movie) return notFoundRequestResponse(res);
    deleteRatingByWathlistId(movie.id);
    removeMovieFromList(Number(TMDB_movie_id), user_id);
    okResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

async function listFavoritesMovies(req: Request, res: Response) {
  let user_id = Number(req.params.user_id);
  if (!user_id) {
    user_id = Number(res.locals);
  }
  if (!user_id) {
    return unprocessableRequestResponse(res);
  }
  try {
    const favoriteMovies = (await get5starsMovies(user_id)).rows;
    if (!favoriteMovies) okResponse(res, []);
    okResponse(res, favoriteMovies);
  } catch (error) {
    notFoundRequestResponse(res);
  }
}

export {
  listMoviesWatchlist,
  addMovieToList,
  removeFromList,
  listFavoritesMovies,
};
