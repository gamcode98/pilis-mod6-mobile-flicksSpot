import { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { styles } from './NotFound.styles'

export const NotFound = () => {
  const animationRef = useRef(null)

  useEffect(() => {
    animationRef.current?.play(0, 200)
    return () => animationRef.current?.reset()
  }, [])

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.paragraph}>
        Lo sentimos, la película que buscas no está disponible en este momento.
      </Text>
      <LottieView
        ref={animationRef}
        style={styles.lottie}
        source={require('../../lotties/not-found.json')}
      />
    </View>
  )
}
