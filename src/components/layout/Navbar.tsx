import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Shield, BarChart3, History, Settings, LogIn, LogOut, Sun, Moon, Globe, Menu, X, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useLang } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { to: '/', label: t('checkRumor'), icon: Shield },
    { to: '/history', label: t('history'), icon: History },
    { to: '/dashboard', label: t('dashboard'), icon: BarChart3 },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: t('admin'), icon: Settings }] : []),
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-govbg-surface/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-navy-600 shadow-glow-teal">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">SchemeRadar</span>
              <span className="hidden sm:block text-[10px] text-teal-400 font-medium -mt-1 tracking-wider">GOV FACT CHECK</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn('nav-link flex items-center gap-1.5', isActive && 'active')
                }
                end={to === '/'}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <button
              onClick={toggleLang}
              className="btn-ghost text-xs font-semibold gap-1 px-2.5 py-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>

            {/* Theme */}
            <button onClick={toggleTheme} className="btn-ghost p-2 rounded-lg">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-navy-500 flex items-center justify-center text-xs font-bold text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{user?.name}</span>
                  {user?.role === 'admin' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">ADMIN</span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/') }} className="gap-1.5 text-slate-400 hover:text-red-400">
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')} className="gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                {t('login')}
              </Button>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn-ghost p-2 rounded-lg">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-govbg-surface/95 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn('flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'bg-teal-600/20 text-teal-400' : 'text-slate-300 hover:bg-white/5 hover:text-white')
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
