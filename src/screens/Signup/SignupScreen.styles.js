import { StatusBar, StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../utils/theme'

const HEIGHT = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    marginTop: StatusBar.currentHeight + (HEIGHT / 8),
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 8,
    padding: 8
  },
  inputContainer: {
    marginBottom: 12
  },
  errorText: {
    color: 'red',
    fontSize: 12
  },
  errorContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  tittleRegister: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  passwordToggle: {
    marginLeft: 8
  },
  passwordToggleText: {
    color: 'blue',
    position: 'relative'
  },
  switchLink: {
    color: COLORS.primary
  },
  toggleIcon: {
    position: 'absolute',
    top: 10,
    left: 260
  }
})
