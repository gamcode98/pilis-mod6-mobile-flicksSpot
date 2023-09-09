import { View } from 'react-native'
import { styles } from './Loader.styles'
import LottieView from 'lottie-react-native'

export function Loader () {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={styles.lottie}
        source={require('../../lotties/loader.json')}
      />
    </View>
  )
}
