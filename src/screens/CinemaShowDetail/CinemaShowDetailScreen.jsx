/* eslint-disable no-prototype-builtins */
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './CinemaShowDetailScreen.styles'
import { useState } from 'react'
import { DateItem } from './components/DateItem'
import { ScheduleItem } from './components/ScheduleItem'
import { CartIcon, IconContainer } from '../../icons'
import { formatHalls } from './utils/formatHalls'

export const CinemaShowDetailScreen = (props) => {
  const { route } = props
  const { item: { image, title, gender, description, cinemaShows } } = route.params
  const { halls } = formatHalls(cinemaShows)
  const [selectedHall, setSelectedHall] = useState(halls[0])
  const [availableCinemaShows, setAvailableCinemaShows] = useState(cinemaShows[`${halls[0].id}-${halls[0].name}`])
  const [selectedDate, setSelectedDate] = useState(() => {
    const hallObject = cinemaShows[`${halls[0].id}-${halls[0].name}`]
    const datesInHall = Object.keys(hallObject)
    return datesInHall[0]
  })
  const [availableSchedules, setAvailableSchedules] = useState(() => {
    const hallObject = cinemaShows[`${halls[0].id}-${halls[0].name}`]
    const datesInHall = Object.keys(hallObject)
    const schedulesInDate = hallObject[datesInHall[0]]
    console.log({ schedulesInDate })
    return schedulesInDate
  })
  const [selectedSchedule, setSelectedSchedule] = useState(() => {
    const hallObject = cinemaShows[`${halls[0].id}-${halls[0].name}`]
    const datesInHall = Object.keys(hallObject)
    const schedulesInDate = hallObject[datesInHall[0]]
    return {
      hour: schedulesInDate[0].hour,
      minutes: schedulesInDate[0].minutes
    }
  })
  const [totalPayment, setTotalPayment] = useState(0)

  const handleSelectHall = (hall) => {
    setSelectedHall(hall)
    setAvailableCinemaShows(cinemaShows[`${hall.id}-${hall.name}`])
    setSelectedDate(() => {
      const hallObject = cinemaShows[`${hall.id}-${hall.name}`]
      const datesInHall = Object.keys(hallObject)
      return datesInHall[0]
    })
    setAvailableSchedules(() => {
      const hallObject = cinemaShows[`${hall.id}-${hall.name}`]
      const datesInHall = Object.keys(hallObject)
      const schedulesInDate = hallObject[datesInHall[0]]
      return schedulesInDate
    })
    setSelectedSchedule(() => {
      const hallObject = cinemaShows[`${hall.id}-${hall.name}`]
      const datesInHall = Object.keys(hallObject)
      const schedulesInDate = hallObject[datesInHall[0]]
      return {
        hour: schedulesInDate[0].hour,
        minutes: schedulesInDate[0].minutes
      }
    })
  }

  const handleSelectDate = (date) => {
    setSelectedDate(date)
    setAvailableSchedules(() => {
      const schedulesInDate = cinemaShows[`${selectedHall.id}-${selectedHall.name}`][date]
      return schedulesInDate
    })
    setSelectedSchedule(() => {
      const schedulesInDate = cinemaShows[`${selectedHall.id}-${selectedHall.name}`][date]
      return {
        hour: schedulesInDate[0].hour,
        minutes: schedulesInDate[0].minutes
      }
    })
  }

  const handleSelectSchedule = (hour, minutes) => {
    setSelectedSchedule(() => {
      const schedulesInDate = cinemaShows[`${selectedHall.id}-${selectedHall.name}`][selectedDate]
      const foundSchedule = schedulesInDate.find(schedule => schedule.hour === hour && schedule.minutes === minutes)
      return foundSchedule
    })
  }

  const handleTotalPayment = (value) => {
    const { price } = availableSchedules[0]
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
                  style={[styles.hall, { borderColor: selectedHall.id === hall.id ? '#F9B208' : '#000' }]}
                  onPress={() => handleSelectHall(hall)}
                >
                  <Text style={{
                    color: selectedHall.id === hall.id ? '#F9B208' : '#000'
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
              data={Object.keys(availableCinemaShows)}
              horizontal
              showsHorizontalScrollIndicator={false}
              // snapToInterval={FULL_SIZE}
              ItemSeparatorComponent={<Text style={{ marginHorizontal: 8 }} />}
              decelerationRate='fast'
              keyExtractor={item => item}
              renderItem={({ item }) =>
                <DateItem
                  date={item}
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
              renderItem={({ item: { hour, minutes } }) =>
                <ScheduleItem
                  selectedSchedule={selectedSchedule}
                  handleSelectSchedule={handleSelectSchedule}
                  hour={hour}
                  minutes={minutes}
                />}
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
