export function formatTime (hour, minutes) {
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  if (hour > 12) {
    const formattedTime = `${formattedHour}:${formattedMinutes} PM`
    return formattedTime
  } else {
    const formattedTime = `${formattedHour}:${formattedMinutes} AM`
    return formattedTime
  }
}
