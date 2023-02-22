import {Router} from "express";
import { editComment, editRating, listRatingStatistics, rateMovie, removeRating } from "../controllers/ratings.controller.js";
import checkAuthorization from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { patch_comment, patch_rating, post_rating } from "../schemas/ratings.schema.js";

const route = Router();

route.post("/rating", checkAuthorization, validateBody(post_rating), rateMovie);
route.delete("/rating/:rating_id", checkAuthorization, removeRating);
route.patch("/rating", checkAuthorization,validateBody(patch_rating), editRating);
route.patch("/comment", checkAuthorization,validateBody(patch_comment), editComment);
route.get("/rating/statistics", checkAuthorization, listRatingStatistics);

export default route;