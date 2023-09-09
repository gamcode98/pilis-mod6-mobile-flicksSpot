import * as yup from 'yup'
export const signUpSchema = yup.object({
  username: yup.string()
    .required('El nombre de usuario es obligatorio')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(16, 'El nombre de usuario debe tener al menos un maximo 16 caracteres')
    .matches(
      /^[a-z0-9_-]{3,15}$/,
      'El nombre de usuario debe contener letras y números'
    ),
  email: yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio')
    .max(255, 'El correo electrónico no debe tener más de 255 caracteres')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'El correo electrónico no es válido'
    ),
  password: yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
      'La contraseña debe tener al menos un número, una mayúscula y un símbolo'
    )
}).required()

export const loginSchema = yup.object({
  email: yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio')
    .max(255, 'El correo electrónico no debe tener más de 255 caracteres')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'El correo electrónico no es válido'
    ),
  password: yup.string()
    .required('La contraseña es obligatoria')
}).required()
