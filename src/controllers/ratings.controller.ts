import { Request, Response } from "express";
import {
    deleteRatingById,
    getRatingById,
    getUserRatingsStatistics,
    upsertRating,
    updateComment,
    updateRating,
} from "../repositories/ratings.repository.js";
import {
    createdResponse,
    notFoundRequestResponse,
    okResponse,
    serverErrorResponse,
    unauthorizedRequestResponse,
    unprocessableRequestResponse,
} from "./controller.helper.js";
import { getWatchlistDataById } from "../repositories/watchlist.repository.js";
import { validateDataBySchema } from "../middlewares/validate_schema.middleware.js";
import {
    patch_comment,
    patch_rating,
    post_rating,
} from "../schemas/ratings.shema.js";

async function rateMovie(req: Request, res: Response) {
    const errors: string[] | false = validateDataBySchema(req.body, post_rating);
    if (errors) return unauthorizedRequestResponse(res, errors);

    const { user_id } = res.locals;
    const stars: number = req.body?.stars;
    let comment: string = req.body?.comment;
    const watchlist_id: number = req.body?.watchlist_id;
    if (!watchlist_id || !stars) {
        return unprocessableRequestResponse(res);
    }
    if (!comment) {
        comment = "";
    }
    try {
        const watchlistData = await getWatchlistDataById(watchlist_id);
        if (!watchlistData) {
            return notFoundRequestResponse(res);
        }
        if (watchlistData.user_id !== user_id) {
            return unauthorizedRequestResponse(res);
        }
        await upsertRating(watchlist_id, stars, comment);
        createdResponse(res);
    } catch (error) {
        serverErrorResponse(res, error.message);
    }
}

async function removeRating(req: Request, res: Response) {
    const { user_id } = res.locals;
    const { rating_id } = req.params;
    if (!rating_id) {
        return unprocessableRequestResponse(res);
    }

    try {
        const rating = await getRatingById(Number(rating_id));
        if (rating.watchlist.user_id !== user_id) {
            return unauthorizedRequestResponse(res);
        }
        await deleteRatingById(Number(rating_id));
        return okResponse(res);
    } catch (error) {
        serverErrorResponse(res);
    }
}

async function editRating(req: Request, res: Response) {
    const errors: string[] | false = validateDataBySchema(req.body, patch_rating);
    if (errors) return unauthorizedRequestResponse(res, errors);

    const { user_id } = res.locals;
    const { rating_id, stars } = req.body;

    try {
        const rating = await getRatingById(rating_id);
        if (rating.watchlist.user_id !== user_id || !rating.watchlist.user_id) {
            return unauthorizedRequestResponse(res);
        }
        await updateRating(stars, rating_id);
        okResponse(res);
    } catch (error) {
        return serverErrorResponse(res);
    }
}

async function editComment(req: Request, res: Response) {
    const errors: string[] | false = validateDataBySchema(
        req.body,
        patch_comment
    );
    if (errors) return unauthorizedRequestResponse(res, errors);

    const { user_id } = res.locals;
    const { rating_id, comment } = req.body;
    if (!rating_id || !comment) {
        return unprocessableRequestResponse(res);
    }

    try {
        const rating = await getRatingById(rating_id);
        if (rating.watchlist.user_id !== user_id || !rating.watchlist.user_id) {
            return unauthorizedRequestResponse(res);
        }
        await updateComment(comment, rating_id);
        okResponse(res);
    } catch (error) {
        return serverErrorResponse(res);
    }
}

async function listRatingStatistics(req: Request, res: Response) {
    const { user_id } = res.locals;
    try {
        const statistics: string[] = (await getUserRatingsStatistics(user_id)).rows;
        okResponse(res, statistics);
    } catch (error) {
        notFoundRequestResponse(res);
    }
}

export {
    rateMovie,
    removeRating,
    editRating,
    editComment,
    listRatingStatistics,
};
