import { Text, TouchableOpacity } from 'react-native'
import { COLORS, formatDate } from '../../../../utils'
import { styles } from './DateItem.styles'

export const DateItem = (props) => {
  const { date, selectedDate, handleSelectDate } = props

  const { day, month, numberDay } = formatDate(date)

  return (
    <TouchableOpacity
      onPress={() => handleSelectDate(date)}
      style={[styles.dateItemBtn, { borderColor: selectedDate === date ? COLORS.primary : COLORS.black }]}
    >
      <Text style={{ color: selectedDate === date ? COLORS.primary : COLORS.black }}>{month}</Text>
      <Text style={[styles.numberDay, { color: selectedDate === date ? COLORS.primary : COLORS.black }]}>{numberDay}</Text>
      <Text style={{ color: selectedDate === date ? COLORS.primary : COLORS.black }}>{day}</Text>
    </TouchableOpacity>
  )
}
