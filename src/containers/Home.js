import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { OMDB_API_KEY } from "../components/API_KEY";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [movie, setMovie] = useState();
  let query = useQuery();

  //   const studioGhibliURL = `https://ghibliapi.herokuapp.com/films?name=${movie}`;
  const studioGhibliURL = `https://ghibliapi.herokuapp.com/films?title=Castle in the Sky`;
  const omdbURL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=Tenkū+no+shiro+Rapyuta`;

  useEffect(() => {
    if (!movie) {
      axios
        .get(omdbURL)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.warn(error);
        });
    }
  });
  return (
    <div>
      <p>Home</p>
    </div>
  );
}

export default Home;
