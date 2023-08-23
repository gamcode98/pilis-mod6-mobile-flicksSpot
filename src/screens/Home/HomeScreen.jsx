/* eslint-disable react/jsx-closing-tag-location */
import { useRef, useState } from 'react'
import { Text, View, Animated, TextInput, Image, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import { Loader } from '../../components/Loader'
import { MovieItem } from './components/MovieItem'
import { styles } from './HomeScreen.styles'
import { configCarousel } from './utils/configCarousel'
import { AdjustmentsIcon, IconContainer } from '../../icons'
import { useMovies } from './hooks/useMovies'

const { FULL_SIZE } = configCarousel

export const HomeScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const [modalVisible, setModalVisible] = useState(false)

  const { isLoading, movies } = useMovies()

  return (
    <>
      {
        isLoading
          ? <Loader />
          : <View style={styles.container}>
            <View style={styles.topSection}>
              <View>
                <View style={styles.greetingContainer}>
                  <Text style={styles.greeting}>Hola </Text>
                  <Text style={styles.customerName}>Gabriel</Text>
                </View>
                <Text style={styles.subTitle}>Tu película, tu entrada</Text>
              </View>
              <Image
                source={require('./assets/icons/popcorn.png')}
                style={styles.logo}
              />
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder='Buscar...'
              />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
              >
                <IconContainer color='#181a1f'>
                  <AdjustmentsIcon />
                </IconContainer>
              </TouchableOpacity>
            </View>

            <Modal
              animationType='slide'
              transparent
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.')
                setModalVisible(!modalVisible)
              }}
            >

              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>

            </Modal>

            <Text style={styles.title}>En cartelera</Text>

            <Animated.FlatList
              data={movies}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={FULL_SIZE}
              decelerationRate='fast'
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => <MovieItem item={item} index={index} scrollX={scrollX} />}
            />
          </View>
      }
    </>
  )
}
