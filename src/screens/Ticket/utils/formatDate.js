export function formatDate (date) {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dateParts = date.split('-')
  const month = monthNames[parseInt(dateParts[1]) - 1]
  const day = dateParts[2]

  const formattedDate = `${day} de ${month} `

  return formattedDate
}
