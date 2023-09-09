import { useState } from 'react'

export const useCinemaShowDetail = (halls, cinemaShows, defaultDate) => {
  const [selectedCinemaShow, setSelectedCinemaShow] = useState({
    hall: halls[0],
    availableCinemaShows: cinemaShows[`${halls[0].id}-${halls[0].name}`],
    date: defaultDate(),
    availableSchedules: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()],
    schedule: {
      hour: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()][0].hour,
      minutes: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()][0].minutes
    },
    totalPayment: 0
  })

  const handleSelectHall = (hall) => {
    setSelectedCinemaShow(() => {
      const hallObject = cinemaShows[`${hall.id}-${hall.name}`]
      const datesInHall = Object.keys(hallObject)
      const schedulesInDate = hallObject[datesInHall[0]]
      return {
        hall,
        availableCinemaShows: cinemaShows[`${hall.id}-${hall.name}`],
        date: datesInHall[0],
        availableSchedules: schedulesInDate,
        schedule: {
          hour: schedulesInDate[0].hour,
          minutes: schedulesInDate[0].minutes
        },
        totalPayment: 0
      }
    })
  }

  const handleSelectDate = (date) => {
    setSelectedCinemaShow(prevState => {
      const hallObject = cinemaShows[`${prevState.hall.id}-${prevState.hall.name}`]
      const schedulesInDate = hallObject[date]
      return {
        ...prevState,
        date,
        availableSchedules: schedulesInDate,
        schedule: {
          hour: schedulesInDate[0].hour,
          minutes: schedulesInDate[0].minutes
        },
        totalPayment: 0
      }
    })
  }

  const handleSelectSchedule = (hour, minutes) => {
    setSelectedCinemaShow(prevState => {
      const schedulesInDate = prevState.availableSchedules
      const foundSchedule = schedulesInDate.find(schedule => {
        return schedule.hour === hour && schedule.minutes === minutes
      })

      return {
        ...prevState,
        schedule: foundSchedule,
        totalPayment: 0
      }
    })
  }

  const handleTotalPayment = (value) => {
    const { price } = selectedCinemaShow.availableSchedules[0]
    setSelectedCinemaShow(prevState => {
      return {
        ...prevState,
        totalPayment: value * price
      }
    })
  }

  return {
    selectedCinemaShow,
    handleSelectDate,
    handleSelectHall,
    handleSelectSchedule,
    handleTotalPayment
  }
}
