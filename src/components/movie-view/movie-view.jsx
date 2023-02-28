import {useParams } from "react-router";
import { Link } from "react-router-dom";
import React from "react";
import { Card, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <Col md={8}>
      <Card border="light">
        <Card.Img className="rounded card-image" variant="bottom" src={movie.Image} alt="movie poster" style={{width: "300px"}}/>
        <Card.Body>
          <Card.Text>Title: {movie.Title}</Card.Text>
          <Card.Text>Year: {movie.Year}</Card.Text>
          <Card.Text>Description: <br />{movie.Description}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Card.Text>Bio: <br />{movie.Director.Bio}</Card.Text>

          <Link to={`/movies`}>
            <Button variant="light">Back to list</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};