import { View, Text, Image, ScrollView, Pressable, ToastAndroid } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import { styles } from './UserInfoScreen.styles'
import useCurrentUser from '../../hooks/useCurrentUser'

export const UserInfoScreen = () => {
  const { currentUser, setCurrentUser } = useCurrentUser()

  async function deleteToken (key) {
    await SecureStore.deleteItemAsync(key)
  }

  const handleLogout = async () => {
    setCurrentUser(null)
    await deleteToken('token')
  }

  const noAvailable = () => {
    ToastAndroid.show('Esta funcionalidad no está disponible', ToastAndroid.SHORT)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: `https://robohash.org/${currentUser.username}` }}
        />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileUsername}>{currentUser.username}</Text>
        <Text style={styles.profileEmail}>{currentUser.email}</Text>
      </View>
      <View style={styles.profileActions}>
        <Pressable style={styles.itemAction} onPress={noAvailable}>
          <Feather name='phone-call' size={24} color='black' />
          <Text>Contactanos</Text>
        </Pressable>
        <Pressable style={styles.itemAction} onPress={noAvailable}>
          <MaterialIcons name='privacy-tip' size={24} color='black' />
          <Text>Política de privacidad</Text>
        </Pressable>
        <Pressable style={styles.itemAction} onPress={noAvailable}>
          <MaterialIcons name='event-note' size={24} color='black' />
          <Text>Terminos y condiciones</Text>
        </Pressable>
        <Pressable style={[styles.itemAction, styles.logout]} onPress={handleLogout}>
          <MaterialIcons name='logout' size={24} color='black' />
          <Text>Salir</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
