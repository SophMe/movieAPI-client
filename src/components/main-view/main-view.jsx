import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);                   // empty array to be fed by API
  const [selectedMovie, setSelectedMovie] = useState(null);   // initial state: no movie card is clicked
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
                          // these are all state variables, when there value changes they re-render the UI
  
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://90s-movie-api-liart.vercel.app/movies", {
    //fetch("http://localhost:8080/movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
    console.log("movies from api", data);
      const moviesFromApi = data.map((movie) => {
        return {
          _id: movie.key,
          Image: movie.ImagePath,
          Title: movie.Title,
          Year: movie.Year,
          Director: movie.Director,
          //Bio: movie.Director.Bio,
          Description: movie.Description
        };
      });
      setMovies(moviesFromApi);
    });
  }
  , [token]); // dependency array
  
    return (
      <Row className="justify-content-md-center">
        {!user ? (
      <>
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => 
              {setUser(user); setToken(token)}
          }
          />
          or
          <SignupView />
        </Col>
      </>
    ) : selectedMovie ? (
      // set state to null when closing MovieView
      <Col md={8}>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </Col>
        ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        <h3>Movies</h3>
        <div>
          {movies.map((movie) => (
            <Col md={5}>
              <MovieCard
              // props
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie)
                }}
              />
             </Col> 
          ))}
        </div>
        <button onClick={() => { setUser(null); setToken(null) }}>Logout</button>
      </>
    )}
    </Row>
    );
};