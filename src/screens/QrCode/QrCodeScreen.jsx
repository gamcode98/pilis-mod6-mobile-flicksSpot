import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { COLORS } from '../../utils'
import { validateQrCode } from './services/validateQrcode'

export const QrCodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [retry, setRetry] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [retry])

  const handleBarCodeScanned = ({ data }) => {
    setIsLoading(true)
    validateQrCode(data)
      .then(() => {
        ToastAndroid.show('Ticket marcado como usado exitosamente', ToastAndroid.SHORT)
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      })
      .finally(() => {
        setIsLoading(false)
        setScanned(true)
      })
  }

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Esperando permiso para acceder a la cámara</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 16 }}>No se ha podido acceder a la cámara</Text>
        <TouchableOpacity
          onPress={() => setRetry(prev => !prev)}
          style={{
            padding: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 8
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >Intentar de nuevo
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: 'white',
          borderColor: 'black',
          borderRadius: 20,
          width: 300,
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: 20
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ width: 550, height: 550 }}
        />
      </View>

      {!isLoading && scanned &&
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => setScanned(false)}
          style={{
            padding: 10,
            backgroundColor: COLORS.primary,
            borderRadius: 8
          }}
        >
          <Text
            style={{
              fontWeight: 'bold'
            }}
          >Toca para escanear nuevamente
          </Text>
        </TouchableOpacity>}

    </View>
  )
}
