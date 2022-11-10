import connection from "../database/postgres.js";

async function getUserWatchlist(user_id: string, page: number = 0) {
 return connection.query(
    "SELECT * FROM watchlist WHERE user_id = $1 LIMIT 10 OFFSET $2;",
    [user_id, page * 10]
  );
}

export { getUserWatchlist };
