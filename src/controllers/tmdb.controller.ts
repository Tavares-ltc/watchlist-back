import { getDiscoverMovies, getMovieData, getTMDBMovies, getVideos, getWatchProviders, searchMovieByName } from "../utils/themoviedb.js";
import { Request, Response } from "express";
import { badRequestResponse, okResponse} from "./controller.helper.js";
import { AxiosResponse } from "axios";

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
    const categories = {
        "discover": true,
        "top_rated": true,
        "upcoming": true,
        "now_playing": true,
        "popular": true
    }

  const { category } = req.params;
  if(!categories[category]) return badRequestResponse(res)

  let page = Number(req.query?.page);
  if (!page) page = 1;

  let language = String(req.query?.language);
  if (!language) language = "en-US";

  try {
    let movies: AxiosResponse<any, any>
    if(category === "discover") {
        movies = await getDiscoverMovies(language, page)
    } else {
        movies = await getTMDBMovies(category, language, page);
    }
   
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

        const watchProviders = await getWatchProviders(movie_id)
        if(watchProviders.data) movieDetails.data.watchProviders = watchProviders.data
        return res.send(movieDetails.data) 
    } catch (error) {
        res.send(error.message);
    }
}

async function listMoviesByName(req: Request, res: Response){
    let page = Number(req.query?.page);
    let language = String(req.query?.language);
    const query = String(req.query?.query)
    if(!query) return badRequestResponse(res)
    if (!page) page = 1;
    if (!language) language = "en-US";
    
    try {
        const movies = await searchMovieByName(page, language, query)
        movies.data.results = movies.data.results.filter(data => data.poster_path !== null);
        movies.data.results.map(movie => movie.genres = genresHelper(movie.genre_ids))
        okResponse(res, movies.data); 
    } catch (error) {
        res.send(error.message);
    }
}
export { listMovies, getMovieDetails, listMoviesByName };
