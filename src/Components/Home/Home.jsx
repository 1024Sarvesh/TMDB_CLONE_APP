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
  return (
  <>
  <section
   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 cursor-pointer">
      {movies.map((movie) => (
        <Link
        to={`/MoviesDetails/${movie.id}/${movie.title.split(" ").join("-")}`}
          key={movie.id}
          className="rounded-xl overflow-hidden shadow-lg"
        >
         
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover"
          />

          
          <div className="p-4 text-black">
            <h2>
              {movie.title}
            </h2>

            <p>
              Release: {movie.release_date}
            </p>

            <p>
               {movie.vote_average}
            </p>

            <p>
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
