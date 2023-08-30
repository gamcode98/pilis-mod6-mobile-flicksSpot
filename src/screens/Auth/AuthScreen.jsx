import { useState } from 'react'
import { View } from 'react-native'
import { styles } from './AuthScreen.styles'
import { LoginScreen } from '../Login/LoginScreen'
import { SignupScreen } from '../Signup/SignupScreen'

export const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(true)

  const handleSwitchToRegister = () => {
    setShowLogin(false)
  }

  const handleSwitchToLogin = () => {
    setShowLogin(true)
  }
  return (
    <View style={styles.container}>
      {showLogin
        ? <LoginScreen onSwitchToRegister={handleSwitchToRegister} />
        : <SignupScreen onSwitchToLogin={handleSwitchToLogin} />}
    </View>
  )
}
