import connection from "../database/postgres.js";

async function insertRating(
  watchlist_id: number | string,
  stars: number | string,
  comment: string
) {
  return connection.query(
    `INSERT INTO rating (movie_id, stars, comment) VALUES ($1, $2, $3);`,
    [watchlist_id, stars, comment]
  );
}

async function deleteRatingById(rating_id: number | string) {
  return connection.query(`DELETE FROM rating WHERE id = $1;`, [rating_id]);
}
async function deleteRatingByWathlistId(watchlist_id: number | string) {
  return connection.query(`DELETE FROM rating WHERE movie_id = $1;`, [
    watchlist_id,
  ]);
}

async function updateRating(
  rating_id: number | string,
  stars: number | string
) {
  return connection.query(`UPDATE rating SET stars = $1 WHERE id  = $2;`, [
    stars,
    rating_id,
  ]);
}
async function updateComment(rating_id: number | string, comment: string) {
  return connection.query(`UPDATE rating SETcomment = $1 WHERE id  = $2;`, [
    comment,
    rating_id,
  ]);
}

async function getRatingById(rating_id: number | string) {
  return connection.query(
    `SELECT rating.*, watchlist.user_id FROM rating JOIN watchlist ON watchlist.id = rating.movie_id WHERE rating.id = $1;`,
    [rating_id]
  );
}

async function getRatingByWatchlistId(watchlist_id: number | string) {
  return connection.query(
    `SELECT rating.*, watchlist.user_id FROM rating JOIN watchlist ON watchlist.id = rating.movie_id WHERE movie_id = $1;`,
    [watchlist_id]
  );
}

async function getUserRatingsStatistics(user_id: number | string) {
  return connection.query(
    `SELECT COUNT(rating.id), stars FROM rating JOIN watchlist ON movie_id = watchlist.id WHERE user_id = $1 GROUP BY stars;`,
    [user_id]
  );
}

export {
  insertRating,
  deleteRatingById,
  deleteRatingByWathlistId,
  updateRating,
  updateComment,
  getRatingById,
  getRatingByWatchlistId,
  getUserRatingsStatistics
};
