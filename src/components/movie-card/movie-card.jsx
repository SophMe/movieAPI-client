import React from "react";
// import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
  return (
    <Card border="light">
        <Card.Img className="rounded" variant="top" src={movie.Image} alt="movie poster"></Card.Img>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle>{movie.Description}</Card.Subtitle>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="light">Open</Button>
          </Link>
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
  // Image: PropTypes.string
};