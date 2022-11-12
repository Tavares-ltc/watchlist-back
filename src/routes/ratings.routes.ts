import {Router} from "express";
import { editComment, editRating, listRatingStatistics, rateMovie, removeRating } from "../controllers/ratings.controller.js";
import checkAuthorization from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/rating", checkAuthorization, rateMovie);
route.delete("/rating/:rating_id", checkAuthorization, removeRating);
route.patch("/rating", checkAuthorization, editRating);
route.patch("/comment", checkAuthorization, editComment);
route.get('/rating/statistics', checkAuthorization, listRatingStatistics)

export default route;