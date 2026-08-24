import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

function Header() {
  const [gens, setGens] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getMovieGenList = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          },
        );
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(
            `Http request failed with status code : ${res.status}`,
          );
        }
        setGens(data.genres);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieGenList();
  }, []);
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    console.log(genreId);

    if (genreId) {
      Navigate(`/GenresMovie/${genreId}`);
    }
  };

  return (
    <>
      <header className="flex items-center justify-between py-2 px-4 text-white">
        <Link to={"/"}>
          <h1 className="text-3xl">MovieVerse</h1>
        </Link>

        <nav className="flex gap-10">
          <Link to={"/NowPlaying"}><h1 className="text-xl" >Now Playing</h1></Link>
          <Link to={"/Popular"}><h1 className="text-xl" >Popular</h1></Link>
          <Link to={"/TopRated"}><h1 className="text-xl" >Top Rated</h1></Link>
          <Link to={"/Upcoming"}><h1 className="text-xl" >Upcoming</h1></Link>
        </nav>
        <select
          name=""
          id=""
          className="p-1 border rounded bg-black "
          onChange={handleGenreChange}
        >
          <option value="">Choose Genres</option>
          {gens.map((Gen) => (
            <option value={Gen.id} key={Gen.id}>
              {Gen.name}
            </option>
          ))}
        </select>
      </header>
    </>
  );
}

export default Header;
