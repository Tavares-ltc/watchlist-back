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
  watchlist_id: number | string,
  stars: number | string
) {
  return connection.query(
    `UPDATE rating SET stars = $1 WHERE watchlist_id  = $2;`,
    [stars, watchlist_id]
  );
}
async function updateComment(
  watchlist_id: number | string,
  comment: string
) {
  return connection.query(
    `UPDATE rating SETcomment = $1 WHERE watchlist_id  = $2;`,
    [comment, watchlist_id]
  );
}

export { insertRating, deleteRatingById, deleteRatingByWathlistId, updateRating, updateComment };
