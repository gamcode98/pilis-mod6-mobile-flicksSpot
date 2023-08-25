import { TouchableOpacity, Text } from 'react-native'

export const ScheduleItem = (props) => {
  const { hour, minutes } = props

  const formatTime = () => {
    if (hour > 12) {
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} PM`
      return formattedTime
    } else {
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} AM`
      return formattedTime
    }
  }

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 8
      }}
    >
      <Text>{formatTime()}</Text>
    </TouchableOpacity>
  )
}
