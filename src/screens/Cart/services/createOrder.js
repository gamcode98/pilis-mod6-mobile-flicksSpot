import { getItem, BACKEND_URL, SECURE_STORE_KEYS } from '../../../utils'

export const createOrder = async (items) => {
  const token = await getItem(SECURE_STORE_KEYS.TOKEN)

  return fetch(`${BACKEND_URL}/payments/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ items })
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}
