import { Router } from "express";
import { signup, signin, status } from "../controllers/auth.controller.js";
const route = Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.get("/status", status);

export default route;
