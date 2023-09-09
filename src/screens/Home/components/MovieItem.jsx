import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { configCarousel } from './../utils/configCarousel'
import { styles } from './../HomeScreen.styles'

const { RADIUS, FULL_SIZE } = configCarousel

export const MovieItem = (props) => {
  const { item, index, scrollX, navigation } = props

  const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1.1, 1]
  })

  const goCinemaShowDetailScreen = () => {
    navigation.navigate('CinemaShowDetailScreen', { item })
  }

  return (
    <TouchableOpacity
      onPress={goCinemaShowDetailScreen}
      activeOpacity={1}
      style={styles.itemContainer}
    >
      <View style={[StyleSheet.absoluteFillObject, { overflow: 'hidden', borderRadius: RADIUS }]}>
        <Animated.Image
          source={{ uri: item.image.url }}
          style={[StyleSheet.absoluteFillObject,
            { resizeMode: 'cover' },
            { transform: [{ scale }] }
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}
