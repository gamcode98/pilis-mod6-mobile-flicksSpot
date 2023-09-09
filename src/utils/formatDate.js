export const formatDate = (date) => {
  const targetDate = new Date(date)

  const numberDay = (targetDate.getDate() + 1).toString().padStart(2, '0')

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

  const day = daysOfWeek[targetDate.getDay()]

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const month = months[targetDate.getMonth()]

  return {
    numberDay,
    day,
    month
  }
}
