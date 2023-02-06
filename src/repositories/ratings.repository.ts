import { QueryResult } from "pg";
import { prisma } from "../config/database.js";

async function upsertRating(
    watchlist_id: number,
    stars: number,
    comment: string
) {
    return prisma.rating.upsert({
        where: {watchlist_id},
        create: {
            watchlist_id,
            stars,
            comment,
        },
        update: {
            watchlist_id,
            stars,
            comment,
        },
    });
}

async function deleteRatingById(rating_id: number) {
    return prisma.rating.delete({ where: { id: rating_id } });
}

async function deleteRatingByWathlistId(watchlist_id: number) {
    return prisma.rating.delete({
        where: { id: watchlist_id },
    });
}

async function updateRating(stars: number, rating_id: number) {
    return prisma.rating.update({
        where: { id: rating_id },
        data: {
            stars,
        },
    });
}

async function updateComment(comment: string, rating_id: number) {
    return prisma.rating.update({
        where: { id: rating_id },
        data: {
            comment,
        },
    });
}

async function getRatingById(rating_id: number) {
    return prisma.rating.findFirst({
        where: { id: rating_id },
        include: {
            watchlist: {
                select: {
                    user_id: true,
                },
            },
        },
    });
}

async function getRatingByWatchlistId(watchlist_id: number) {
    return prisma.rating.findFirst({
        where: { watchlist_id },
        include: {
            watchlist: {
                select: {
                    user_id: true,
                },
            },
        },
    });
}

async function getUserRatingsStatistics(
    user_id: number
): Promise<QueryResult<any>> {
    return prisma.$queryRaw`SELECT COUNT(rating.id), stars FROM rating JOIN watchlist ON watchlist_id = watchlist.id WHERE user_id = ${user_id} GROUP BY stars;`;
}

export {
    upsertRating,
    deleteRatingById,
    deleteRatingByWathlistId,
    updateRating,
    updateComment,
    getRatingById,
    getRatingByWatchlistId,
    getUserRatingsStatistics,
};
