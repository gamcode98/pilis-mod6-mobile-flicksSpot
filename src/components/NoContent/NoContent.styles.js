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
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  lottieContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    width: 300,
    height: 300
  }
})
