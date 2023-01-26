import { getMovieData, getPopulerMovies, getTMDBMovies, getVideos } from "../utils/themoviedb.js";
import { Request, Response } from "express";
import { okResponse } from "./controller.helper.js";

function genresHelper(ids: number[]){
const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    118: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
    10759: "Action & Adventure",
    18: "Drama",
    10762: "Kids",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics"
}

return ids.map(id => genres[id])
}

async function listMovies(req: Request, res: Response) {
  let page = Number(req.query?.page);
  if (!page) page = 1;
  let language = String(req.query?.language);
  if (!language) language = "en-US";
  try {
    const movies = await getTMDBMovies(page, language);
   
    movies.data.results = movies.data.results.filter(data => data.poster_path !== null);
    movies.data.results.map(movie => movie.genres = genresHelper(movie.genre_ids))
    okResponse(res, movies.data);
  } catch (error) {
    res.send(error.message);
  }
}

async function getMovieDetails(req: Request, res: Response) {
    const { movie_id } = req.params;

    try {
        const movieDetails = await getMovieData(movie_id);
        const videos = await getVideos(movie_id);
        if(videos.data) movieDetails.data.videos = videos.data
        return res.send(movieDetails.data) 
    } catch (error) {
        res.send(error.message);
    }
}
async function listPopularMovies(req: Request, res: Response) {
    let page = Number(req.query?.page);
    if (!page) page = 1;
    let language = String(req.query?.language);
    if (!language) language = "en-US";
    try {
        const movies = await getPopulerMovies(page, language)
        movies.data.results = movies.data.results.filter(data => data.poster_path !== null);
        movies.data.results.map(movie => movie.genres = genresHelper(movie.genre_ids))
        okResponse(res, movies.data); 
    } catch (error) {
        res.send(error.message);
    }
}

export { listMovies, getMovieDetails, listPopularMovies };
