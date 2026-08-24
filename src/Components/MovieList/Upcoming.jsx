import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);
  const UpcomingMovies = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/upcoming", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
      },
    });
    const data = await res.json()
    console.log(data.results)
    setUpcoming(data.results)
  };
  useEffect(()=>{
    UpcomingMovies()
  },[])

  return (
    <>
     <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {upcoming.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
    </>
  )
}

export default Upcoming;
