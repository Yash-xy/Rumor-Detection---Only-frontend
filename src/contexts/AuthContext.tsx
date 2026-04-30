import React, { createContext, useContext, useState, useCallback } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@schemeradar.gov.in', role: 'admin' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'user' },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS.find(u => u.email === email)
    if (found) {
      setUser(found)
      return true
    }
    // Allow any login for demo
    setUser({ id: '3', name: email.split('@')[0], email, role: 'user' })
    return true
  }, [])

  const signup = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800))
    setUser({ id: Date.now().toString(), name, email, role: 'user' })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
