export type RumorStatus = 'Rumor' | 'Legitimate' | 'Unverified'
export type SchemeLevel = 'Central' | 'State' | 'District'

export interface Scheme {
  id: string
  title: string
  description: string
  level: SchemeLevel
  category: string
  similarity: number
  ministry?: string
  launchYear?: number
  beneficiaries?: string
}

export interface AnalysisResult {
  id: string
  text: string
  status: RumorStatus
  confidence: number
  similarity: number
  scheme: string
  schemeId: string
  level: SchemeLevel
  aiExplanation?: string
  timestamp: Date
}

export interface HistoryItem {
  id: string
  text: string
  status: RumorStatus
  scheme: string
  schemeId: string
  confidence: number
  author: string
  isPublic: boolean
  timestamp: Date
  level: SchemeLevel
  aiExplanation?: string
}

export interface WeeklyData {
  day: string
  checks: number
  rumors: number
  legitimate: number
}

// Mock Schemes
export const mockSchemes: Scheme[] = [
  {
    id: 'sch-001',
    title: 'PM-KISAN Samman Nidhi',
    description: 'Financial assistance of ₹6,000 per year to small and marginal farmers to supplement their financial needs.',
    level: 'Central',
    category: 'Agriculture',
    similarity: 94,
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchYear: 2019,
    beneficiaries: 'Small & Marginal Farmers',
  },
  {
    id: 'sch-002',
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Affordable housing scheme aiming to provide pucca house to all eligible rural households by 2024.',
    level: 'Central',
    category: 'Housing',
    similarity: 88,
    ministry: 'Ministry of Housing & Urban Affairs',
    launchYear: 2015,
    beneficiaries: 'Below Poverty Line families',
  },
  {
    id: 'sch-003',
    title: 'Ayushman Bharat PM-JAY',
    description: 'World\'s largest health insurance scheme providing coverage of ₹5 lakh per family per year.',
    level: 'Central',
    category: 'Health',
    similarity: 82,
    ministry: 'Ministry of Health & Family Welfare',
    launchYear: 2018,
    beneficiaries: '107.4 million poor families',
  },
  {
    id: 'sch-004',
    title: 'Beti Bachao Beti Padhao',
    description: 'Initiative to address declining child sex ratio and promote welfare of girl child in India.',
    level: 'Central',
    category: 'Women & Child',
    similarity: 76,
    ministry: 'Ministry of Women and Child Development',
    launchYear: 2015,
    beneficiaries: 'Girl children & women',
  },
  {
    id: 'sch-005',
    title: 'MGNREGA',
    description: 'Provides at least 100 days of wage employment per year to rural households whose adult members opt for unskilled manual work.',
    level: 'Central',
    category: 'Employment',
    similarity: 71,
    ministry: 'Ministry of Rural Development',
    launchYear: 2006,
    beneficiaries: 'Rural households',
  },
  {
    id: 'sch-006',
    title: 'Atal Pension Yojana',
    description: 'Pension scheme focused on unorganised sector workers, providing guaranteed minimum pension of ₹1,000 to ₹5,000.',
    level: 'Central',
    category: 'Social Security',
    similarity: 65,
    ministry: 'Ministry of Finance',
    launchYear: 2015,
    beneficiaries: 'Unorganised sector workers',
  },
]

// Mock Analysis Results
export const mockAnalysisResults: AnalysisResult[] = [
  {
    id: 'res-001',
    text: 'PM-KISAN is giving ₹12,000 instead of ₹6,000 this year due to election season.',
    status: 'Rumor',
    confidence: 96,
    similarity: 94,
    scheme: 'PM-KISAN Samman Nidhi',
    schemeId: 'sch-001',
    level: 'Central',
    aiExplanation: 'This claim is a rumor. The PM-KISAN scheme officially provides ₹6,000 annually in three installments. No official notification has been issued regarding any increase to ₹12,000. Such claims typically circulate during election seasons without official backing. The Ministry of Agriculture & Farmers Welfare has confirmed the amount remains unchanged at ₹6,000 per year.',
    timestamp: new Date('2025-01-15T10:30:00'),
  },
  {
    id: 'res-002',
    text: 'Ayushman Bharat covers treatment up to ₹5 lakh per family per year at empanelled hospitals.',
    status: 'Legitimate',
    confidence: 98,
    similarity: 92,
    scheme: 'Ayushman Bharat PM-JAY',
    schemeId: 'sch-003',
    level: 'Central',
    aiExplanation: 'This statement is accurate. The Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) does indeed provide health coverage of ₹5 lakh per family per year at empanelled government and private hospitals. This has been the official benefit amount since the scheme\'s launch in 2018.',
    timestamp: new Date('2025-01-14T14:20:00'),
  },
]

