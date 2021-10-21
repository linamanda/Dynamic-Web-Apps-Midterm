import React from "react";

function MovieCard({ engTitle, japTitle, description, poster, ratings }) {
  return (
    <section>
      <h1>{engTitle}</h1>
      <h1>{japTitle}</h1>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Ratings</h2>
      {ratings.map((rating, i) => {
        return (
          <p key={i}>
            {rating.Source}: {rating.Value}
          </p>
        );
      })}
    </section>
  );
}

export default MovieCard;
