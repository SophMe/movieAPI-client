import React from "react";
import { useState } from "react";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import format from "date-fns/format";
import { UpdateUser } from "./update-user";
// import { UpdateUser } from "./update-user";

export const ProfileView = ({ movies, user }) => { //pass props {movies, users} from MainView

  const favMoviesList = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: password, Email: email, Birthday : birthday };

  //fetch("http://localhost:1234/users", {
  fetch("https://90s-movie-api-sophme.vercel.app/users", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
};

  return(
    <>
    <Card>
      <Card.Title>Your Profile</Card.Title>
      <Card.Body>
        <Card.Text>Username: {user.Username}</Card.Text>
        <Card.Text>Email: {user.Email}</Card.Text>
        <Card.Text>Birthday: {format(new Date(user.Birthday),'MMM dd, yyyy')}</Card.Text>
        </Card.Body>
    </Card>

{/* Create a seperate route for this? */}
    <Row>
     {favMoviesList.length === 0 ? (
       <Col>There are no favorites in your list</Col>
     ) : (
       <>
         {favMoviesList.map((movie) => (
           <Col key={movie.id} >
             <MovieCard 
              movie={movie}
              />
           </Col>
         ))}
       </>
     )}
    </Row>

    <UpdateUser />
    </>
  );
};