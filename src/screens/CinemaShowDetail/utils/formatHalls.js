/* eslint-disable no-prototype-builtins */
export const formatHalls = (cinemaShows) => {
  const halls = []

  for (const key in cinemaShows) {
    if (cinemaShows.hasOwnProperty(key)) {
      const id = Number(key.split('-')[0])
      const name = key.split('-')[1]
      halls.push({ id, name })
    }
  }

  return { halls }
}
