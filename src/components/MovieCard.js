import React from "react";

function avgRating(ratingsJson) {
  let ratingSum = 0;
  let ratingCount = 0;
  ratingsJson.forEach((rating) => {
    switch (rating.Source) {
      case `Internet Movie Database`:
        ratingSum += Number(rating.Value.split(`/`)[0]) * 10;
        break;
      case `Metacritic`:
        ratingSum += Number(rating.Value.split(`/`)[0]);
        break;
      case `Rotten Tomatoes`:
        ratingSum += Number(rating.Value.split(`%`)[0]);
        break;
      default:
    }
    ratingCount += 1;
  });
  console.log(ratingSum / ratingCount);
  return ratingSum / ratingCount;
}

function MovieCard({ engTitle, japTitle, description, poster, ratings }) {
  avgRating(ratings);
  return (
    <section className="MovieCard">
      <div className="TitleWrapper">
        <h1>{engTitle}</h1>
        <h1>{japTitle}</h1>
      </div>

      <img
        src={poster}
        alt={engTitle + " poster"}
        className="Poster"
        style={{
          border: `rgba(${255 - avgRating(ratings) * 2}, 150, 0, 1) solid 4px`,
        }}
      />

      <div className="Description">
        <h2>Description</h2>
        <p>{description}</p>
      </div>

      <div className="Ratings">
        <h2>Ratings</h2>
        {ratings.map((rating, i) => {
          return (
            <p key={i}>
              {rating.Source}: {rating.Value}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default MovieCard;
