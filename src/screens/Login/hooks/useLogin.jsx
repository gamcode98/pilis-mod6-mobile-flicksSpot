import { useState } from 'react'
import { ToastAndroid } from 'react-native'
import { login } from '../services/login'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { saveItem } from '../../../utils'

export function useLogin () {
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentUser } = useCurrentUser()

  const userLogin = ({ email, password }) => {
    setIsLoading(true)
    login({ email, password })
      .then(data => {
        if (data.error === 'Unauthorized') {
          ToastAndroid.show('Usuario o contraseña incorrecta', ToastAndroid.SHORT)
          return
        }
        const { username, email } = data.user
        saveItem('token', data.token)
        setCurrentUser({ email, username })
      })
      .catch(err => console.warn(err))
      .finally(() => setIsLoading(false))
  }

  return {
    isLoading,
    userLogin
  }
}
