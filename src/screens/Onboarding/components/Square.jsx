import { Animated, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

export const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(
      Animated.modulo(scrollX, width),
      new Animated.Value(width)
    ), 1)

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  })

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0]
  })

  return (
    <Animated.View style={{
      width: height,
      height: height - 30,
      backgroundColor: '#fff',
      borderRadius: 86,
      top: -height * 0.6,
      left: -height * 0.3,
      position: 'absolute',
      transform: [{ rotate }, { translateX }]
    }}
    />
  )
}
