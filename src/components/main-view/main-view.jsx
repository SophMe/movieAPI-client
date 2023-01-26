import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);                   // empty array to be fed by API
  const [selectedMovie, setSelectedMovie] = useState(null);   // initial state: no movie card is clicked
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
                          // these are all state variables, when there value changes they re-render the UI

  useEffect(() => {
    fetch("https://90s-movie-api-liart.vercel.app/movies")
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
  , [token]); // dependency array
  
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      // set state to null when closing MovieView
      <>
        
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  if (movies.length === 0) {
    return (
    <>
      <div>The list is empty!</div>;
    </>
    );
  }
  else
    return (
      <>
        <h3>Movies</h3>
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
        <button onClick={() => { setUser(null); setToken(null) }}>Logout</button>
      </>
    );
};