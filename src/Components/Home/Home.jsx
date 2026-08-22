import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{

    const GetMoviesList = async () => {
      try {
      const res = await fetch("https://api.themoviedb.org/3/discover/movie", {
        method: "GET",
        headers: { accept: "application/json", 
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} ` },
      });

      const data = await res.json()
      // console.log(data)
      setMovies(data.results)
    } catch (err) {
      console.log(err)
    }
  };
  GetMoviesList()
},[])
if (!movies) {
    return <div className="text-center mt-12 text-5xl">Loading...</div>;
  }
  return (
  <>
  <section
   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 ">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie}/>
      ))}
    </section>
  </>
  )
}

export default Home;
