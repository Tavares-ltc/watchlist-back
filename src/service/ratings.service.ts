import { notFoundError } from "../errors/not-found.error.js";
import { unauthorizedError } from "../errors/unauthorized.error.js";
import { unprocessableError } from "../errors/unprocessable.error.js";
import { ratings_repository } from "../repositories/ratings.repository.js";
import { watchlist_repository } from "../repositories/watchlist.repository.js";

type Rating = {
  user_id: number;
  stars: number;
  comment?: string;
  watchlist_id: number;
};

async function rateMovie(rating: Rating) {
  if (rating.watchlist_id === 0) {
    throw unprocessableError("Watchlist_id cant be 0");
  }

  if (!rating?.comment) {
    rating.comment = "";
  }

  const watchlistData = await watchlist_repository.getWatchlistDataById(
    rating.watchlist_id
  );

  if (!watchlistData) {
    throw notFoundError();
  }

  if (watchlistData.user_id !== rating.user_id) {
    throw unauthorizedError();
  }
  return await ratings_repository.upsertRating(
    rating.watchlist_id,
    rating.stars,
    rating.comment
  );
}

async function removeRating(user_id: number, rating_id: string) {
  if (!rating_id || isNaN(Number(rating_id))) {
    throw unprocessableError();
  }

  const rating = await ratings_repository.getRatingById(Number(rating_id));
  if (rating.watchlist.user_id !== user_id) {
    throw unauthorizedError();
  }
  return await ratings_repository.deleteRatingById(Number(rating_id));
}

async function editRating(user_id: number, rating_id: number, stars: number) {
  const rating = await ratings_repository.getRatingById(rating_id);
  if (rating.watchlist.user_id !== user_id || !rating.watchlist.user_id) {
    throw unauthorizedError();
  }
  return await ratings_repository.updateRating(stars, rating_id);
}

async function editComment(
  user_id: number,
  rating_id: number,
  comment: string
) {
  if (!rating_id || !comment) {
    throw unprocessableError();
  }

  const rating = await ratings_repository.getRatingById(rating_id);
  if (rating.watchlist.user_id !== user_id || !rating.watchlist.user_id) {
    throw unauthorizedError();
  }
  return await ratings_repository.updateComment(comment, rating_id);
}

async function listRatingStatistics(user_id: number) {
  const statistics: string[] = (
    await ratings_repository.getUserRatingsStatistics(user_id)
  ).rows;
  return statistics;
}
export const ratings_service = {
  rateMovie,
  removeRating,
  editRating,
  editComment,
  listRatingStatistics,
};
