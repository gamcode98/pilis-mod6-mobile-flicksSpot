/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { styles } from './SignupScreen.styles'
import { useForm } from 'react-hook-form'
import { Entypo } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoaderBtn } from '../../components/LoaderBtn'
import { signUpSchema } from '../../utils/validations'
import { useSignup } from './hooks/useSignup'
import { InputControlled } from '../../components/InputdControlled'
export const SignupScreen = ({ onSwitchToLogin }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { isLoading, userSignup } = useSignup(onSwitchToLogin)
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  const handleSignUp = ({ email, password, username }) => {
    userSignup({ email, password, username })
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        <InputControlled
          control={control}
          name='username'
          placeholder='Nombre de usuario'
        />

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
              onPress={handleSubmit(handleSignUp)}
            >
              <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>
        }

        <View style={styles.tittleRegister}>
          <Text>
            ¿Ya tienes una cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={styles.switchLink}>
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}
