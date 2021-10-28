import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { OMDB_API_KEY } from "../components/API_KEY";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [englishTitle, setEnglishTitle] = useState();
  const [originalTitle, setOriginalTitle] = useState();
  const [movieData, setMovieData] = useState();
  const [movieStats, setMovieStats] = useState();

  let query = useQuery();

  const studioGhibliURL = `https://ghibliapi.herokuapp.com/films?title=${englishTitle}`;
  const omdbURL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${originalTitle}`;

  useEffect(() => {
    const movieTitle = query.get("movie");
    setEnglishTitle(movieTitle);
  }, [query]);

  useEffect(() => {
    axios
      .get(studioGhibliURL)
      .then(function (response) {
        setMovieData(response.data);
        setOriginalTitle(response.data[0].original_title_romanised);
      })
      .catch(function (error) {
        // handle error
      });
  }, [studioGhibliURL, englishTitle]);

  useEffect(() => {
    if (originalTitle) {
      axios
        .get(omdbURL)
        .then(function (response) {
          setMovieStats(response.data);
        })
        .catch(function (error) {
          // handle error
        });
    }
  }, [omdbURL, originalTitle]);

  const { engTitle, japTitle, description, poster, ratings } = useMemo(() => {
    if (!movieStats) return {};
    return {
      engTitle: movieData[0].title,
      japTitle: movieData[0].original_title_romanised,
      description: movieData[0].description,
      poster: movieStats.Poster,
      ratings: movieStats.Ratings,
    };
  });

  return (
    <main className="App">
      <h1 className="Logo">
        <a href="/">GHIBLI MOVIES</a>
      </h1>
      <section className="MainContentWrapper">
        <a href="/?movie=My Neighbor Totoro">
          <img
            src="https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            alt="My Neighbor Totoro"
          ></img>
        </a>

        <a href="/?movie=Spirited Away">
          <img
            src="https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            alt="Spirited Away"
          ></img>
        </a>

        <a href="/?movie=Princess Mononoke">
          <img
            src="https://m.media-amazon.com/images/M/MV5BNGIzY2IzODQtNThmMi00ZDE4LWI5YzAtNzNlZTM1ZjYyYjUyXkEyXkFqcGdeQXVyODEzNjM5OTQ@._V1_SX300.jpg"
            alt="Princess Mononoke"
          ></img>
        </a>

        <a href="/?movie=Tales from Earthsea">
          <img
            src="https://m.media-amazon.com/images/M/MV5BZGFlN2FhYTktZGYzNi00MzllLWFlOTAtY2ExNjRjZjhkZWM2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
            alt="Tales From Earthsea"
          ></img>
        </a>
      </section>

      {movieStats && (
        <MovieCard
          engTitle={engTitle}
          japTitle={japTitle}
          description={description}
          poster={poster}
          ratings={ratings}
        />
      )}
    </main>
  );
}

export default Home;
