/* eslint-disable react/jsx-closing-tag-location */
import { useEffect, useState } from 'react'
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SECURE_STORE_KEYS, getItem } from '../../utils'
import { deleteItemAsync } from 'expo-secure-store'

export const CartScreen = (props) => {
  const { route } = props
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getItem(SECURE_STORE_KEYS.CART)
      .then(cartStored => {
        console.log({ cartStored })
        setCart(cartStored ? JSON.parse(cartStored) : null)
        setIsLoading(false)
      })
      .catch(error => console.log({ error }))
  }, [route.params])

  return (
    isLoading
      ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>
      : <>
        {
          cart && cart.length > 0
            ? <View style={{ flex: 1, marginTop: 40, alignItems: 'center' }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                paddingBottom: 8,
                width: '94%'
              }}
              >
                <Text>Película</Text>
                <Text>Precio</Text>
              </View>
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
                        paddingBottom: 8
                      }}
                      >
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 8
                        }}
                        >
                          <View style={{
                            flexDirection: 'row',
                            gap: 16,
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center'
                          }}
                          >
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                              <Image
                                source={{ uri: item.image }}
                                style={{ width: 70, height: 70 }}
                              />
                              <TouchableOpacity style={{
                                borderColor: '#ccc',
                                borderBottomWidth: 1,
                                alignSelf: 'center',
                                marginTop: 25
                              }}
                              >
                                <Text>Quitar</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'column', gap: 8 }}>
                              <Text style={{ textAlign: 'right' }}>${item.unitPrice}</Text>
                              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                                <Text>Cantidad</Text>
                                <TextInput
                                  keyboardType='numeric'
                                  maxLength={2}
                                  value={item.quantity.toString()}
                                  style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    padding: 8,
                                    width: 40,
                                    textAlign: 'center',
                                    borderRadius: 4
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                        <Text>Título: {item.title}</Text>
                        <Text>Fecha: 30 de Octubre a las 20:00 PM</Text>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cart empty</Text></View>
        }
      </>
  )
}
