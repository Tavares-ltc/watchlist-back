import {Router} from "express";
import { listMovies } from "../controllers/tmdb.controller.js";
const route = Router()

route.get("/movies", listMovies);

  export default route