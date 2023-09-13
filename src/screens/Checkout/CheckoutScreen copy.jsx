import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../utils'
import { InputControlled } from '../../components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { creditCardSchema } from '../../utils/validations'
import { PaymentInput } from './components/PaymentInput/PaymentInput'
import { useEffect } from 'react'

export const CheckoutScreen = (props) => {
  const { route, navigation } = props
  const { items } = route.params

  // const [values, setValues] = useState({
  //   brand: '',
  //   cvv: '',
  //   expiration: '',
  //   holder: '',
  //   number: ''
  // })
  // console.log({ items })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(creditCardSchema),
    defaultValues: {
      holder: '',
      cvv: '',
      expiration: '',
      number: ''
    }
  })

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     // console.log(value, name, type)
  //     console.log({ value })
  //     console.log({ name })
  //     console.log({ type })

  //     // if (name === 'expiration' && value?.expiration.length === 2) {
  //     //   setValue('expiration', `${value?.expiration}/`)
  //     // }

  //     // if (name === 'number' && (
  //     //   value?.number.length === 4 ||
  //     //   value?.number.length === 9 ||
  //     //   value?.number.length === 14
  //     // )) {
  //     //   setValue('number', `${value?.number} `)
  //     // }

  //     if (name === 'number') {
  //       console.log('aaaaaaaaaaaaaaa')
  //       const currentValue = value?.number.replace(/\D/g, '')

  //       // Formatear el número con espacios cada cuatro dígitos
  //       const formattedValue = currentValue.replace(/(\d{4})(?=\d)/g, '$1 ')

  //       console.log({ formattedValue })

  //       setValue('number', formattedValue)
  //     }
  //   })

  //   return () => subscription.unsubscribe()
  // }, [watch])

  const handlePayment = (data) => {
    console.log({ data })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text
        style={{
          marginVertical: 16
        }}
      >Detalles del pago
      </Text>
      <View style={{ width: '90%' }}>
        <PaymentInput
          control={control}
          name='holder'
          label='Nombre del titular'
          placeholder='Ingresa tu nombre como figura en la tarjeta'
          autoCapitalize='characters'
        />
        <PaymentInput
          control={control}
          name='number'
          label='Número de la tarjeta'
          placeholder='0000 0000 0000 0000'
          keyboardType='numeric'
          maxLength={19}
        />
        <View style={{
          flexDirection: 'row',
          gap: 16
        }}
        >
          <View style={{ flexGrow: 1 }}>
            <PaymentInput
              control={control}
              name='expiration'
              label='Fecha de expiración'
              placeholder='MM/YY'
              maxLength={5}
              keyboardType='numeric'
            />
          </View>
          <View style={{ flexGrow: 1 }}>
            <PaymentInput
              control={control}
              name='cvv'
              label='Código de seguridad'
              placeholder='xxx'
              secureTextEntry
              maxLength={3}
              keyboardType='numeric'
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          padding: 8,
          marginTop: 16,
          width: '90%'
        }}
        onPress={handleSubmit(handlePayment)}
      >
        <Text style={{
          fontWeight: 'bold',
          color: COLORS.white,
          fontSize: 16,
          textAlign: 'center'
        }}
        >Pagar
        </Text>
      </TouchableOpacity>
    </View>
  )
}
