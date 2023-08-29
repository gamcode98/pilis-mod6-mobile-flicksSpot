/* eslint-disable react/jsx-indent */
import { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { styles } from './SignupScreen.styles'
import { LoaderBtn } from '../../components/LoaderBtn'
import { signUpSchema } from '../../utils/validations'
import { useSignup } from './hooks/useSignup'
import { InputControlled } from '../../components/InputdControlled'
import { EyeIcon, EyeSlashIcon, IconContainer } from '../../icons'

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
