import { StyleSheet, StatusBar, Dimensions } from 'react-native'
import { COLORS } from '../../utils/theme'

const { width, height } = Dimensions.get('screen')

export const styles = StyleSheet.create({
  imageContainer: {
    // height: 350,
    position: 'relative'
    // marginBottom: SPACING.lg
  },
  linearGradient: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  image: {
    width,
    height: height / 1.5
  },
  movieDetails: {
    position: 'absolute',
    zIndex: 1,
    bottom: 80,
    width: '90%',
    left: 10
  },
  badgeContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  badge: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    textTransform: 'capitalize'
  },
  movieName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  moviePlot: {
    color: COLORS['grashy-grey'],
    fontSize: 12,
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: COLORS.white,
    position: 'relative',
    zIndex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -50,
    paddingTop: 16
  },
  content: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  hallsTitle: {
    marginBottom: 8
  },
  hallsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16
  },
  hall: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  availableDatesTitle: {
    marginBottom: 8
  }
})
