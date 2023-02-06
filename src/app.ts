import express from "express";
import cors from "cors";
import tmdb_routes from "./routes/tmdb.routes.js";
import user_routes from "./routes/auth.routes.js";
import watchlist_routes from "./routes/watchlist.routes.js";
import rating_routes from "./routes/ratings.routes.js";
import { connectDb, disconnectDB } from "./config/database.js";

const app = express();
app
    .use(cors())
    .use(express.json())
    .use(tmdb_routes)
    .use(user_routes)
    .use(watchlist_routes)
    .use(rating_routes);

export async function init() {
    connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
    await disconnectDB();
}

export default app;
