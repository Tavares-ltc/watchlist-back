import {Router} from "express";
import { getMovieDetails, listMovies, listNowPlayingMovies, listPopularMovies } from "../controllers/tmdb.controller.js";

const route = Router();

route.get("/movies", listMovies);
route.get("/movie/:movie_id", getMovieDetails)
route.get("/movies/popular", listPopularMovies)
route.get("/movies/nowplaying", listNowPlayingMovies)

export default route;