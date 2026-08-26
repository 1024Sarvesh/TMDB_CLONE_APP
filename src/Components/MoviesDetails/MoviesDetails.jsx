import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function MoviesDetails() {
  const [detail, setDetail] = useState("");
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getMoviesDetail = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
        },
      });
      const data = await res.json();
      console.log(data);
      setDetail(data);
    };

    const getCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
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
      setCasts(data.cast);
      setCrews(data.crew);
    };

    getMoviesDetail();
    getCredits();
  }, [id]);

  if (!detail || !casts || !crews) {
    return <div className="text-center mt-12 text-5xl">Loading...</div>;
  }
  return (
    <>
      <section className="bg-black text-white min-h-screen border-white">
        <section
          className="relative min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
          }}
        >
          <div className="relative bg-black/50">
            <div className="relative z-10 min-h-screen flex items-end">
              <div className="container mx-auto px-6 md:px-10 lg:px-16 pb-16 pt-32">
                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-end">
                  <div className="shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                      alt={detail.title}
                      className="w-64 md:w-72 lg:w-80 rounded-xl shadow-2xl"
                    />
                  </div>

                  <div className="max-w-4xl text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                      {detail.title}
                    </h1>

                    <p className="text-gray-300 italic text-lg mb-5">
                      "{detail.tagline}"
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 text-gray-300 mb-6">
                      <span>{detail.release_date?.slice(0, 4)}</span>

                      <span>•</span>

                      <span>
                        {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}
                        m
                      </span>

                      <span>•</span>

                      <span className="text-yellow-400 font-semibold">
                        ⭐ {detail.vote_average?.toFixed(1)}
                      </span>

                      <span>•</span>

                      <span>{detail.vote_count} votes</span>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                      {detail.genres?.map((genre) => (
                        <Link to={`/GenresMovie/${genre.id}`} key={genre.id}>
                          <span
                            key={genre.id}
                            className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm cursor-pointer"
                          >
                            {genre.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <p className="text-gray-200 text-base md:text-lg leading-8 max-w-3xl mb-8">
                      {detail.overview}
                    </p>

                    <Link
                      to={`/Trailor/${detail.id +"-"+ detail.title.replace(/[^a-zA-Z0-9]+/g, "-")
                .toLowerCase()
                .trim()}`}
                      className="flex flex-wrap justify-center lg:justify-start gap-4"
                    >
                      <button className="bg-white cursor-pointer text-black px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Play Trailor
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <h1 className="text-3xl text-white ml-3.5">Casts</h1>
      <section className="flex gap-4 overflow-y-auto p-4 scrollbar-none text-white">
        {casts.map((cast) => (
          <Link
            to={`/CreditDetails/${
              cast.id + "-" +
              cast.name
                .replace(/[^a-zA-Z0-9]+/g, "-")
                .toLowerCase()
                .trim()
            }`}
            className="border-white cursor-pointer min-w-50 p-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt=""
              key={cast.id}
              className="min-w-44 rounded hover:scale-105 hover:transition-all duration-150"
            />
            <h1 className="text-2xl truncate font-serif mt-2">{cast.name}</h1>
            <h1 className="text-xl truncate font-serif">
              {cast.known_for_department}
            </h1>
          </Link>
        ))}
      </section>

      <h1 className="text-3xl text-white ml-3.5">Crews</h1>
      <section className="flex gap-4 overflow-y-auto p-4 scrollbar-none text-white">
        {crews.map((crew) => (
          <Link
            to={`/CreditDetails/${
              crew.id + "-"+
              crew.name
                .replace(/[^a-zA-Z0-9]+/g, "-")
                .toLowerCase()
                .trim()
            }`}
            className="border-white cursor-pointer min-w-50 p-2"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
              alt=""
              key={crew.id}
              className="min-w-44 rounded hover:scale-105 hover:transition-all duration-150"
            />
            <h1 className="text-2xl truncate font-serif mt-2">{crew.name}</h1>
            <h1 className="text-xl truncate font-serif">
              {crew.known_for_department}
            </h1>
          </Link>
        ))}
      </section>
    </>
  );
}

export default MoviesDetails;
