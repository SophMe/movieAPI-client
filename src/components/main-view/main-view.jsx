import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      "id" : 1,
      "Title": "Amercian Beauty",
      "Description": "Lester Burnham is a gainfully employed suburban husband and father. Fed up with his boring, stagnant existence, he quits his job and decides to reinvent himself as a pot-smoking, responsibility-shirking teenager. What follows is at once cynical, hysterical, and, eventually, tragically uplifting.",
      "Year": 1999,
      "Director": {
        "Name": "Sam Mendes",
        "Birth": 1965
      },
      "ImagePath": "https://www.imdb.com/title/tt0169547/mediaviewer/rm2430294272/?ref_=tt_ov_i",
      "Main": "Kevin Spacey",
      "Genre": {
        "Name": "Drama",
        "Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      }
    },
    {
      "id" : 2,
      "Title": "The Shawshenk Redemption",
      "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "Year": 1994,
      "Director": {
        "Name": "Frank Darabont",
        "Birth": 1959
      },
      "ImagePath": "https://www.imdb.com/Title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i",
      "Main": "Tim Robbins",
      "Genre": {
        "Name": "Drama",
        "Description": "Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
      }
    },
    {
      "id" : 3,
      "Title": "Braveheart",
      "Description": "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
      "Year": 1995,
      "Director": {
          "Name": "Mel Gibson",
          "Birth": 1956,
          "Bio": "After college, Mel had a few stints on stage and starred in a few TV shows. Eventually, he was chosen to star in the films Mad Max (1979) and Tim - Kann das Liebe sein? (1979), co-starring Piper Laurie. The small budgeted Mad Max made him known worldwide, while Tim garnered him an award for Best Actor from the Australian Film Institute (equivalent to the Oscar)."
      },
      "ImagePath":"https://www.imdb.com/Title/tt0112573/mediaviewer/rm3170786816/?ref_=tt_ov_i",
      "Main": "Mel Gibson",
      "Genre": {
          "Name": "Historical drama",
          "Description": "A historical drama is a work set in a past time period, usually used in the context of film and television."
      }
    }
  ]);
// initial state: no movie card is clicked 
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} /> // set state to null when closing MovieView
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  else
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
          // props
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
};