import { StatusBar, StyleSheet } from 'react-native'
import { COLORS } from '../../utils/theme'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 32,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 12
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 5,
    padding: 8
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
    borderRadius: 16,
    marginTop: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  passwordToggleText: {
    color: 'blue'
  },
  tittleRegister: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
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
