import { Dimensions, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')

export function Loader () {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width,
          height
        }}
        source={require('./../lotties/loader.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width,
    height
  }
})
