import { Router } from "express";
import { signup, signin} from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validation.middleware.js";
import { signin_schema, signup_schema } from "../schemas/auth.schema.js";

const route = Router();

route.post("/signup",validateBody(signup_schema), signup);
route.post("/signin", validateBody(signin_schema), signin);

export default route;
