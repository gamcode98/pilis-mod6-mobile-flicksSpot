import { LinearGradient } from 'expo-linear-gradient'
import { Animated, FlatList, Image, View } from 'react-native'
import { carouselConfig } from '../utils'
import { styles } from '../TicketScreen.styles'

export const Backdrop = ({ tickets, scrollX }) => {
  const { BACKDROP_HEIGHT, ITEM_SIZE, height, width } = carouselConfig

  return (
    <View style={styles.backdropContainer}>
      <FlatList
        data={tickets.reverse()}
        keyExtractor={(item) => item.movieId.toString() + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.details) {
            return null
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width]
          })
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden'
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute'
                }}
              />
            </Animated.View>
          )
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0
        }}
      />
    </View>
  )
}
