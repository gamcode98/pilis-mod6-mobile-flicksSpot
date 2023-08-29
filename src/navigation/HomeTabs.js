import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { COLORS, SPACING } from '../utils/theme'
import { HomeIcon, IconContainer, TicketIcon, UserIcon, CartIcon } from '../icons'
import { HomeScreen, TicketScreen, CartScreen, ProfileScreen } from '../screens'

const Tab = createBottomTabNavigator()

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
        component={HomeScreen}
      />
      <Tab.Screen
        name='Tickets'
        options={{ title: 'Tickets' }}
        component={TicketScreen}
      />
      <Tab.Screen
        name='Cart'
        options={{ title: 'Carrito' }}
        component={CartScreen}
      />
      <Tab.Screen
        name='Profile'
        options={{ title: 'Perfil' }}
        component={ProfileScreen}
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
