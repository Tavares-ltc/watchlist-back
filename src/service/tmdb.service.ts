import { AxiosResponse } from "axios";
import { badRequestError } from "../errors/bad-request.error.js";
import { notFoundError } from "../errors/not-found.error.js";
import { ratings_repository } from "../repositories/ratings.repository.js";
import { tmdb_repository } from "../repositories/tmdb.repository.js";
import { watchlist_repository } from "../repositories/watchlist.repository.js";
import { genresHelper } from "../utils/genres.helper.js";

async function listMovies(
  category: string,
  language: string = "en-US",
  page: number = 1
) {
  const categories = {
    discover: true,
    top_rated: true,
    upcoming: true,
    now_playing: true,
    popular: true,
  };

  if(isNaN(Number(page))){
    throw badRequestError()
  }

  if (!categories[category]) throw badRequestError();

  let movies: AxiosResponse<any, any>;
  if (category === "discover") {
    movies = await tmdb_repository.getDiscoverMovies(language, page);
  } else {
    movies = await tmdb_repository.getTMDBMovies(category, language, page);
  }

  movies.data.results = movies.data.results.filter(
    (data) => data.poster_path !== null
  );
  movies.data.results.map(
    (movie) => (movie.genres = genresHelper(movie.genre_ids))
  );
  return movies.data;
}

async function getMovieDetails(
  user_id: number,
  movie_id: string,
  language: string = "en-US"
) {
  const movieDetails = await tmdb_repository.getMovieData(movie_id, language);

  if (!movieDetails) {
    throw notFoundError();
  }

  const videos = await tmdb_repository.getVideos(movie_id);
  if (videos.data) movieDetails.data.videos = videos.data;

  const watchProviders = await tmdb_repository.getWatchProviders(movie_id);
  if (watchProviders.data)
    movieDetails.data.watchProviders = watchProviders.data;

  const watchlistMovie = await watchlist_repository.isOnWatchlist(
    parseInt(movie_id),
    user_id
  );
  if (watchlistMovie) {
    movieDetails.data.watchlist_id = watchlistMovie.id;
    const rating = await ratings_repository.getRatingByWatchlistId(
      watchlistMovie.id
    );
    movieDetails.data.rating = rating;
  }
  return movieDetails.data;
}

async function listMoviesByName(
  query: string,
  language: string = "en-US",
  page: number = 1
) {

  const movies = await tmdb_repository.searchMovieByName(page, language, query);
  movies.data.results = movies.data.results.filter(
    (data) => data.poster_path !== null
  );
  movies.data.results.map(
    (movie) => (movie.genres = genresHelper(movie.genre_ids))
  );
  return movies.data;
}
export const tmdb_service = {
  listMovies,
  getMovieDetails,
  listMoviesByName,
};
