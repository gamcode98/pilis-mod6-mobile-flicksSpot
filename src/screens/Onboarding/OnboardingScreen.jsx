import { useRef } from 'react'
import { Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { SECURE_STORE_KEYS, saveItem } from '../../utils'
import { Indicator } from './components'
import { DATA } from './utils/data'

const { width } = Dimensions.get('screen')

export const OnboardingScreen = ({ navigation }) => {
  const { navigate } = navigation

  const scrollX = useRef(new Animated.Value(0)).current

  const goToHome = () => {
    saveItem(SECURE_STORE_KEYS.ONBOARDED, '1')
    navigate('HomeTabs')
  }

  return (

    <View style={styles.container}>
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
                <Text style={{ fontWeight: '300' }}>{item.description}</Text>
                {item.key === '3571603' &&
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F9B208',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      marginVertical: 20
                    }}
                    onPress={goToHome}
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
