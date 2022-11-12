import {Router} from "express";
import { addMovieToList, listFavoritesMovies, listMoviesWatchlist, removeFromList } from "../controllers/watchlist.controller.js";
import checkAuthorization from "../middlewares/auth.middleware.js";

const route = Router();


route.get("/watchlist/:user_id", listMoviesWatchlist );
route.get("/watchlist/favorites/:user_id", listFavoritesMovies)
route.post("/watchlist",checkAuthorization, addMovieToList)
route.delete("/watchlist/:movie_id",checkAuthorization, removeFromList)

export default route
