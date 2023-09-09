import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../utils'

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: COLORS['grashy-grey'],
    paddingBottom: 8,
    flexDirection: 'row',
    gap: 16,
    position: 'relative'
  },
  image: {
    width: 100,
    height: 100
  },
  title: { fontWeight: 'bold' },
  longDate: {
    fontSize: 12,
    color: COLORS['light-gray'],
    marginBottom: 8
  },
  subtotal: {
    fontSize: 14,
    color: COLORS.black,
    opacity: 0.7,
    marginBottom: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  button: {
    padding: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS['grashy-grey']
  },
  removeButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    padding: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS['grashy-grey']
  }
})
