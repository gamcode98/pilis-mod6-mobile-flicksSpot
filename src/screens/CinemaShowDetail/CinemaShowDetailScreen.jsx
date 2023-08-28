/* eslint-disable no-prototype-builtins */
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { CartIcon, IconContainer } from '../../icons'
import { ScheduleItem, DateItem } from './components'
import { formatHalls } from './utils/formatHalls'
import { styles } from './CinemaShowDetailScreen.styles'
import { SECURE_STORE_KEYS, getItem, saveItem } from '../../utils'

export const CinemaShowDetailScreen = (props) => {
  const { route } = props
  const { item: { image, title, gender, description, cinemaShows } } = route.params
  const { halls } = formatHalls(cinemaShows)

  const defaultDate = () => {
    const hallObject = cinemaShows[`${halls[0].id}-${halls[0].name}`]
    const datesInHall = Object.keys(hallObject)
    return datesInHall[0]
  }

  const [selectedCinemaShow, setSelectedCinemaShow] = useState({
    hall: halls[0],
    availableCinemaShows: cinemaShows[`${halls[0].id}-${halls[0].name}`],
    date: defaultDate(),
    availableSchedules: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()],
    schedule: {
      hour: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()][0].hour,
      minutes: cinemaShows[`${halls[0].id}-${halls[0].name}`][defaultDate()][0].minutes
    },
    totalPayment: 0
  })

  const handleSelectHall = (hall) => {
    setSelectedCinemaShow(() => {
      const hallObject = cinemaShows[`${hall.id}-${hall.name}`]
      const datesInHall = Object.keys(hallObject)
      const schedulesInDate = hallObject[datesInHall[0]]
      return {
        hall,
        availableCinemaShows: cinemaShows[`${hall.id}-${hall.name}`],
        date: datesInHall[0],
        availableSchedules: schedulesInDate,
        schedule: {
          hour: schedulesInDate[0].hour,
          minutes: schedulesInDate[0].minutes
        },
        totalPayment: 0
      }
    })
  }

  const handleSelectDate = (date) => {
    setSelectedCinemaShow(prevState => {
      const hallObject = cinemaShows[`${prevState.hall.id}-${prevState.hall.name}`]
      const schedulesInDate = hallObject[date]
      return {
        ...prevState,
        date,
        availableSchedules: schedulesInDate,
        schedule: {
          hour: schedulesInDate[0].hour,
          minutes: schedulesInDate[0].minutes
        },
        totalPayment: 0
      }
    })
  }

  const handleSelectSchedule = (hour, minutes) => {
    setSelectedCinemaShow(prevState => {
      const schedulesInDate = prevState.availableSchedules
      const foundSchedule = schedulesInDate.find(schedule => {
        return schedule.hour === hour && schedule.minutes === minutes
      })

      return {
        ...prevState,
        schedule: foundSchedule,
        totalPayment: 0
      }
    })
  }

  const handleTotalPayment = (value) => {
    const { price } = selectedCinemaShow.availableSchedules[0]
    setSelectedCinemaShow(prevState => {
      return {
        ...prevState,
        totalPayment: value * price
      }
    })
  }

  const addToCart = async () => {
    const { price } = selectedCinemaShow.availableSchedules[0]
    const { totalPayment, schedule, availableSchedules } = selectedCinemaShow

    const cinemaShow = availableSchedules.find(cinemaShow => {
      return cinemaShow.hour === schedule.hour && cinemaShow.minutes === schedule.minutes
    })

    if (totalPayment === 0) {
      ToastAndroid.show('Debes ingresar la cantidad de boletos que deseas', ToastAndroid.SHORT)
      return
    }
    const item = {
      cinemaShowId: cinemaShow.id,
      title,
      image: image.url,
      unitPrice: price,
      quantity: totalPayment / price
    }
    const cart = await getItem(SECURE_STORE_KEYS.CART)

    if (cart === null) {
      const items = [item]
      await saveItem(SECURE_STORE_KEYS.CART, JSON.stringify(items))
      ToastAndroid.show('Agregado al carrito', ToastAndroid.SHORT)
      return
    }

    const cartParsed = JSON.parse(cart)

    const itemFound = cartParsed.find(cartItem => cartItem.cinemaShowId === item.cinemaShowId)

    if (itemFound !== undefined) {
      const indexFound = cartParsed.findIndex(cartItem => cartItem.cinemaShowId === item.cinemaShowId)

      cartParsed[indexFound] = {
        ...item,
        quantity: itemFound.quantity + item.quantity
      }
      await saveItem(SECURE_STORE_KEYS.CART, JSON.stringify(cartParsed))
      ToastAndroid.show('Agregado al carrito', ToastAndroid.SHORT)
    } else {
      await saveItem(SECURE_STORE_KEYS.CART, JSON.stringify([...cartParsed, item]))
      ToastAndroid.show('Agregado al carrito', ToastAndroid.SHORT)
    }
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
                  style={[styles.hall, { borderColor: selectedCinemaShow.hall.id === hall.id ? '#F9B208' : '#000' }]}
                  onPress={() => handleSelectHall(hall)}
                >
                  <Text style={{
                    color: selectedCinemaShow.hall.id === hall.id ? '#F9B208' : '#000'
                  }}
                  >{hall.name}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <Text style={styles.availableDatesTitle}>Fechas disponibles:</Text>
          <View style={styles.availableSchedulesContainer}>
            <FlatList
              data={Object.keys(selectedCinemaShow.availableCinemaShows)}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={<Text style={styles.itemSeparator} />}
              decelerationRate='fast'
              keyExtractor={item => item}
              renderItem={({ item }) =>
                <DateItem
                  date={item}
                  selectedDate={selectedCinemaShow.date}
                  handleSelectDate={handleSelectDate}
                />}
            />
          </View>
          <Text style={styles.availableSchedulesTitle}>Horarios disponibles:</Text>
          <View style={styles.schedulesContainer}>
            <FlatList
              data={selectedCinemaShow.availableSchedules}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={<Text style={styles.itemSeparator} />}
              decelerationRate='fast'
              keyExtractor={item => item.id}
              renderItem={({ item: { hour, minutes } }) =>
                <ScheduleItem
                  selectedSchedule={selectedCinemaShow.schedule}
                  handleSelectSchedule={handleSelectSchedule}
                  hour={hour}
                  minutes={minutes}
                />}
            />
          </View>
          <Text style={styles.inputPriceTitle}>Cantidad de boletos:</Text>
          <View style={styles.containerInputPrice}>
            <TextInput
              style={styles.inputPrice}
              keyboardType='numeric'
              maxLength={2}
              placeholder='Ingresa la cantidad de boletos'
              onChangeText={value => handleTotalPayment(value)}
            />
            <Text style={styles.totalPaymentTitle}>Total a pagar: ${selectedCinemaShow.totalPayment}</Text>
          </View>
          <TouchableOpacity
            style={styles.btnAddToCart}
            onPress={addToCart}
          >
            <IconContainer color='#000'>
              <CartIcon />
            </IconContainer>
            <Text style={styles.addToCartText}>Añadir al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
