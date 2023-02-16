import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

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
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); }} />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {user ? (
                    <Navigate to="/movies" />
                  ) : (
                    <Col md={4}>
                      <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token); }} />
                    </Col>
                  )}
                </>
              }
            />
            <Route path="/movies/:movieId" element={
              <>
                {!user ? (
                  <Navigate to="/" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={5}>
                      <MovieView movies={movies} />
                  </Col>
                )}
              </>
             }
            />
            <Route 
              path="/signup"
              element={
                <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <Col md={5}>
                   <SignupView />
                 </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                  {!user ? (
                    <Navigate to="/" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                    {movies.map((movie) => (
                      <Col className="mb-4" md={4} key={movie._id}>
                        <MovieCard
                        // props
                          key={movie._id}
                          movie={movie}
                        />
                      </Col> 
                    ))}
                    </>
                  )}  
                </>
              }
            />
            <Route //to ProfileView
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={4}>
                      <ProfileView
                      user={user}
                      movies={movies}
                      setUser={setUser} />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
};