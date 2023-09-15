import { StatusBar, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  animationContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  lottie: {
    width: 250,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
