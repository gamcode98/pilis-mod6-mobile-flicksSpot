import { Animated, View, Dimensions } from 'react-native'
import { DATA } from '../utils/data'

const { width } = Dimensions.get('screen')

export const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row' }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          exrapolate: 'clamp'
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          exrapolate: 'clamp'
        })

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#000',
              marginHorizontal: 10,
              marginTop: 20,
              opacity,
              transform: [{ scale }]
            }}
          />
        )
      })}
    </View>
  )
}
