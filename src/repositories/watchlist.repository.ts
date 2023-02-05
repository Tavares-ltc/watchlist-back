import { prisma } from "../config/database.js";
import { QueryResult } from "pg";

async function getUserWatchlist(user_id: number) {
    return prisma.watchlist.findMany({
        where: {
            user_id,
        },
    });
}

async function isOnWatchlist(TMDB_movie_id: number, user_id: number) {
    return prisma.watchlist.findFirst({
        where: { user_id, TMDB_movie_id },
    });
}

async function insertMovieOnWatchlist(
    TMDB_movie_id: number,
    title: string,
    poster_path: string,
    overview: string,
    release_date: string,
    user_id: number,
    genres: string
) {
    return prisma.watchlist.create({
        data: {
            TMDB_movie_id,
            title,
            poster_path,
            overview,
            release_date,
            user_id,
            genres,
        },
    });
}

async function removeMovieFromList(TMDB_movie_id: number, user_id: number) {
    return prisma.watchlist.deleteMany({
        where: { user_id, TMDB_movie_id },
    });
}

async function getWatchlistDataById(watchlist_id: number) {
    return prisma.watchlist.findFirst({
        where: { id: watchlist_id },
    });
}

async function get5starsMovies(user_id: number): Promise<QueryResult<any>> {
    return prisma.$queryRaw`SELECT watchlist.* FROM watchlist JOIN rating ON watchlist.id = rating.watchlist_id WHERE user_id = ${user_id} AND stars = 5;`;
}

export {
    getUserWatchlist,
    isOnWatchlist,
    insertMovieOnWatchlist,
    removeMovieFromList,
    getWatchlistDataById,
    get5starsMovies,
};
