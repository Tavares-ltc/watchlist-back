import {Router} from "express";
import {listMovies,getMovieDetails, listMoviesByName} from "../controllers/tmdb.controller.js";

const route = Router();

route.get("/movies/search", listMoviesByName);
route.get("/movies/:category", listMovies);
route.get("/movie/:movie_id", getMovieDetails);

export default route;