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
    //fetch(`https://90smovies.vercel.app/movies`, {
    fetch(`https://nine0smovieapi-oyws.onrender.com/movies`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
    console.log("movies from api", data);
      const moviesFromApi = data.map((movie) => {
        return {
          ...movie,
          Image: movie.ImagePath
        };
      });
      setMovies(moviesFromApi);
    });
  }
  , [token]); // dependency array

  const addFavorite = (id) => {
    //fetch(`https://90smovies.vercel.app/users/${user.Username}/movies/${id}`, {
    fetch(`https://nine0smovieapi-oyws.onrender.com/users/${user.Username}/movies/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        alert("Added to Favorites");
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } else {
        alert("Failed to add");
        console.log(errors);
      }
    })
    .catch(err => {
      alert("Something went wrong");
    });
  };
  
  const removeFavorite = (id) => {
    //fetch(`https://90smovies.vercel.app/users/${user.Username}/movies/${id}`, {
    fetch(`https://nine0smovieapi-oyws.onrender.com/users/${user.Username}/movies/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        alert("Removed from Favorites");
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } else {
        alert("Failed to remove");
        console.log(errors);
      }
    })
    .catch(err => {
      alert("Something went wrong");
    });
  };
    return (
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
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
                    {movies.map((movie) => {
                      const m = user.FavoriteMovies.includes(movie._id) // check if movie in the user's list
                      return (
                      <Col md={3} key={movie._id}>
                        <MovieCard
                        // props
                          key={movie._id}
                          movie={movie}
                          isFavorite={m}
                          onAddFavorite={addFavorite}
                          onRemoveFavorite={removeFavorite}
                        />
                      </Col> 
                      )
                    })}
                    </>
                  )}  
                </>
              }
            />
            <Route
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
                      setUser={setUser}
                      onRemoveFavorite={removeFavorite} />
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