import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card onClick={() => onMovieClick(movie)} >
        <Card.Img variant="top" src={movie.ImagePath}></Card.Img>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Button variant="link">Open</Button>
        </Card.Body>
      </Card>
  );
};

//define prop constraints
MovieCard.propTypes = {
  Title: PropTypes.string.isRequired,
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }),
  Image: PropTypes.string,
  onMovieClick: PropTypes.func.isRequired
};