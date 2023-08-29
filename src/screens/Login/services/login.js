import { BACKEND_URL } from '../../../utils'

export const login = async ({ email, password }) => {
  return fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}
