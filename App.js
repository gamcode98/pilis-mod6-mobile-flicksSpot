import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeTabs } from './src/navigation/HomeTabs'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='HomeTabs' component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style='auto' />
    </>
  )
}
