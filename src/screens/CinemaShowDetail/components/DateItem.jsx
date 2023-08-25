import { Text, TouchableOpacity } from 'react-native'
import { formatDate } from '../../../utils'

export const DateItem = (props) => {
  const { date, selectedDate, handleSelectDate } = props

  const { day, month, numberDay } = formatDate(date)

  // console.log({ selectedDate, date })

  return (
    <TouchableOpacity
      onPress={() => handleSelectDate(date)}
      style={{
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        borderColor: selectedDate === date ? '#F9B208' : '#000'
      }}
    >
      <Text style={{ color: selectedDate === date ? '#F9B208' : '#000' }}>{month}</Text>
      <Text style={{ fontSize: 24, fontWeight: '600', color: selectedDate === date ? '#F9B208' : '#000' }}>{numberDay}</Text>
      <Text style={{ color: selectedDate === date ? '#F9B208' : '#000' }}>{day}</Text>
    </TouchableOpacity>
  )
}
