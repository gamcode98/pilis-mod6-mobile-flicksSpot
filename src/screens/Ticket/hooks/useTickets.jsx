import { useEffect, useState } from 'react'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { getTickets } from '../services/tickets'

export const useTickets = () => {
  const { currentUser, reloadUserData } = useCurrentUser()
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setError(null)
    setIsLoading(true)
    getTickets()
      .then(data => {
        if (data.length !== 0) {
          setTickets([{ movieId: 'empty-left' }, ...data, { movieId: 'empty-right' }])
        } else {
          setTickets([])
        }
      })
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
  }, [currentUser, reloadUserData])

  return {
    tickets,
    isLoading,
    error
  }
}
