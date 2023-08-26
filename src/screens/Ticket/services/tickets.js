import { BACKEND_URL } from '../../../utils/constants'

export const getTickets = async () => {
  const url = `${BACKEND_URL}/tickets`

  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbCI6ImN1c3RvbWVyIiwiaWF0IjoxNjkzMDA1OTk1LCJleHAiOjE2OTMwMTMxOTV9.vvczttLpYUIj_b5pQpVdPDJX0HLZx3z9W6NgAOGlon4'
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.response
    })
}
