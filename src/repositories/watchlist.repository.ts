import connection from "../database/postgres.js";

async function getUserWatchlist(user_id: string, page = 0) {
    return connection.query(
        "SELECT * FROM watchlist WHERE user_id = $1 LIMIT 10 OFFSET $2;",
        [user_id, page * 10]
    );
}

async function isOnWatchlist(
    TMDB_movie_id: number | string,
    user_id: number | string
) {
    return connection.query(
        `
    SELECT * FROM watchlist WHERE user_id = $1 AND "TMDB_movie_id" = $2;`,
        [user_id, TMDB_movie_id]
    );
}

async function insertMovieOnWatchlist(
    TMDB_movie_id: number | string,
    title: string,
    poster_path: string,
    overview: string,
    release_date: string | Date,
    user_id: number | string
) {
    return connection.query(
        `INSERT INTO watchlist ("TMDB_movie_id", title, poster_path, overview, release_date, user_id)
     VALUES ($1,$2,$3,$4,$5, $6);`,
        [TMDB_movie_id, title, poster_path, overview, release_date, user_id]
    );
}
async function removeMovieFromList(
    TMDB_movie_id: number | string,
    user_id: number | string
) {
    return connection.query(
        "DELETE FROM watchlist WHERE user_id = $1 AND \"TMDB_movie_id\" = $2;",
        [user_id, TMDB_movie_id]
    );
}
async function getWatchlistDataById(watchlist_id: number | string) {
    return connection.query("SELECT * FROM watchlist WHERE id = $1;", [
        watchlist_id,
    ]);
}

async function get5starsMovies(user_id: number | string) {
    return connection.query(
        "SELECT watchlist.* FROM watchlist JOIN rating ON watchlist.id = rating.watchlist_id WHERE user_id = $1 AND stars = 5;",[
            user_id
        ]
    );
}

export {
    getUserWatchlist,
    isOnWatchlist,
    insertMovieOnWatchlist,
    removeMovieFromList,
    getWatchlistDataById,
    get5starsMovies,
};
