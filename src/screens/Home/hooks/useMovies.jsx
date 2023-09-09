import { useEffect, useState } from 'react'
import { getMovies } from '../services/movies'

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
      .then(data => setMovies(data))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  return {
    isLoading,
    movies
  }
}
