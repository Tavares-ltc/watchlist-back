import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tmdb_routes from "./routes/tmdb.routes.js";
import user_routes from "./routes/auth.routes.js";
import watchlist_routes from "./routes/watchlist.routes.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;

app.use(tmdb_routes);
app.use(user_routes);
app.use(watchlist_routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
