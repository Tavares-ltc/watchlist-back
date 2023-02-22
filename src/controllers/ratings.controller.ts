import { Request, Response } from "express";
import {
  createdResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
  unprocessableRequestResponse,
} from "../utils/response.handler.js";
import { validateDataBySchema } from "../utils/schema_validation.helper.js";
import { patch_comment, patch_rating } from "../schemas/ratings.schema.js";
import { ratings_service } from "../service/ratings.service.js";

async function rateMovie(req: Request, res: Response) {
  const { user_id } = res.locals;
  const stars: number = req.body.stars;
  let comment: string = req.body?.comment;
  const watchlist_id: number = req.body.watchlist_id;

  const rating = { user_id: Number(user_id), stars, comment, watchlist_id };

  try {
    await ratings_service.rateMovie(rating);
    return createdResponse(res);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return notFoundRequestResponse(res);
    }
    if (error.name === "UnauthorizedError") {
      return unauthorizedRequestResponse(res);
    }
    serverErrorResponse(res, error.message);
  }
}

async function removeRating(req: Request, res: Response) {
  const { user_id } = res.locals;
  const { rating_id } = req.params;

  try {
    await ratings_service.removeRating(user_id, rating_id);
    return okResponse(res);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return notFoundRequestResponse(res);
    }
    if (error.name === "UnauthorizedError") {
      return unauthorizedRequestResponse(res);
    }
    serverErrorResponse(res);
  }
}
async function editRating(req: Request, res: Response) {
  const { user_id } = res.locals;
  const { rating_id, stars } = req.body;

  try {
    await ratings_service.editRating(user_id, rating_id, stars);
    okResponse(res);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return unauthorizedRequestResponse(res);
    }
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

  try {
    await ratings_service.editComment(user_id, rating_id, comment);
    okResponse(res);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return unauthorizedRequestResponse(res);
    }
    if (error.name === "UnprocessableError") {
      return unprocessableRequestResponse(res);
    }
    return serverErrorResponse(res);
  }
}

async function listRatingStatistics(req: Request, res: Response) {
  const { user_id } = res.locals;
  try {
    const statistics = await ratings_service.listRatingStatistics(user_id)
    return okResponse(res, statistics)
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
