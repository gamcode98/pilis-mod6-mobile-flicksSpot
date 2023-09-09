import { BACKEND_URL } from '../../../utils/constants'

export const getMovies = () => {
  return fetch(`${BACKEND_URL}/movies/pretty`)
    .then(response => response.json())
    .then(data => {
      return data.response
    })
}
