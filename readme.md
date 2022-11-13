
# ABOUT

The main idea behind the app is create a watchlist of movies, being able to mark the movie as watched and give a personal review about the movie with a simple 0 to 5 stars rating and a optional comment. In the end, the user will have a list of movies he wanna see, movies he saw and if he likes or not. With the user Id is also possible see another person movies watchlist, what will favor talks about seen movies and dates to see other.


![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)


# HOW TO RUN

> How the idea was to have a constantly updated list of movies, i decided to go with a properly movie API. So for that i am utilizing the TMDB database, wich is free but requires a key. So if you wanna see this watchlist complitly working, utilize the deploy link. Now, if you wanna test or modify the code, a TMDB key will be necessary, but is easy to get on this link:

> Is also possible, to test the non TMDB routes by using the database dump which is available in the main archives of the project. So the function add movie to the watchlist will not work, but all the others will.

1. Clone this repository
2. Create .env file based on .env.example file
3. Install dependencies with "npm i"
4. Run the project "npm start"
5. Then, just make the requisition on your loacalhost.

# REQUISITIONS

## AUTH ROUTES

- POST /signup

```
Requires:
{
"name": "user name",
"email": "user email",
"password": "user password",
"image": "profile image"
}
```  

If all goes well, will return with code: 201 CREATED  





- POST /signin
  
```
Requires:
{
"emial": "user email",
"password": "user password"
}
```  

If all goes well, will return with:

{"token": "Here will be the user session token"}
CODE: 200 OK  






## LIST MOVIES (TMDB ROUTE)


- GET /movies

Two query parameters can be passed:  


> /movies?page=2
> /movies?language=pt-BR  


If all goes well, will return like:
```
"page": 1,
"results": [
{
"adult": false,
"backdrop_path": null,
"genre_ids": [
27,
14
],
"id": 502213,
"original_language": "en",
"original_title": "Before the Mask",
"overview": "Deaths begin again as a body returns.",
"popularity": 1.544,
"poster_path": "/5JYi2v014mfJBuFFnv9X8cGPXkp.jpg",
"release_date": "2025-10-28",
"title": "Before the Mask",
"video": false,
"vote_average": 0,
"vote_count": 0
}
...
]
}
```  

CODE: 200 OK  





## WATCHLIST ROUTES


- GET /watchlist/:user_id

If all goes well, will return like:
```
[
  {
"id": 2,
    "TMDB_movie_id": 1028489,
    "title": "Please Respond",
    "poster_path": "/gUwKKzCNQQ56m0PxBGFLbxgNdF4.jpg",
    "overview": "Two detectives begin investigating a series of teen suicides that unravel into a chilling discovery.",
    "user_id": 1,
    "created_at": "2022-11-11T03:00:00.000Z",
    "release_date": "2023-10-13T03:00:00.000Z"
  }
...
]
```  

CODE: 200 OK  






- GET /watchlist/favorites/:user_id

If all goes well, will return only users 5 stars movies on the same format as   
"GET /watchlist/:user_id".
CODE: 200 OK





- POST /watchlist
  
  ```
Requires:
{
"movie_id": "TMDB movie id"
},
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 201 CREATED  





- DELETE /watchlist/:movie_id

```
Requires:
{
"movie_id": "TMDB movie id"
},
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 200 OK  





## RATING ROUTES


- POST /rating

```
Requires:
{
  "watchlist_id":"id of movie on user watchlist",
  "stars": "1 to 5"
  "comment": "this is optional"
},
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 201 CREATED  






- DELETE /rating/:rating_id

Requires:
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 200 OK  






- PATCH /rating  
  
```
Requires:
{
  "rating_id":""
  "stars": "1 to 5"
},
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 200 OK  







- PATCH /comment
```
Requires:
{
  "rating_id":""
  "comment": "new comment"
},
{
 headers: {"authorization": "Bearer token you recived"}
}
```  

If all goes well, will return with code: 200 OK  


GET /rating/statistics
```
If all goes well, will return like:
[
  {
    "count": "1",
    "stars": 5
  }
  ...
]
```  

CODE:200  


