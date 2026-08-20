import React, { useEffect, useState } from "react";
import { Link } from "react-router";

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
        <Link
          to={`/MoviesDetails/${movie.id}`} key={movie.id}
          className="relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-lg group cursor-pointer"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4 transform translate-y-full transition-transform duration-400 ease-in-out group-hover:translate-y-0">
            <h2 className="text-white text-lg font-bold">
              {movie.title}
            </h2>
            <p className="text-gray-300 text-sm mt-1">
              Release: {movie.release_date}
            </p>
        
            <p className="text-gray-300 text-2xl">
              ⭐ {movie.vote_average}
            </p>
        
            <p className="text-gray-300 text-xs mt-2 line-clamp-2">
              {movie.overview}
            </p>
          </div>
        </Link>
      ))}
    </section>
  </>
  )
}

export default Home;
