import React from "react";
import { Card, Col, Row, Carousel, CarouselItem} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import format from "date-fns/format";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ movies, user, onAddFavorite, onRemoveFavorite }) => { //pass props {movies, users} from MainView

  const favMoviesList = movies.filter((m) => user.FavoriteMovies.includes(m._id));

  const handleSubmit = (event) => {event.preventDefault();
  const data = { Username: username, Password: password, Email: email, Birthday : birthday };

  fetch(`http://LB-26-14148712.eu-central-1.elb.amazonaws.com/users`, {
  // fetch(`http://localhost:8080/users`, {  
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data),
    credentials: "include"
  });
};

  return(
    <>
    <Card>
      <Card.Title className="text-center">Your Profile</Card.Title>
      <Card.Body>
        <Card.Text>Username: {user.Username}</Card.Text>
        <Card.Text>Email: {user.Email}</Card.Text>
        <Card.Text>Birthday: {format(new Date(user.Birthday),'MMM dd, yyyy')}</Card.Text>
      </Card.Body>
    </Card>
    <br />

    <Card.Title className="text-center">Your Favorite Movies</Card.Title>
    <Carousel>
      {favMoviesList.length === 0 ? (
        <Carousel.Item>
          <Col>There are no favorites in your list</Col>
        </Carousel.Item>
      ) : (
        favMoviesList.map((movie) => (
          <Carousel.Item key={movie._id} className="my-carousel">
            <MovieCard 
              movie={movie}
              onRemoveFavorite={onRemoveFavorite}
              onAddFavorite={onAddFavorite}
              isFavorite
            />
          </Carousel.Item>
        ))
      )}
    </Carousel>
    
    <UpdateUser user={user} />

    </>
  );
};