import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
      >
        {movie.Title}
      </div>
  );
};

//define prop constraints
MovieCard.propTypes = {
  Title: PropTypes.string.isRequired,
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }),
  onMovieClick: PropTypes.func.isRequired
};