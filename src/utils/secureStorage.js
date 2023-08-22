import * as SecureStore from 'expo-secure-store'

export async function saveItem (key, value) {
  await SecureStore.setItemAsync(key, value)
}

export async function getItem (key) {
  const result = await SecureStore.getItemAsync(key)
  return result
}

export async function removeItem (key) {
  await SecureStore.deleteItemAsync(key)
}
