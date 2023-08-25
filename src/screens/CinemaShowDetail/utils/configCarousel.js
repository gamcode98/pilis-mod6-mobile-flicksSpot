import { Dimensions } from 'react-native'

export const { width, height } = Dimensions.get('window')

export const SIZE = 64
export const ICON_SIZE = SIZE * 0.6
export const SPACING_SCREEN = 12

const s = width * 0.8

export const configCarousel = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 18,
  SPACING_SCREEN,
  FULL_SIZE: s + SPACING_SCREEN * 2
}
