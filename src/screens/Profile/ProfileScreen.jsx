import { UserInfoScreen } from '../User/UserScreen'
import { AuthScreen } from '../Auth/AuthScreen'
import useCurrentUser from '../../hooks/useCurrentUser'

export const ProfileScreen = () => {
  const { currentUser } = useCurrentUser()

  return (
    currentUser
      ? <UserInfoScreen />
      : <AuthScreen />
  )
}
