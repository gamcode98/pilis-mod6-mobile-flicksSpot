import { useEffect, useRef } from 'react'
import { StatusBar, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

export const NoContent = () => {
  const animationRef = useRef(null)

  useEffect(() => {
    animationRef.current?.play(0, 200)
    return () => animationRef.current?.reset()
  }, [])

  return (
    <View style={{
      marginTop: StatusBar.currentHeight,
      flex: 1,
      justifyContent: 'center',
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
    >
      <Text style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
      }}
      >¡Oh no! No tienes tickets de cine en este momento.
      </Text>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <LottieView
          ref={animationRef}
          style={{
            width: 300,
            height: 300
          }}
          source={require('./../lotties/panda.json')}
        />
      </View>
    </View>
  )
}
