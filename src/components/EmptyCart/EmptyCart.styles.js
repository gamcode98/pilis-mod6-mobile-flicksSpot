import { StyleSheet, StatusBar } from 'react-native'

export const styles = StyleSheet.create({
  animationContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 32
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    width: 150,
    height: 150
  }
})
