import { BACKEND_URL, SECURE_STORE_KEYS, getItem } from '../../../utils'

export const validateQrCode = async (code) => {
  const url = `${BACKEND_URL}/tickets`
  const token = await getItem(SECURE_STORE_KEYS.TOKEN)

  if (token === null) throw new Error('No token stored')

  return fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode === 404) {
        throw new Error('Código QR inválido')
      }

      if (data.statusCode === 409) {
        throw new Error('El ticket ya fue utilizado')
      }

      return data.response
    })
    // .catch(error => {
    //   throw new Error(error)
    // })
}
