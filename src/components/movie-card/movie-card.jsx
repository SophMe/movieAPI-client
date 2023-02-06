import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card border="light" onClick={() => onMovieClick(movie)}>
        <Card.Img className="rounded" variant="top" src={movie.Image} alt="movie poster"></Card.Img>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle>{movie.Description}</Card.Subtitle>
          <Button variant="light">Open</Button>
        </Card.Body>
      </Card>
  );
};

//define prop constraints
MovieCard.propTypes = {
  // Title: PropTypes.string.isRequired,
  // Director: PropTypes.shape({
  //   Name: PropTypes.string,
  //   Bio: PropTypes.string
  // }),  
  // Image: PropTypes.string,
  // onMovieClick: PropTypes.func.isRequired
};