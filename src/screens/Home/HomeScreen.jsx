/* eslint-disable react/jsx-closing-tag-location */
import { useRef, useState } from 'react'
import { Text, View, Animated, TextInput, Image, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Loader } from '../../components'
import { MovieItem } from './components/MovieItem'
import { styles } from './HomeScreen.styles'
import { configCarousel } from './utils/configCarousel'
import { AdjustmentsIcon, IconContainer, XCircleIcon } from '../../icons'
import { useMovies } from './hooks/useMovies'
import useCurrentUser from '../../hooks/useCurrentUser'
import { COLORS } from '../../utils/theme'

const { FULL_SIZE } = configCarousel

export const HomeScreen = ({ navigation }) => {
  const { currentUser } = useCurrentUser()
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
                  <Text style={styles.greeting}>{currentUser === null ? 'Compra tus tickets ahora' : 'Hola'} </Text>
                  <Text style={styles.customerName}>{currentUser === null ? '' : currentUser.username}</Text>
                </View>
                <Text style={styles.subTitle}>{currentUser === null ? '¡No te quedes afuera!' : 'Tu película, tu entrada'}</Text>
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
                <IconContainer color={COLORS.black}>
                  <AdjustmentsIcon />
                </IconContainer>
              </TouchableOpacity>
            </View>

            <Modal
              animationType='slide'
              transparent
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible)
              }}
            >

              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <IconContainer color={COLORS.primary}>
                      <XCircleIcon />
                    </IconContainer>
                  </Pressable>
                  <Text style={styles.modalTitle}>Filtros
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.resetText}>Reiniciar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.hallsContainer}>
                  <Text style={styles.hallTitle}>Sala</Text>
                  <View style={styles.hallsBtns}>
                    {['Lux', 'Estelar', 'Tesla', 'Apollo', 'Shiba'].map(room => (
                      <TouchableOpacity key={room}>
                        <Text style={styles.hallBtn}>{room}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={styles.languagesContainer}>
                  <Text style={styles.languageTitle}>Idioma</Text>
                  <View style={styles.languagesContent}>
                    <TouchableOpacity>
                      <Text style={styles.languageBtn}>Español</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.languageBtn}>Subtitulada</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.modalBtn}>Aplicar</Text>
                </TouchableOpacity>
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
              renderItem={({ item, index }) =>
                <MovieItem
                  item={item}
                  index={index}
                  scrollX={scrollX}
                  navigation={navigation}
                />}
            />
          </View>
      }
    </>
  )
}
