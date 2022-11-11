import { Request, Response } from "express";
import { insertRating } from "../repositories/ratings.repository.js";
import {
  createdResponse,
  serverErrorResponse,
  unauthorizedRequestResponse,
  unprocessableRequestResponse,
} from "./controller.helper.js";
import {getWatchlistDataById} from "../repositories/watchlist.repository.js"

async function rateMovie(req: Request, res: Response) {
  const {user_id} = res.locals;
  const stars: string | number = req.body?.stars;
  let comment: string = req.body?.comment
  const watchlist_id: string | number = req.body?.movie_id;
  if (!watchlist_id || !stars) {
    return unprocessableRequestResponse(res, "This request needs an movie_id.");
  }
  if (!comment) {
    comment = "";
  }
  try {
    const watchlistData = await getWatchlistDataById(watchlist_id);
    if(watchlistData.rows[0].user_id !== user_id){
      return unauthorizedRequestResponse(res);
    }
    await insertRating(watchlist_id, stars, comment);
    createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error.message);
  }
}

export {
    rateMovie
}
