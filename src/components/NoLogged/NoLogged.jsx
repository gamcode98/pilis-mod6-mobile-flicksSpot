import { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { styles } from './NoLogged.styles'

export const NoLogged = () => {
  const animationRef = useRef(null)

  useEffect(() => {
    animationRef.current?.play(0, 200)
    return () => animationRef.current?.reset()
  }, [])

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.title}>¿Listo para el cine?
      </Text>
      <Text style={styles.paragraph}>
        Iniciar sesión te permitirá ver tus tickets y detalles de funciones.
      </Text>
      <LottieView
        ref={animationRef}
        style={styles.lottie}
        source={require('../../lotties/dancing-llama.json')}
      />
    </View>
  )
}
