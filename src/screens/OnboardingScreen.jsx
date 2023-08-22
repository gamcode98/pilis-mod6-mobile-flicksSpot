import * as React from 'react'
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { save } from '../utils/secureStorage'
const { width, height } = Dimensions.get('screen')

// const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF']
const bgs = ['#F7FD04', '#F9B208', '#F98404', '#FC5404']
// const bgs = ['#f5c518', '#f5c518', '#f5c518', '#f5c518']
const DATA = [
  {
    key: '3571572',
    title: '¡Bienvenido a flicksSpot!',
    description: 'Descubre una nueva forma de disfrutar del cine. Compra boletos de manera fácil y rápida. ¡Comencemos!',
    image: require('./../assets/welcome.png')
  },
  {
    key: '3571747',
    title: 'Explora Películas',
    description: 'Busca tus películas favoritas, consulta los horarios de proyección y descubre las sinopsis. Navega por nuestro amplio catálogo y elige tu próxima película.',
    image: require('./../assets/cinema.png')
  },
  {
    key: '3571680',
    title: 'Compra tus boletos',
    description: 'Selecciona una película, elige la función y el número de boletos. Luego, procede al pago seguro. ¡Listo para disfrutar del cine!',
    image: require('./../assets/ticket.png')
  },
  {
    key: '3571603',
    title: 'Tu cuenta',
    description: 'Administra tus boletos. Mantén un registro de tus próximas funciones y boletos comprados.',
    image: require('./../assets/alpaca.png')
  }
]

const Indicator = ({ scrollX }) => {
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
              // backgroundColor: '#fff',
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

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg)
  })

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, {
        backgroundColor
      }]}
    />
  )
}

const Square = ({ scrollX }) => {
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

export const OnboardingScreen = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current

  return (

    <View style={styles.container}>
      <StatusBar hidden />
      {/* <Backdrop scrollX={scrollX} /> */}
      {/* <Square scrollX={scrollX} /> */}
      <Animated.FlatList
        data={DATA}
        scrollEventThrottle={32}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: 'center', padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: 'center' }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain'
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={{ fontWeight: '800', fontSize: 28, marginBottom: 10 }}>{item.title}</Text>
                {/* <Text style={{ fontWeight: '800', fontSize: 28, marginBottom: 10, color: '#fff' }}>{item.title}</Text> */}
                <Text style={{ fontWeight: '300' }}>{item.description}</Text>
                {/* <Text style={{ color: '#fff', fontWeight: '300' }}>{item.description}</Text> */}
                {item.key === '3571603' &&
                  <TouchableOpacity
                    style={{
                      // backgroundColor: '#fff',
                      backgroundColor: '#F9B208',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      marginVertical: 20
                    }}
                    onPress={() => save('onboarded', '1')}
                  >
                    <Text style={{
                      color: '#000',
                      fontWeight: '700',
                      fontSize: 16,
                      textAlign: 'center',
                      opacity: 0.7
                    }}
                    >Empezar
                    </Text>
                  </TouchableOpacity>}
              </View>
            </View>
          )
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
