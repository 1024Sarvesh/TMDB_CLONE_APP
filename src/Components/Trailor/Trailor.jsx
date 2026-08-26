import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function Trailor() {

    const [trailor,setTrailor] = useState(null)
    const {id} = useParams()

    const MoviesTrailor = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN} `,
          },
            });
            const data = await res.json()
            console.log(data.results)
            setTrailor(data.results)

    }

    useEffect(()=>{
        MoviesTrailor()
    },[id])


  return (
    <div>Trailor</div>
  )
}

export default Trailor