import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;


async function getDiscoverMovies( language = "en-US", page = 1) {
    return axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&page=${page}`
    );
}
async function getTMDBMovies(category: string, language = "en-US", page = 1) {
    return axios.get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=${language}&page=${page}&region=BR|US`
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

async function searchMovieByName(page: number, language = "en-US", query) {
    return axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&page=${page}&query=${query}`
    );
}

async function getWatchProviders(movie_id: number | string) {
    return axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${API_KEY}`
    );
}
export {
    getTMDBMovies,
    getDiscoverMovies,
    getMovieData,
    getVideos,
    searchMovieByName,
    getWatchProviders
};
