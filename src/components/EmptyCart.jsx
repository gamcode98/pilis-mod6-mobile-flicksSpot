import { useEffect, useRef } from 'react'
import { StatusBar, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'

export const EmptyCart = () => {
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
      >Sin Elementos en tu Carrito
      </Text>
      <Text style={{
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 32
      }}
      >
        ¿Listo para comprar? Encuentra lo que necesitas y agrégalo al carrito
      </Text>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <LottieView
          ref={animationRef}
          style={{
            width: 150,
            height: 150
          }}
          source={require('./../lotties/empty.json')}
        />
      </View>
    </View>
  )
}
