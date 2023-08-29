/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-tag-location */
import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { Entypo } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { styles } from './LoginScreen.styles'
import { LoaderBtn } from '../../components/LoaderBtn'
import { loginSchema } from '../../utils/validations'
import { InputControlled } from '../../components/InputdControlled'
import { useLogin } from './hooks/useLogin'

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
              ? <Entypo name='eye-with-line' size={24} color='black' />
              : <Entypo name='eye' size={24} color='black' />}
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
          // eslint-disable-next-line react/jsx-closing-bracket-location
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
