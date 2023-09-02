import { StyleSheet } from 'react-native'
import { COLORS } from '../../utils'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center'
  },
  subContainer: {
    width: '94%'
  },
  headerContainer: {
    width: '94%'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30
  },
  footerContainer: { marginBottom: 16 },
  footerTitle: { textAlign: 'right', width: '94%' },
  paymentButton: {
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    backgroundColor: COLORS.primary
  },
  buttonTitle: { fontWeight: 'bold' }
})
