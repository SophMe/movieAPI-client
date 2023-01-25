import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]); // empty array to be fed by API
// initial state: no movie card is clicked 
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    //fetch("https://90s-movie-api-liart.vercel.app/movies")
    fetch("http://127.0.0.1:8080/movies")
    .then((response) => response.json())
    .then((data) => {
    console.log("movies from api", data);
      const moviesFromApi = data.map((doc) => {
        return {
          Title: doc.Title,
          Year: doc.Year,
          Director: doc.Director,
          Description: doc.Description
        };
      });
      setMovies(moviesFromApi);
    });
  }
  , []);
  
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /> // set state to null when closing MovieView
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  else
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
          // props
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
};