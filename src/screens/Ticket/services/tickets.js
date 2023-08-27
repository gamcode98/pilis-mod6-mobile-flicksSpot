import { BACKEND_URL } from '../../../utils/constants'

export const getTickets = async () => {
  const url = `${BACKEND_URL}/tickets`

  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbCI6ImN1c3RvbWVyIiwiaWF0IjoxNjkzMTQzMjgwLCJleHAiOjE2OTMxNTA0ODB9.YAw3Fhc9SjsVXa53OrGYzMk42AmUlWcgfTa9FsgWyog'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.response
    })
}
