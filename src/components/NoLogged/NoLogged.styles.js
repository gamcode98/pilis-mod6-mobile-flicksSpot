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
    fontWeight: 'bold',
    marginBottom: 16
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24
  },
  lottie: {
    width: 200,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
