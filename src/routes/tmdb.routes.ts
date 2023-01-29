import {Router} from "express";
import {listMovies,getMovieDetails, listMoviesByName} from "../controllers/tmdb.controller.js";

const route = Router();

route.get("/movies/:category", listMovies)
route.get("/movie/:movie_id", getMovieDetails)
route.get("/movies/search", listMoviesByName)

export default route;