import { useState } from 'react'
import useCurrentUser from '../../../hooks/useCurrentUser'
import * as SecureStore from 'expo-secure-store'
import { ToastAndroid } from 'react-native'
import { login } from '../../../services/user'

async function saveToken(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value))
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentUser } = useCurrentUser()

  const userLogin = ({ email, password }) => {
    setIsLoading(true)
    login({ email, password })
      .then(data => {
        console.log(data, 'data')
        if (data.error === 'Unauthorized') {
          ToastAndroid.show('Usuario o contraseña incorrecta', ToastAndroid.SHORT)
          return
        }
        const { username, email } = data.user
        saveToken('token', data.token)
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
