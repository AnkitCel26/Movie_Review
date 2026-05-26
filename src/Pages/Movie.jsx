
import React from 'react'
import { MOVIE_API_URL } from '../Constant/Constant'
import MoviePages from './MoviePages'

const Movie = () => {
  return (
    <MoviePages
      title="Movies"
      api={MOVIE_API_URL}
    />
    // <DisplayPosts />
  )
}

export default Movie