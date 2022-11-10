import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

async function getTMDBMovies(page: number = 1, language: string = "en-US") {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=release_date.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_release_type=2`
  );
}

export { getTMDBMovies };
