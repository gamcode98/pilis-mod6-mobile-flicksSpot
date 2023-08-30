import { Text, View, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native'
import { useEffect, useRef } from 'react'

export const NoLogged = () => {
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
        fontWeight: 'bold',
        marginBottom: 16
      }}
      >¿Listo para el cine?
      </Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 24
      }}
      >
        Iniciar sesión te permitirá ver tus tickets y detalles de funciones.
      </Text>
      <LottieView
        ref={animationRef}
        style={{
          width: 200,
          height: 300,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
        source={require('./../lotties/dancing-llama.json')}
      />
    </View>
  )
}
