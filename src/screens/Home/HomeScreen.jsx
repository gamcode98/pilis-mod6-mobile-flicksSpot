/* eslint-disable react/jsx-closing-tag-location */
import { useRef, useState } from 'react'
import { Text, View, Animated, TextInput, Image, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import { Loader } from '../../components/Loader'
import { MovieItem } from './components/MovieItem'
import { styles } from './HomeScreen.styles'
import { configCarousel } from './utils/configCarousel'
import { AdjustmentsIcon, IconContainer, XCircleIcon } from '../../icons'
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
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 32
                }}
                >
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <IconContainer color='#F9B208'>
                      <XCircleIcon />
                    </IconContainer>
                  </Pressable>
                  <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '800'
                  }}
                  >Filtros
                  </Text>
                  <TouchableOpacity>
                    <Text style={{ color: '#F9B208', fontWeight: '600' }}>Reiniciar</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ fontWeight: '800', marginBottom: 16 }}>Sala</Text>
                  <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
                    {['Lux', 'Estelar', 'Tesla', 'Apollo', 'Shiba'].map(room => (
                      <TouchableOpacity key={room}>
                        <Text style={{
                          borderRadius: 8,
                          borderWidth: 1,
                          padding: 8,
                          textAlign: 'center'
                        }}
                        >{room}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View style={{ marginBottom: 32 }}>
                  <Text style={{ fontWeight: '800', marginBottom: 16 }}>Idioma</Text>
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <TouchableOpacity>
                      <Text style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        padding: 8,
                        textAlign: 'center'
                      }}
                      >Español</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        padding: 8,
                        textAlign: 'center'
                      }}
                      >Subtitulada</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{
                    borderRadius: 8,
                    paddingVertical: 16,
                    textAlign: 'center',
                    backgroundColor: '#F9B208',
                    color: '#fff',
                    fontWeight: '800'
                  }}
                  >Aplicar</Text>
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
              renderItem={({ item, index }) => <MovieItem item={item} index={index} scrollX={scrollX} />}
            />
          </View>
      }
    </>
  )
}
