import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import { styles } from './LoaderBtn.styles'

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
        source={require('../../lotties/btn-loader.json')}
      />
    </View>
  )
}
