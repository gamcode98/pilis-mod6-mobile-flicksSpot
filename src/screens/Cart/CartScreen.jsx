/* eslint-disable react/jsx-closing-tag-location */
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { EmptyCart, Loader } from '../../components'
import { styles } from './Cart.styles'
import { CartItem } from './components/CartItem/CartItem'
import { useCart } from './hooks/useCart'

export const CartScreen = (props) => {
  const { route, navigation } = props
  const { cart, isLoading, handlePayment, goCheckout, handleRemoveItem, handleTicketsInCart } = useCart(route, navigation)

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {
        cart === null || cart.length === 0
          ? <EmptyCart />
          : <View style={styles.container}>
            <View style={styles.subContainer}>
              <FlatList
                data={cart}
                keyExtractor={item => item.cinemaShowId}
                renderItem={({ item }) =>
                  <CartItem
                    item={item}
                    handleTicketsInCart={handleTicketsInCart}
                    handleRemoveItem={handleRemoveItem}
                  />}
                ListHeaderComponent={() => {
                  return (
                    <View style={styles.headerContainer}>
                      <Text style={styles.headerTitle}>Mi carrito</Text>
                    </View>
                  )
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                  return (
                    <View style={styles.footerContainer}>
                      <Text style={styles.footerTitle}>Total: ${cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)}</Text>
                      <TouchableOpacity
                        style={styles.paymentButton}
                        // onPress={handlePayment}
                        onPress={goCheckout}
                      >
                        <Text style={styles.buttonTitle}>Pagar</Text>
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
