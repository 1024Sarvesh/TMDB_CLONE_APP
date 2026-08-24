import React, { useEffect, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard';


function TopRated() {

    const [toprated, setToprated] = useState([]);
      const TopRated = async () => {
        const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
          },
        });
    
        const data = await res.json();
        console.log(data.results);
        setToprated(data.results);
      };
    
      useEffect(() => {
        TopRated();
      }, []);
  return (
   <>
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {toprated.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
   </>
  )
}

export default TopRated