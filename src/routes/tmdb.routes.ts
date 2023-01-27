import {Router} from "express";
import { getMovieDetails, listMovies, listNowPlayingMovies, listPopularMovies, listUpcomingMovies } from "../controllers/tmdb.controller.js";

const route = Router();

route.get("/movies", listMovies)
route.get("/movies/nowplaying", listNowPlayingMovies)
route.get("/movie/:movie_id", getMovieDetails)
route.get("/movies/popular", listPopularMovies)
route.get("/movies/upcoming", listUpcomingMovies)

export default route;