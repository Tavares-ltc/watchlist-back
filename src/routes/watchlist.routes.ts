import {Router} from "express";
import { listMoviesWatchlist } from "../controllers/watchlist.controller.js";

const route = Router();


route.get("/watchlist/:user_id", listMoviesWatchlist );


export default route
