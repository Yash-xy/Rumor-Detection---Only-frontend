import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Language, string>> = {
  checkRumor: { en: 'Check Rumor', hi: 'अफवाह जांचें' },
  history: { en: 'History', hi: 'इतिहास' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  admin: { en: 'Admin', hi: 'व्यवस्थापक' },
  login: { en: 'Login', hi: 'लॉगिन' },
  logout: { en: 'Logout', hi: 'लॉगआउट' },
  signup: { en: 'Sign Up', hi: 'साइनअप' },
  analyze: { en: 'Analyze', hi: 'विश्लेषण करें' },
  enterText: { en: 'Enter claim or scheme-related text…', hi: 'दावा या योजना से संबंधित पाठ दर्ज करें…' },
  result: { en: 'Result', hi: 'परिणाम' },
  confidence: { en: 'Confidence', hi: 'विश्वास' },
  similarity: { en: 'Similarity', hi: 'समानता' },
  relatedScheme: { en: 'Related Scheme', hi: 'संबंधित योजना' },
  viewSchemes: { en: 'View Related Schemes', hi: 'संबंधित योजनाएं देखें' },
  aiAnalysis: { en: 'Generate AI Analysis', hi: 'AI विश्लेषण करें' },
  publicFeed: { en: 'Public Feed', hi: 'सार्वजनिक फीड' },
  myHistory: { en: 'My History', hi: 'मेरा इतिहास' },
  search: { en: 'Search claims…', hi: 'दावे खोजें…' },
  all: { en: 'All', hi: 'सभी' },
  rumors: { en: 'Rumors', hi: 'अफवाहें' },
  legitimate: { en: 'Legitimate', hi: 'वैध' },
  totalChecks: { en: 'Total Checks', hi: 'कुल जांच' },
  rumorsDetected: { en: 'Rumors Detected', hi: 'अफवाहें पकड़ी' },
  avgConfidence: { en: 'Avg Confidence', hi: 'औसत विश्वास' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'hi' : 'en'))

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
