import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Trailor() {
  const [trailer, setTrailer] = useState(null);
  const { id } = useParams();

  const MoviesTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        },
      );

      const data = await res.json();

      const foundTrailer = data.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true,
      );

      console.log(foundTrailer);

      setTrailer(foundTrailer);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    MoviesTrailer();
  }, [id]);

  if (!trailer) {
    return <p>Trailer not found...</p>;
  }

  return (
    <div>
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
       autoplay; clipboard-write;
        encrypted-media; gyroscope;
         picture-in-picture;
      web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullscreen
      ></iframe>
    </div>
  );
}

export default Trailor;
