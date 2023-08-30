/* eslint-disable react/jsx-handler-names */
import { useController } from 'react-hook-form'
import { styles } from './InputControlled.styles'
import { Text, TextInput, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export function InputControlled (props) {
  const { control, name, children, ...restOfProps } = props
  const {
    field,
    fieldState: { invalid, error }
  } = useController({
    name,
    control,
    rules: { required: true }
  })

  return (
    <View style={styles.inputContainer}>
      <View>
        <TextInput
          style={invalid ? styles.inputError : styles.input}
          onBlur={field.onBlur}
          value={field.value}
          onChangeText={field.onChange}
          autoCapitalize='none'
          {...restOfProps}
        />
        {children}
      </View>
      {invalid &&
        <View style={styles.errorContainer}>
          <MaterialIcons name='error-outline' size={20} color='red' />
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>}
    </View>
  )
}
