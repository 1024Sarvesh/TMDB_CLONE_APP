import React, { useParams, useState } from "react";

function GenresMovie() {
  const { id } = useParams();

  const [genMov, setGenMov] = useState("");

  const GetGenMovie = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}'`,
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
    setGenMov(data);
  };
  useEffect(() => {
    GetGenMovie();
  }, [id]);
  if (!genMov) {
    return <div className="text-center mt-12 text-5xl">Loading...</div>;
  }

  return <div>GenresMovie</div>;
}

export default GenresMovie;
