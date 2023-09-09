import { createContext, useState } from 'react'

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  reloadUserData: false,
  setReloadUserData: () => {}
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [reloadUserData, setReloadUserData] = useState(false)

  const value = {
    currentUser,
    setCurrentUser,
    reloadUserData,
    setReloadUserData
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
