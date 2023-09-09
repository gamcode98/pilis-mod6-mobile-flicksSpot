import { Animated, Dimensions, StyleSheet } from 'react-native'
import { backGrounds } from '../utils/backGrounds'

const { width } = Dimensions.get('screen')

export const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: backGrounds.map((_, i) => i * width),
    outputRange: backGrounds.map(bg => bg)
  })

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, {
        backgroundColor
      }]}
    />
  )
}
