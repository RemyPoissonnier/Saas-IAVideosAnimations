import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { exportDbAsJson, loadUser, persistUser, removeUser } from './services/localDb'
import type { UserProfile } from './services/localDb'

type AuthContextValue = {
  user: UserProfile | null
  signIn: (profile: UserProfile) => void
  signOut: () => void
  exportJson: () => string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => loadUser())

  const signIn = (profile: UserProfile) => {
    persistUser(profile)
    setUser(profile)
  }

  const signOut = () => {
    removeUser()
    setUser(null)
  }

  const exportJson = () => exportDbAsJson()

  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
      exportJson,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
