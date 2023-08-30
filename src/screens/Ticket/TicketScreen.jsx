import { View, Animated, Platform } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { getTickets } from './services/tickets'
import { Loader } from '../../components/Loader'
import { Backdrop, CardItem } from './components'
import { carouselConfig } from './utils'
import { styles } from './TicketScreen.styles'
import { NoContent, NoLogged } from '../../components'
import useCurrentUser from '../../hooks/useCurrentUser'

const { ITEM_SIZE, EMPTY_ITEM_SIZE } = carouselConfig

export const TicketScreen = () => {
  const { currentUser } = useCurrentUser()
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // const fetchData = async () => {
    //   const tickets = await getTickets()
    //   console.log({ tickets })
    //   setTickets([{ id: 'empty-left' }, ...tickets, { id: 'empty-right' }])
    // }

    // if (tickets.length === 0) {
    //   fetchData(tickets)
    // }
    setError(null)
    setIsLoading(true)
    getTickets()
      .then(data => {
        console.log(data.length)
        if (data.length !== 0) {
          setTickets([{ id: 'empty-left' }, ...data, { id: 'empty-right' }])
        } else {
          setTickets([])
        }
        // setTickets([{ id: 'empty-left' }, ...data, { id: 'empty-right' }])
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
      .finally(() => setIsLoading(false))
  }, [currentUser])

  if (error) {
    return <NoLogged />
  }

  // if (isLoading) {
  //   return <Loader />
  // }

  // if (tickets.length === 0) {
  //   return <NoContent />
  // }

  return (
    isLoading
      ? <Loader />
      : <>
        {
        tickets.length === 0
          ? <NoContent />
          : <View style={styles.container}>
            <Backdrop tickets={tickets} scrollX={scrollX} />
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              data={tickets}
              keyExtractor={(item) => item.id}
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
                if (!item.cinemaShow) {
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
      }
        </>
  )
}
