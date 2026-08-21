import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function CreditDetails() {
  const [detail, setDetail] = useState("");
  const { id } = useParams();

  const GetCreaditDetail = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/credit/${id}`, {
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
  useEffect(() => {
    GetCreaditDetail();
  }, [id]);

  return <div>CreditDetails</div>;
}

export default CreditDetails;
