/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderBtn, InputControlled } from '../../components'
import { loginSchema } from '../../utils/validations'
import { EyeIcon, EyeSlashIcon, IconContainer } from '../../icons'
import { useLogin } from './hooks/useLogin'
import { styles } from './LoginScreen.styles'

export const LoginScreen = ({ onSwitchToRegister }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { isLoading, userLogin } = useLogin()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  const handleLogin = ({ email, password }) => {
    userLogin({ email, password })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión</Text>

      <InputControlled
        control={control}
        name='email'
        placeholder='Correo electrónico'
      />

      <InputControlled
        control={control}
        name='password'
        placeholder='Contraseña'
        secureTextEntry={!isPasswordVisible}
      >
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.toggleIcon}
        >
          <Text style={styles.passwordToggleText}>
            {isPasswordVisible
              ? <IconContainer size={24}><EyeSlashIcon /></IconContainer>
              : <IconContainer size={24}><EyeIcon /></IconContainer>}
          </Text>
        </TouchableOpacity>
      </InputControlled>

      {
        isLoading
          ? <LoaderBtn />
          : <TouchableOpacity
              style={styles.button}
              disabled={isLoading}
              onPress={handleSubmit(handleLogin)}
            >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
      }
      <View style={styles.tittleRegister}>
        <Text>
          ¿No tienes una cuenta?{' '}
        </Text>
        <TouchableOpacity onPress={onSwitchToRegister}>
          <Text style={styles.switchLink}>
            Regístrate
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
