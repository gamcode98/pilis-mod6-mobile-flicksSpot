import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeTabs } from './src/navigation/HomeTabs'
import { CinemaShowDetailScreen, OnboardingScreen } from './src/screens'
import { SECURE_STORE_KEYS, getItem } from './src/utils'
import { UserProvider } from './src/contexts/UserContext'
const Stack = createNativeStackNavigator()

export default function App () {
  const [showOnboarding, setShowOnboarding] = useState(null)

  useEffect(() => {
    checkIfAlreadyOnboarded()
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getItem(SECURE_STORE_KEYS.ONBOARDED)
    if (onboarded === '1') {
      setShowOnboarding(false)
    } else {
      setShowOnboarding(true)
    }
  }

  if (showOnboarding === null) {
    return null
  }

  if (showOnboarding) {
    return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Onboarding'>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='HomeTabs' component={HomeTabs} />
            <Stack.Screen name='CinemaShowDetailScreen' component={CinemaShowDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    )
  } else {
    return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeTabs'>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='HomeTabs' component={HomeTabs} />
            <Stack.Screen name='CinemaShowDetailScreen' component={CinemaShowDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>

    )
  }
}
