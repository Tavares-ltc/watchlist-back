import {Router} from "express";
import { addMovieToList, listMoviesWatchlist, removeFromList } from "../controllers/watchlist.controller.js";

const route = Router();


route.get("/watchlist/:user_id", listMoviesWatchlist );
route.post("/watchlist", addMovieToList)
route.delete("/watchlist/:movie_id", removeFromList)


export default route
