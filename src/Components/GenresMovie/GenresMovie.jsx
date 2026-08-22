import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router";
import MovieCard from "../MovieCard/MovieCard";

function GenresMovie() {
  const { id } = useParams();

  const [genMov, setGenMov] = useState({});

  const GetGenMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        },
      );
      const data = await res.json();
      console.log(data.results);
      setGenMov(data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetGenMovie();
  }, [id]);
  if (!genMov.length) {
    return <div className="text-center mt-12 text-5xl">Loading...</div>;
  }

  return <>
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
    {genMov.map((movie)=>(
     <MovieCard key={movie.id} movie={movie}/>
    ))}
    </section>
    </>;
}

export default GenresMovie;
