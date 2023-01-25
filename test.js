MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Year: PropTypes.number,
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Birth: PropTypes.number,
      Bio: PropTypes.string
    }),
    ImagePath: PropTypes.string,
    Main: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    })
  }),
  onMovieClick: PropTypes.func.isRequired
};