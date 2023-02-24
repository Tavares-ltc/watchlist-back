import {Router} from "express";
import { addMovieToList, listFavoritesMovies, listWatchlistMovies, removeFromList } from "../controllers/watchlist.controller.js";
import checkAuthorization from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { movie_schema } from "../schemas/watchlist.schema.js";

const route = Router();


route.get("/watchlist", checkAuthorization, listWatchlistMovies );
route.get("/watchlist/favorites", checkAuthorization, listFavoritesMovies);
route.post("/watchlist", checkAuthorization, validateBody(movie_schema), addMovieToList);
route.delete("/watchlist/:movie_id", checkAuthorization, removeFromList);

export default route;
