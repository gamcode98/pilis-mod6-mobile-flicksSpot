import { useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { SECURE_STORE_KEYS, getItem, removeItem, saveItem } from '../../../utils'
import { payment } from '../services/payment'

export const useCart = (route) => {
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, setReloadUserData } = useCurrentUser()

  useEffect(() => {
    getItem(SECURE_STORE_KEYS.CART)
      .then(cartStored => {
        setCart(cartStored ? JSON.parse(cartStored) : null)
        setIsLoading(false)
      })
      .catch(() => ToastAndroid.show('Ups, algo salió mal', ToastAndroid.SHORT))
  }, [route.params])

  const handleRemoveItem = async (cinemaShowId) => {
    const cart = await getItem(SECURE_STORE_KEYS.CART)
    const cartParsed = JSON.parse(cart)
    const cartFiltered = cartParsed.filter(cartItem => cartItem.cinemaShowId !== cinemaShowId)
    await saveItem(SECURE_STORE_KEYS.CART, JSON.stringify(cartFiltered))
    setCart(cartFiltered)
  }

  const handleTicketsInCart = async (cinemaShowId, operation) => {
    const options = {
      increment: +1,
      decrement: -1
    }

    const cart = await getItem(SECURE_STORE_KEYS.CART)
    const cartParsed = JSON.parse(cart)
    const indexFound = cartParsed.findIndex(cartItem => cartItem.cinemaShowId === cinemaShowId)

    if (cartParsed[indexFound].quantity + options[operation] <= 0) {
      ToastAndroid.show('Debes al menos tener un ticket en el carrito', ToastAndroid.SHORT)
      return
    }

    if (cartParsed[indexFound].quantity + options[operation] > cartParsed[indexFound].capacityAvailable) {
      ToastAndroid.show('Límite alcanzado', ToastAndroid.SHORT)
      return
    }

    cartParsed[indexFound] = {
      ...cartParsed[indexFound],
      quantity: cartParsed[indexFound].quantity + options[operation]
    }

    await saveItem(SECURE_STORE_KEYS.CART, JSON.stringify(cartParsed))

    setCart(cartParsed)
  }

  const handlePayment = () => {
    if (currentUser === null) {
      ToastAndroid.show('Debes iniciar sesión para poder realizar tu pago', ToastAndroid.SHORT)
      return
    }

    const items = cart.map(cartItem => {
      const { cinemaShowId, title, unitPrice, quantity } = cartItem
      return {
        cinemaShowId,
        title,
        unitPrice,
        quantity
      }
    })

    payment(items)
      .then(() => {
        setReloadUserData(prevState => !prevState)
        ToastAndroid.show('Pago realizado con éxito', ToastAndroid.SHORT)
      })
      .catch(() => {
        ToastAndroid.show('Ups, algo salió mal', ToastAndroid.SHORT)
      })
      .finally(() => {
        removeItem(SECURE_STORE_KEYS.CART)
        setCart(null)
      })
  }

  return {
    cart,
    isLoading,
    handleTicketsInCart,
    handleRemoveItem,
    handlePayment
  }
}
