import { TouchableOpacity, StyleSheet, Text, View, Animated, TextInput, KeyboardAvoidingView } from 'react-native'
import { locations } from '../utils/locations'
import { tutorial2spec } from '../utils/theme2'
import { useRef } from 'react'
import { StatusBar } from 'expo-status-bar'

const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = tutorial2spec

export const Homev4Screen = () => {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <>
      <StatusBar style='dark' />
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', width: '94%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hola </Text>
          <Text style={{ fontSize: 20 }}>Gabriel </Text>
        </View>
        <Text style={{ fontSize: 14, width: '94%', marginLeft: 'auto', marginRight: 'auto' }}>Compra tu tickets para ver las peliculas que quieras </Text>
        {/* <KeyboardAvoidingView behavior='padding'> */}
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            width: '94%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            paddingVertical: 8,
            paddingHorizontal: 16
          }}
          placeholder='Buscar...'
        />
        {/* </KeyboardAvoidingView> */}

        <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>En cartelera</Text>
        <Animated.FlatList
          data={locations}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          decelerationRate='fast'
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={item => item.key}
          renderItem={({ item, index }) => {
            const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH]
            })
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.1, 1]
            })
            return (
              <TouchableOpacity style={styles.itemContainer}>
                <View style={[StyleSheet.absoluteFillObject, { overflow: 'hidden', borderRadius: RADIUS }]}>
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[StyleSheet.absoluteFillObject,
                      { resizeMode: 'cover' },
                      { transform: [{ scale }] }
                    ]}
                  />
                </View>
                <Animated.Text style={[styles.location, { transform: [{ translateX }] }]}>{item.location}</Animated.Text>
                <View style={styles.daysContainer}>
                  <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                  <Text style={styles.daysLabel}>Days</Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    // height: ITEM_HEIGHT,
    height: '90%',
    margin: SPACING
    // marginTop: 100
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING
  },
  daysContainer: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center'
  },
  daysValue: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18
  },
  daysLabel: {
    color: '#fff',
    fontSize: 10
  }
})
