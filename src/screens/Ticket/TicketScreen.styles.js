import { StyleSheet } from 'react-native'
import { carouselConfig } from './utils'

const { BACKDROP_HEIGHT, width } = carouselConfig

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainerStyle: {
    alignItems: 'center'
  },
  backdropContainer: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute'
  }
})
