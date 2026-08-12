import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router";

function Header() {
  const [gens, setGens] = useState([]);

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

  return (
    <>
      <header className="flex items-center justify-between py-2 px-4 border">
        <h1 className="text-3xl">MovieVerse</h1>
        <select name="" id="" className="p-1 border rounded">
          <option value="">Choose Genres</option>
          {gens.map((Gen) => <option value={Gen.id} key={Gen.id}>
              {Gen.name}
            </option>
          )}
        </select>
      </header>
    </>
  );
}

export default Header;
