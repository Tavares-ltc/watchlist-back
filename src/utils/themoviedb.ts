import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

async function getTMDBMovies(page = 1, language = "en-US") {
  return axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=release_date.desc&page=${page}`
  );
}
async function getMovieData(movie_id: number | string, language = "en-US") {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=${language}`
  );
}

async function getVideos(movie_id: number | string, language = "en-US") {
    return axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=${language}`
      );
}

async function getPopulerMovies(page: number, language = "en-US") {
    return axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`
    );
}
export { getTMDBMovies, getMovieData, getVideos, getPopulerMovies };
