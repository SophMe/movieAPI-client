import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from 'react-icons/bs';

export const MovieCard = ({movie, isFavorite, onRemoveFavorite, onAddFavorite}) => {
  return (
    <Card border="light">
        <Card.Img className="rounded img-fluid h-100 w-auto card-image" variant="top" src={movie.Image} alt="movie poster"></Card.Img>
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Subtitle className="description">{movie.Description}</Card.Subtitle>

          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="light" size="sm">Open</Button>
          </Link>
          
          {isFavorite ? 
            <Button variant="outline-danger" size="sm" onClick={ (e) => {e.preventDefault(); onRemoveFavorite(movie._id) }} > <BsHeartFill /> </Button>
            :
            <Button variant="outline-danger" size="sm" onClick={ (e) => {e.preventDefault(); onAddFavorite(movie._id) }} > <BsHeart /> </Button>
          }
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
  Genre: PropTypes.string
};