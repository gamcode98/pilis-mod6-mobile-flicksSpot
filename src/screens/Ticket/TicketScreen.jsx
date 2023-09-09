import { View, Animated, Platform } from 'react-native'
import { useRef } from 'react'
import { NoContent, NoLogged, Loader } from '../../components'
import { Backdrop, CardItem } from './components'
import { carouselConfig } from './utils'
import { styles } from './TicketScreen.styles'
import { useTickets } from './hooks/useTickets'

const { ITEM_SIZE, EMPTY_ITEM_SIZE } = carouselConfig

export const TicketScreen = () => {
  const { error, isLoading, tickets } = useTickets()

  const scrollX = useRef(new Animated.Value(0)).current

  if (error) {
    return <NoLogged />
  }

  if (isLoading) {
    return <Loader />
  }

  if (tickets.length === 0) {
    return <NoContent />
  }

  return (
    <View style={styles.container}>
      <Backdrop tickets={tickets} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={tickets}
        keyExtractor={(item) => item.movieId.toString()}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.contentContainerStyle}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.details) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE
          ]

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp'
          })

          return (
            <CardItem
              item={item}
              translateY={translateY}
            />
          )
        }}
      />
    </View>
  )
}
