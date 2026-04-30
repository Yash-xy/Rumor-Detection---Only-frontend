import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Layout from '@/components/layout/Layout'
import CheckRumor from '@/pages/CheckRumor'
import History from '@/pages/History'
import Dashboard from '@/pages/Dashboard'
import Admin from '@/pages/Admin'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<CheckRumor />} />
                <Route path="/history" element={<History />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
