/* eslint-disable react/jsx-handler-names */
import { useController } from 'react-hook-form'
import { styles } from './PaymentInput.styles'
import { Image, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'

export function PaymentInput (props) {
  const { control, name, label, children, ...restOfProps } = props
  const [cardType, setCardType] = useState('')

  const creditCardsRegex = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[0-5][0-9]{14}$/,
    americanExpress: /^3[47][0-9]{13}$/
  }

  const {
    field,
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules: { required: true }
  })

  const creditCardImages = {
    visa: <Image source={require('./../../assets/icons/visa.png')} style={{ width: 20, height: 20 }} />,
    masterCard: <Image source={require('./../../assets/icons/mastercard.png')} style={{ width: 20, height: 20 }} />,
    americanExpress: <Image source={require('./../../assets/icons/american-express.png')} style={{ width: 20, height: 20 }} />
  }

  const getCardType = (cardNumber) => {
    const firstFourDigits = cardNumber.slice(0, 4)

    if (/^4/.test(firstFourDigits)) {
      console.log('visa')
      return 'visa'
    } else if (/^5[0-5]/.test(firstFourDigits)) {
      console.log('mastercard')
      return 'masterCard'
    } else if (/^3[47]/.test(firstFourDigits)) {
      console.log('american')
      return 'americanExpress'
    } else {
      console.log('desconocido')
      return 'Desconocido'
    }
  }

  const handleChange = (value) => {
    const currentValue = value?.replace(/\D/g, '')

    const formattedValue = currentValue.replace(/(\d{4})(?=\d)/g, '$1 ')

    // console.log(getCardType(formattedValue))
    setCardType(getCardType(formattedValue))

    field.onChange(formattedValue)
  }

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={invalid ? styles.inputError : styles.input}
          onBlur={field.onBlur}
          value={field.value}
          onChangeText={(value) => handleChange(value)}
          {...restOfProps}
        />
        {children}
        <View style={{ borderWidth: 1, height: 50, width: 50 }}>
          {creditCardImages[cardType]}
        </View>
      </View>
      {invalid &&
        <View style={styles.errorContainer}>
          <MaterialIcons name='error-outline' size={20} color='red' />
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>}
    </View>
  )
}
