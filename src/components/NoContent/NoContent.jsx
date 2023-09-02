import { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { styles } from './NoContent.styles'

export const NoContent = () => {
  const animationRef = useRef(null)

  useEffect(() => {
    animationRef.current?.play(0, 200)
    return () => animationRef.current?.reset()
  }, [])

  return (
    <View style={styles.animationContainer}>
      <Text style={styles.title}>¡Oh no! No tienes tickets de cine en este momento.
      </Text>
      <View style={styles.lottieContainer}>
        <LottieView
          ref={animationRef}
          style={styles.lottie}
          source={require('../../lotties/panda.json')}
        />
      </View>
    </View>
  )
}
