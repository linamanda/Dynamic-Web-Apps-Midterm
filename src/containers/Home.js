import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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

  return (
    <main>
      <h1>GHIBLI MOVIES</h1>
      <section>
        <a href="/?movie=My Neighbor Totoro">
          <img src="movie1.png" alt="My Neighbor Totoro"></img>
        </a>

        <a href="/?movie=Spirited Away">
          <img src="movie2.png" alt="Spirited Away"></img>
        </a>

        <a href="/?movie=Princess Mononoke">
          <img src="movie3.png" alt="Princess Mononoke"></img>
        </a>

        <a href="/?movie=Castle in the Sky">
          <img src="movie4.png" alt="Castle in the Sky"></img>
        </a>
      </section>
    </main>
  );
}

export default Home;
