import { TouchableOpacity, Text } from 'react-native'
import { formatTime } from '../../utils/formatTime'
import { styles } from './ScheduleItem.styles'
import { COLORS } from '../../../../utils'

export const ScheduleItem = (props) => {
  const { hour, minutes, selectedSchedule, handleSelectSchedule } = props

  const time = formatTime(hour, minutes)
  const selectedTime = formatTime(selectedSchedule.hour, selectedSchedule.minutes)

  return (
    <TouchableOpacity
      onPress={() => handleSelectSchedule(hour, minutes)}
      style={[styles.scheduleBtn, {
        borderColor: selectedTime === time ? COLORS.primary : COLORS.black
      }]}
    >
      <Text
        style={{ color: selectedTime === time ? COLORS.primary : COLORS.black }}
      >{time}
      </Text>
    </TouchableOpacity>
  )
}
