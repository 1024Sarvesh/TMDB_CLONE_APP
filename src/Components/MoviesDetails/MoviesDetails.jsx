import React from 'react'
import { useParams } from 'react-router'

function MoviesDetails() {
    const {id,name} = useParams()
    
  return (
    <div>MovieDetails:{id}</div>
  )
}

export default MoviesDetails