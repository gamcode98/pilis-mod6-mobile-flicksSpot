import { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { styles } from './EmptyCart.styles'

export const EmptyCart = () => {
  const animationRef = useRef(null)

  useEffect(() => {
    animationRef.current?.play(0, 200)
    return () => animationRef.current?.reset()
  }, [])

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.title}>Sin elementos en tu carrito
      </Text>
      <Text style={styles.paragraph}>
        ¿Listo para comprar? Encuentra lo que necesitas y agrégalo al carrito
      </Text>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={animationRef}
          style={styles.lottie}
          source={require('../../lotties/empty.json')}
        />
      </View>
    </View>
  )
}
