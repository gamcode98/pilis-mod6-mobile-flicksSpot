import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './CinemaShowDetailScreen.styles'
// import { configCarousel } from './utils/configCarousel'
import { useState } from 'react'
import { DateItem } from './components/DateItem'
import { ScheduleItem } from './components/ScheduleItem'
import { CartIcon, IconContainer } from '../../icons'

// const { FULL_SIZE } = configCarousel

export const CinemaShowDetailScreen = (props) => {
  const { route } = props
  const { item: { image, title, gender, description, cinemaShows } } = route.params
  const [selectedHall, setSelectedHall] = useState(cinemaShows[0].room)
  const [selectedDate, setSelectedDate] = useState(cinemaShows[0].date)
  const [availableCinemaShows, setAvailableCinemaShows] = useState(() => {
    return cinemaShows.filter(cinemaShow => cinemaShow.room.id === cinemaShows[0].room.id)
  })
  const [availableSchedules, setAvailableSchedules] = useState([{
    id: cinemaShows[0].id,
    hour: cinemaShows[0].hour,
    minutes: cinemaShows[0].minutes
  }])
  const [totalPayment, setTotalPayment] = useState(0)

  const halls = cinemaShows
    .map(cinemaShow => cinemaShow.room)
    .filter((hall, index, self) => {
      return self.findIndex((h) => h.name === hall.name) === index
    })

  const handleSelectHall = (hall) => {
    setSelectedHall(hall)
    const data = cinemaShows.filter(cinemaShow => cinemaShow.room.id === hall.id)
    setSelectedDate(data[0].date)
    setAvailableCinemaShows(data)
    const result = data.filter(cinemaShow => cinemaShow.date === data[0].date)
    setAvailableSchedules(result)
  }

  const handleSelectDate = (date) => {
    setSelectedDate(date)
    const result = availableCinemaShows.filter(cinemaShow => cinemaShow.date === date)
    setAvailableSchedules(result)
  }

  const handleTotalPayment = (value) => {
    const { price } = availableCinemaShows.find(cinemaShow => cinemaShow.date === selectedDate)
    setTotalPayment(value * price)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.9 }}
          end={{ x: 0, y: 0.2 }}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.01 }}
          end={{ x: 0, y: 0.3 }}
        />
        <Image
          source={{ uri: image.url }}
          style={styles.image}
          resizeMode='cover'
        />
        <View style={styles.movieDetails}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>{gender}</Text>
          </View>
          <Text style={styles.movieName}>{title}</Text>
          <Text style={styles.moviePlot}>{description}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.optionsTitle}>Elegir película por</Text>
          <Text style={styles.hallsTitle}>Salas:</Text>
          <View style={styles.hallsContainer}>
            {
              halls.map(hall => (
                <TouchableOpacity
                  key={hall.id}
                  style={[styles.hall, { borderColor: selectedHall?.id === hall.id ? '#F9B208' : '#000' }]}
                  onPress={() => handleSelectHall(hall)}
                >
                  <Text style={{
                    color: selectedHall?.id === hall.id ? '#F9B208' : '#000'
                  }}
                  >{hall.name}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <Text style={styles.availableDatesTitle}>Fechas disponibles:</Text>
          <View style={{ marginBottom: 16 }}>
            <FlatList
              data={availableCinemaShows}
              horizontal
              showsHorizontalScrollIndicator={false}
              // snapToInterval={FULL_SIZE}
              ItemSeparatorComponent={<Text style={{ marginHorizontal: 8 }} />}
              decelerationRate='fast'
              keyExtractor={item => item.id}
              renderItem={({ item: { date } }) =>
                <DateItem
                  date={date}
                  selectedDate={selectedDate}
                  handleSelectDate={handleSelectDate}
                />}
            />
          </View>
          <Text style={{ marginBottom: 8 }}>Horarios disponibles:</Text>
          <View style={{ marginBottom: 16 }}>
            <FlatList
              data={availableSchedules}
              horizontal
              showsHorizontalScrollIndicator={false}
              // snapToInterval={FULL_SIZE}
              ItemSeparatorComponent={<Text style={{ marginHorizontal: 8 }} />}
              decelerationRate='fast'
              keyExtractor={item => item.id}
              renderItem={({ item: { hour, minutes } }) => <ScheduleItem hour={hour} minutes={minutes} />}
            />
          </View>
          <Text style={{ marginBottom: 8 }}>Cantidad de boletos:</Text>
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginBottom: 8
              }}
              keyboardType='numeric'
              maxLength={2}
              placeholder='Ingresa la cantidad de boletos'
              onChangeText={value => handleTotalPayment(value)}
            />
            <Text style={{ marginBottom: 8 }}>Total a pagar: ${totalPayment}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#F9B208',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginBottom: 32,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <IconContainer color='#000'>
              <CartIcon />
            </IconContainer>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>Añadir al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
