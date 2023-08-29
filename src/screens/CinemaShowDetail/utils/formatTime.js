export const formatTime = (hour, minutes) => {
  if (hour > 12) {
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} PM`
    return formattedTime
  } else {
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} AM`
    return formattedTime
  }
}