// Mock History Items
export const mockHistoryItems: HistoryItem[] = [
  {
    id: 'hist-001',
    text: 'PM-KISAN is giving ₹12,000 instead of ₹6,000 this year due to election season',
    status: 'Rumor',
    scheme: 'PM-KISAN Samman Nidhi',
    schemeId: 'sch-001',
    confidence: 96,
    author: 'Rajesh Kumar',
    isPublic: true,
    timestamp: new Date('2025-01-15T10:30:00'),
    level: 'Central',
    aiExplanation: 'This claim is a rumor. The PM-KISAN scheme officially provides ₹6,000 annually in three installments. No official notification has been issued regarding any increase.',
  },
  {
    id: 'hist-002',
    text: 'Ayushman Bharat provides free treatment up to ₹5 lakh per family per year',
    status: 'Legitimate',
    scheme: 'Ayushman Bharat PM-JAY',
    schemeId: 'sch-003',
    confidence: 98,
    author: 'Priya Sharma',
    isPublic: true,
    timestamp: new Date('2025-01-14T14:20:00'),
    level: 'Central',
    aiExplanation: 'This statement is accurate. The Ayushman Bharat PM-JAY does provide ₹5 lakh coverage per family per year.',
  },
  {
    id: 'hist-003',
    text: 'MGNREGA wages increased to ₹500/day from April 2025 onwards',
    status: 'Rumor',
    scheme: 'MGNREGA',
    schemeId: 'sch-005',
    confidence: 89,
    author: 'Amit Singh',
    isPublic: true,
    timestamp: new Date('2025-01-13T09:15:00'),
    level: 'Central',
    aiExplanation: 'This is a rumor. The MGNREGA wage rates are revised annually and vary by state. No official announcement of ₹500/day has been made.',
  },
  {
    id: 'hist-004',
    text: 'PMAY provides housing subsidy of up to ₹2.67 lakh for EWS category',
    status: 'Legitimate',
    scheme: 'Pradhan Mantri Awas Yojana',
    schemeId: 'sch-002',
    confidence: 95,
    author: 'Sunita Devi',
    isPublic: true,
    timestamp: new Date('2025-01-12T16:45:00'),
    level: 'Central',
  },
  {
    id: 'hist-005',
    text: 'Atal Pension Yojana now open to all citizens including government employees',
    status: 'Rumor',
    scheme: 'Atal Pension Yojana',
    schemeId: 'sch-006',
    confidence: 91,
    author: 'You',
    isPublic: false,
    timestamp: new Date('2025-01-11T11:00:00'),
    level: 'Central',
  },
  {
    id: 'hist-006',
    text: 'Beti Bachao Beti Padhao scheme provides direct cash transfer of ₹50,000 at birth',
    status: 'Rumor',
    scheme: 'Beti Bachao Beti Padhao',
    schemeId: 'sch-004',
    confidence: 93,
    author: 'Vikram Patel',
    isPublic: true,
    timestamp: new Date('2025-01-10T13:30:00'),
    level: 'Central',
  },
  {
    id: 'hist-007',
    text: 'PM-KISAN beneficiaries must re-register every year to continue receiving benefits',
    status: 'Rumor',
    scheme: 'PM-KISAN Samman Nidhi',
    schemeId: 'sch-001',
    confidence: 87,
    author: 'Mohan Lal',
    isPublic: true,
    timestamp: new Date('2025-01-09T08:00:00'),
    level: 'Central',
  },
  {
    id: 'hist-008',
    text: 'Ayushman Bharat card can be used at any private hospital across India',
    status: 'Unverified',
    scheme: 'Ayushman Bharat PM-JAY',
    schemeId: 'sch-003',
    confidence: 62,
    author: 'Kavita Rao',
    isPublic: true,
    timestamp: new Date('2025-01-08T15:20:00'),
    level: 'Central',
  },
]

// Dashboard mock data
export const weeklyActivityData: WeeklyData[] = [
  { day: 'Mon', checks: 45, rumors: 28, legitimate: 17 },
  { day: 'Tue', checks: 62, rumors: 35, legitimate: 27 },
  { day: 'Wed', checks: 38, rumors: 22, legitimate: 16 },
  { day: 'Thu', checks: 79, rumors: 48, legitimate: 31 },
  { day: 'Fri', checks: 91, rumors: 58, legitimate: 33 },
  { day: 'Sat', checks: 53, rumors: 31, legitimate: 22 },
  { day: 'Sun', checks: 34, rumors: 19, legitimate: 15 },
]

export const rumorDistribution = [
  { name: 'Rumors', value: 241, color: '#dc2626' },
  { name: 'Legitimate', value: 161, color: '#16a34a' },
  { name: 'Unverified', value: 40, color: '#d97706' },
]

export const topSchemes = [
  { name: 'PM-KISAN', queries: 142, rumors: 89 },
  { name: 'Ayushman Bharat', queries: 118, rumors: 42 },
  { name: 'PMAY', queries: 95, rumors: 61 },
  { name: 'MGNREGA', queries: 78, rumors: 52 },
  { name: 'Beti Bachao', queries: 64, rumors: 38 },
  { name: 'Atal Pension', queries: 51, rumors: 28 },
]

export const kpiData = {
  totalChecks: 402,
  rumorsDetected: 241,
  legitimate: 161,
  avgConfidence: 91.4,
  checksGrowth: 18,
  rumorsGrowth: 12,
  legitimateGrowth: 8,
}
