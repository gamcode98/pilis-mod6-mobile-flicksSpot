import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SPACING } from '../utils/theme'
import { HomeIcon, IconContainer, TicketIcon, UserIcon, CartIcon } from '../icons'
import { HomeScreen } from '../screens/HomeScreen'
import { HomeV2Screen } from '../screens/Homev2Screen'
import { Homev3Screen } from '../screens/Homev3Screen'
import { Homev4Screen } from '../screens/Homev4Screen'
import { getValue, remove } from '../utils/secureStorage'

const Tab = createBottomTabNavigator()

const DeleteStore = () => {
  const deleteOnboarded = async () => {
    const result = await getValue('onboarded')
    console.log({ result })
    await remove('onboarded')
  }

  return (
    <View>
      <TouchableOpacity onPress={deleteOnboarded}>
        <Text>DeleteStore</Text>
      </TouchableOpacity>
    </View>
  )
}

const TAB_ICON = {
  Home: <HomeIcon />,
  Tickets: <TicketIcon />,
  Cart: <CartIcon />,
  Profile: <UserIcon />
}

const screenOptions = ({ route }) => {
  const icon = TAB_ICON[route.name]

  return {
    tabBarIcon: ({ size, color }) => (
      <IconContainer size={size} color={color}>
        {icon}
      </IconContainer>
    ),
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.inactive,
    headerShown: false,
    tabBarStyle: styles.tabBar
  }
}

export function HomeTabs () {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name='Home'
        options={{ title: 'Inicio' }}
        component={HomeV2Screen}
      />
      <Tab.Screen
        name='Tickets'
        options={{ title: 'Tickets' }}
        component={HomeScreen}
      />
      <Tab.Screen
        name='Cart'
        options={{ title: 'Carrito' }}
        component={Homev3Screen}
      />
      <Tab.Screen
        name='Profile'
        options={{ title: 'Perfil' }}
        component={Homev4Screen}
      />
      <Tab.Screen
        name='DeleteStore'
        options={{ title: 'DeleteStore' }}
        component={DeleteStore}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: SPACING.xxxl,
    paddingBottom: SPACING.xs,
    paddingTop: SPACING.xs
  }
})
