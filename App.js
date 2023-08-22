import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeTabs } from './src/navigation/HomeTabs'
import { OnboardingScreen } from './src/screens/OnboardingScreen'
import { getValue } from './src/utils/secureStorage'

const Stack = createNativeStackNavigator()

export default function App () {
  const [showOnboarding, setShowOnboarding] = React.useState(null)

  React.useEffect(() => {
    checkIfAlreadyOnboarded()
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getValue('onboarded')
    console.log({ onboarded })
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
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Onboarding'>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='HomeTabs' component={HomeTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style='auto' />
      </>
    )
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeTabs'>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
            <Stack.Screen name='HomeTabs' component={HomeTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style='auto' />
      </>
    )
  }
}
