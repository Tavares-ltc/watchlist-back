import {Router} from "express";
import { rateMovie } from "../controllers/ratings.controller.js";
import checkAuthorization from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/rate", checkAuthorization, rateMovie);

export default route;