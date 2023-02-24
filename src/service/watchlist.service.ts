import { badRequestError } from "../errors/bad-request.error.js";
import { conflictError } from "../errors/conflict.error.js";
import { notFoundError } from "../errors/not-found.error.js";
import { auth_repository } from "../repositories/auth.repository.js";
import { ratings_repository } from "../repositories/ratings.repository.js";
import { tmdb_repository } from "../repositories/tmdb.repository.js";
import { watchlist_repository } from "../repositories/watchlist.repository.js";

async function listWatchlistMovies(
  user_id_from_user: number,
  selected_user_id?: number
) {
  let user_id = user_id_from_user;
  if (selected_user_id) {
    user_id = selected_user_id;
  }

  if (!user_id) {
    throw badRequestError();
  }

  const movies = await watchlist_repository.getUserWatchlist(user_id);
  movies.forEach((movie) => (movie.genres = JSON.parse(movie.genres)));
  if (!movies) {
    throw notFoundError();
  }
  const { id, name, image, created_at } = await auth_repository.getUserData(
    user_id
  );
  const moviesWithUserData = {
    movies,
    userData: { name, image, id, created_at },
  };
  return moviesWithUserData;
}

async function addMovieToList(user_id: number, TMDB_movie_id: string) {
  const noPosterImage =
    "https://www.sda.pf/wp-content/themes/dt-the7/images/noimage.jpg";

  const watchlistMovie = await watchlist_repository.isOnWatchlist(
    Number(TMDB_movie_id),
    Number(user_id)
  );
  if (watchlistMovie) throw conflictError("Movie already on your watchlist");
  const movieData = await tmdb_repository.getMovieData(TMDB_movie_id);
  if (!movieData) throw notFoundError();

  const { title, overview, release_date, genres } = movieData.data;
  const genresArray = [];

  genres.forEach((genre) => genresArray.push(genre.name));
  const genresString = JSON.stringify(genresArray);

  let { poster_path } = movieData.data;
  if (!poster_path) poster_path = noPosterImage;

  return await watchlist_repository.insertMovieOnWatchlist(
    Number(TMDB_movie_id),
    title,
    poster_path,
    overview,
    release_date,
    Number(user_id),
    genresString
  );
}

async function removeFromList(user_id: number, TMDB_movie_id: string) {
  const watchlistMovie = await watchlist_repository.isOnWatchlist(
    Number(TMDB_movie_id),
    Number(user_id)
  );
  if (!watchlistMovie) throw notFoundError();
  const rating = await ratings_repository.getRatingByWatchlistId(
    Number(watchlistMovie.id)
  );


  if (rating?.id) {
    await ratings_repository.deleteRatingById(rating.id);
  }

  return await watchlist_repository.removeMovieFromList(
    Number(TMDB_movie_id),
    Number(user_id)
  );
}

async function listFavoritesMovies(
  user_id_from_user: number,
  selected_user_id?: number
) {
  let user_id = user_id_from_user;
  if (selected_user_id) {
    user_id = selected_user_id;
  }
  const favoriteMovies = (await watchlist_repository.get5starsMovies(user_id))
    .rows;
  if (!favoriteMovies) {
    return [];
  }
  return favoriteMovies;
}

export const watchlist_service = {
  listWatchlistMovies,
  addMovieToList,
  removeFromList,
  listFavoritesMovies
};
