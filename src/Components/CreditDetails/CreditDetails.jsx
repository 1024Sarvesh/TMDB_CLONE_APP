import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieCard from "../MovieCard/MovieCard";

function CreditDetails() {
  const [credit, setCredit] = useState([]);
  const [relatedMovie, setRelatedMovie] = useState([]);
  const { id } = useParams();

  const GetCredit = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
      },
    });
    const data = await res.json();
    console.log(data);
    setCredit(data);
  };

  const GetCreditRelMovie = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
        },
      },
    );
    const data = await res.json();
    console.log(data);
    setRelatedMovie(data.cast);
  };

  useEffect(() => {
    GetCredit();
    GetCreditRelMovie();
  }, [id]);

  return (
    <>
      <section className="p-5">
        <div className="flex gap-10 p-5 bg-blue-900 rounded-2xl shadow-2xl">
          {/* Person Image */}
          <img
            src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
            alt={credit.name}
            className="w-80 h-120 object-cover rounded-xl"
          />

          {/* Person Details */}
          <div className="text-white">
            <h1 className="text-3xl font-bold">{credit.name}</h1>

            <p className="mt-3">
              <span className="font-bold">Known For:</span>{" "}
              {credit.known_for_department}
            </p>

            <p className="mt-2">
              <span className="font-bold">Birthday:</span> {credit.birthday}
            </p>

            <p className="mt-2">
              <span className="font-bold">Place of Birth:</span>{" "}
              {credit.place_of_birth}
            </p>

            <p className="mt-2">
              <span className="font-bold">Gender:</span>{" "}
              {credit.gender === 1 ? "Female" : "Male"}
            </p>

            <p className="mt-2">
              <span className="font-bold">Popularity:</span> {credit.popularity}
            </p>

            <p className="mt-2">
              <span className="font-bold">Also Known As:</span>{" "}
              {credit.also_known_as?.join(", ")}
            </p>

            <div className="mt-5">
              <h2 className="text-2xl font-bold">Biography</h2>

              <p className="mt-2 leading-relaxed">
                {credit.biography || "Biography not available."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5 text-white">
        <h2 className="text-3xl font-bold mb-5">
          Related Movies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {relatedMovie.map((movie) => (
            <MovieCard
              key={movie.credit_id}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default CreditDetails;
