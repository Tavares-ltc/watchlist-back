import {Router} from "express";
import { addMovieToList, listMoviesWatchlist } from "../controllers/watchlist.controller.js";

const route = Router();


route.get("/watchlist/:user_id", listMoviesWatchlist );
route.post("/watchlist", addMovieToList)


export default route
