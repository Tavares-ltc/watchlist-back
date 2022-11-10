import { getUserWatchlist } from "../repositories/watchlist.repository.js";
import {Request, Response} from "express";
import {badRequestResponse, notFoundRequestResponse, okResponse, serverErrorResponse} from "./controller.helper.js"
async function listMoviesWatchlist(req: Request, res: Response){
    const {user_id} = req.params;
    let page = 0
    if(req.query.page){
    page = Number(req.query.page) 
    }

    if(!user_id){
       return badRequestResponse(res)
    }

    try {
        const movies = await getUserWatchlist(user_id, page);
        if(!movies){
            return notFoundRequestResponse(res)
        }
        okResponse(res, movies.rows);
    } catch (error) {
        serverErrorResponse(res, error.message)
    }
}

export {
    listMoviesWatchlist
}