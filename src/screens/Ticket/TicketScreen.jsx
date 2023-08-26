import {
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  Text
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { getTickets } from './services/tickets'
import { Loader } from '../../components/Loader'

const { width, height } = Dimensions.get('window')

const SPACING = 10
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.65

function formatDate (date) {
  // Define the names of months in English
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  // Split the date into year, month, and day
  const dateParts = date.split('-')
  const month = monthNames[parseInt(dateParts[1]) - 1] // Subtract 1 because months in JavaScript start at 0
  const day = dateParts[2]

  // Create the formatted string
  const formattedDate = `${day} de ${month} `

  return formattedDate
}

function formatTime (hour, minutes) {
  if (hour > 12) {
    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedTime = `${formattedHour}:${formattedMinutes} PM`
    return formattedTime
  } else {
    const formattedHour = hour.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedTime = `${formattedHour}:${formattedMinutes} AM`
    return formattedTime
  }
}

// const Loading = () => (
//   <View style={styles.loadingContainer}>
//     <Text style={styles.paragraph}>Loading...</Text>
//   </View>
// )

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.id.toString() + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.cinemaShow) {
            // console.log('item.backdrop', item);
            return null
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width]
            // extrapolate: 'clamp'
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
                source={{ uri: item.cinemaShow.movie.image.url }}
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

export const TicketScreen = () => {
  const [tickets, setTickets] = useState([])
  const scrollX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const fetchData = async () => {
      const tickets = await getTickets()
      setTickets([{ id: 'empty-left' }, ...tickets, { id: 'empty-right' }])
    }

    if (tickets.length === 0) {
      fetchData(tickets)
    }
  }, [tickets])

  if (tickets.length === 0) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={tickets} scrollX={scrollX} />
      <StatusBar style='light' />
      {/* <StatusBar hidden /> */}
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={tickets}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
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
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 1,
                  // padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                  borderRadius: 34
                  // position: 'relative'
                }}
              >
                <Image
                  source={{ uri: item.cinemaShow.movie.image.url }}
                  style={styles.posterImage}
                />
              </Animated.View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                // position: 'absolute',
                // top: 300,
                marginTop: 60,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '90%',
                backgroundColor: 'white',
                paddingVertical: 16,
                paddingHorizontal: 8,
                borderRadius: 8
              }}
              >
                <Text style={{
                  fontWeight: '800',
                  fontSize: 18,
                  marginBottom: 8,
                  textAlign: 'center'
                }}
                >{item.cinemaShow.movie.title}
                </Text>
                <Text style={{
                  marginBottom: 8
                }}
                >{formatDate(item.cinemaShow.date)} a las {formatTime(item.cinemaShow.hour, item.cinemaShow.minutes)}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  gap: 16,
                  marginBottom: 8
                }}
                >
                  <Text>Cantidad: {item.quantity}</Text>
                  <Text>Sala: {item.cinemaShow.room.name}</Text>
                </View>
                <TouchableOpacity style={{
                  backgroundColor: '#f5c518',
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8

                }}
                >
                  <Text style={{ color: '#000', fontWeight: '800' }}>Mostrar código QR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0
    // marginBottom: 10
  }
})
