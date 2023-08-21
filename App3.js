import * as React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from './src/screens/HomeScreen'
import { StatusBar } from 'expo-status-bar'
import { HomeV2Screen } from './src/screens/Homev2Screen'

function Feed () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  )
}

function Notifications () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  )
}

function Profile () {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer () {
  return (
    <Drawer.Navigator initialRouteName='Feed'>
      <Drawer.Screen
        name='Feed'
        component={HomeScreen}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen
        name='Notifications'
        component={HomeV2Screen}
        options={{ drawerLabel: 'Updates' }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{ drawerLabel: 'Profile' }}
      />
    </Drawer.Navigator>
  )
}

export default function App () {
  return (
    <>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </>
  )
}
