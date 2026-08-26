import React from "react";
import { Link } from "react-router";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/MoviesDetails/${
        movie.id + "-"+
        movie.title
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .toLowerCase()
          .trim()
      }`}
      key={movie.id}
      className="relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg group cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 transform translate-y-full transition-transform duration-400 ease-in-out group-hover:translate-y-0">
        <h2 className="text-white text-lg font-bold">{movie.title}</h2>
        <p className="text-gray-300 text-sm mt-1">
          Release: {movie.release_date}
        </p>

        <p className="text-gray-300 text-2xl">⭐ {movie.vote_average}</p>

        <p className="text-gray-300 text-xs mt-2 line-clamp-2">
          {movie.overview}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
