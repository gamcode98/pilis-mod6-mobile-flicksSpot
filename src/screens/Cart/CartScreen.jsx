/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { SECURE_STORE_KEYS, formatLongDate, formatTime, getItem, removeItem, saveItem } from '../../utils'
import { IconContainer, MinusIcon, PlusIcon, TrashIcon } from '../../icons'
import { EmptyCart, Loader } from '../../components'
import useCurrentUser from '../../hooks/useCurrentUser'
import { payment } from './services/payment'

export const CartScreen = (props) => {
  const { route } = props
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
      .then(data => {
        console.log({ data })
        setReloadUserData(prevState => !prevState)
        ToastAndroid.show('Pago realizado con éxito', ToastAndroid.SHORT)
      })
      .catch((error) => {
        console.log('error -> ', error)
        ToastAndroid.show('Ups, algo salió mal', ToastAndroid.SHORT)
      })
      .finally(() => {
        removeItem(SECURE_STORE_KEYS.CART)
        setCart(null)
      })
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {
        cart === null || cart.length === 0
          ? <EmptyCart />
          : <View style={{ flex: 1, marginTop: 40, alignItems: 'center' }}>
            <View style={{ width: '94%' }}>
              <FlatList
                data={cart}
                keyExtractor={item => item.cinemaShowId}
                renderItem={({ item }) => {
                  return (
                    <View style={{
                      marginBottom: 16,
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      paddingBottom: 8,
                      flexDirection: 'row',
                      gap: 16,
                      position: 'relative'
                    }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 100, height: 100 }}
                      />
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                        <Text style={{
                          fontSize: 12,
                          color: '#aaa',
                          marginBottom: 8
                        }}
                        >{formatLongDate(item.date)} a las {formatTime(item.hour, item.minutes)} - {item.hall}</Text>
                        <Text style={{ fontSize: 14, color: '#000', opacity: 0.7, marginBottom: 16 }}>Subtotal: ${item.unitPrice * item.quantity}</Text>

                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                          <TouchableOpacity
                            style={{ padding: 6, borderRadius: 100, borderWidth: 1, borderColor: '#ccc' }}
                            onPress={() => handleTicketsInCart(item.cinemaShowId, 'decrement')}
                          >
                            <IconContainer size={20}>
                              <MinusIcon />
                            </IconContainer>
                          </TouchableOpacity>
                          <Text>{item.quantity}</Text>
                          <TouchableOpacity
                            style={{ padding: 6, borderRadius: 100, borderWidth: 1, borderColor: '#ccc' }}
                            onPress={() => handleTicketsInCart(item.cinemaShowId, 'increment')}
                          >
                            <IconContainer size={20}>
                              <PlusIcon />
                            </IconContainer>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          right: 0,
                          padding: 6,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: '#ccc'
                        }}
                        onPress={() => handleRemoveItem(item.cinemaShowId)}
                      >
                        <IconContainer size={20}>
                          <TrashIcon />
                        </IconContainer>
                      </TouchableOpacity>
                    </View>
                  )
                }}
                ListHeaderComponent={() => {
                  return (
                    <View style={{
                      width: '94%'
                    }}
                    >
                      <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32,
                        textAlign: 'center',
                        marginBottom: 30
                      }}
                      >Mi carrito</Text>
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{ textAlign: 'right', width: '94%' }}>Total: ${cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)}</Text>
                      <TouchableOpacity
                        style={{
                          padding: 16,
                          borderRadius: 4,
                          marginTop: 16,
                          backgroundColor: '#F9B208'
                        }}
                        onPress={handlePayment}
                      >
                        <Text style={{ fontWeight: 'bold' }}>Pagar</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              />
            </View>
          </View>
      }
    </>

  )
}
