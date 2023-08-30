import { BACKEND_URL, SECURE_STORE_KEYS, getItem } from '../../../utils'

export const getTickets = async () => {
  const url = `${BACKEND_URL}/tickets`
  const token = await getItem(SECURE_STORE_KEYS.TOKEN)

  console.log({ token })

  if (token === null) throw new Error('No token stored')

  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.response
    })
}
