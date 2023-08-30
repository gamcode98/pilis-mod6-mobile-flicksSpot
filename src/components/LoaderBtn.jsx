import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { COLORS } from '../utils/theme'

export function LoaderBtn () {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 60,
          height: 30,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        source={require('../lotties/btn-loader.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    marginBottom: 8,
    padding: 8,
    borderRadius: 16
  }
})
