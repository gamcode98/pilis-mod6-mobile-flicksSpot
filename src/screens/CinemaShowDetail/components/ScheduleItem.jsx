import { TouchableOpacity, Text } from 'react-native'
import { formatTime } from '../utils/formatTime'

export const ScheduleItem = (props) => {
  const { hour, minutes, selectedSchedule, handleSelectSchedule } = props

  const time = formatTime(hour, minutes)
  const selectedTime = formatTime(selectedSchedule.hour, selectedSchedule.minutes)

  return (
    <TouchableOpacity
      onPress={() => handleSelectSchedule(hour, minutes)}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: selectedTime === time ? '#F9B208' : '#000'
      }}
    >
      <Text
        style={{
          color: selectedTime === time ? '#F9B208' : '#000'
        }}
      >{time}
      </Text>
    </TouchableOpacity>
  )
}
