import { BACKEND_URL } from '../../../utils'

export const signup = async (username, email, password) => {
  return fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}
