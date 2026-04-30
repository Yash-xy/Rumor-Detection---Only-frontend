import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, HelpCircle, Clock, User, ExternalLink } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { mockHistoryItems } from '@/lib/mockData'
import type { HistoryItem, RumorStatus } from '@/lib/mockData'
import { formatDate, cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import SchemeDetailsModal from '@/components/modals/SchemeDetailsModal'
import { useLang } from '@/contexts/LanguageContext'

type Filter = 'all' | 'rumor' | 'legitimate'

function StatusBadge({ status }: { status: RumorStatus }) {
  if (status === 'Rumor') return <Badge variant="rumor" className="gap-1"><AlertTriangle className="w-3 h-3" />Rumor</Badge>
  if (status === 'Legitimate') return <Badge variant="legitimate" className="gap-1"><CheckCircle2 className="w-3 h-3" />Legitimate</Badge>
  return <Badge variant="unverified" className="gap-1"><HelpCircle className="w-3 h-3" />Unverified</Badge>
}

function HistoryRow({ item }: { item: HistoryItem }) {
  const [expanded, setExpanded] = useState(false)
  const [schemeOpen, setSchemeOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          'rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/20 hover:bg-white/[0.07] transition-all duration-200 overflow-hidden',
          expanded && 'border-teal-500/20'
        )}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 leading-snug line-clamp-2">{item.text}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <StatusBadge status={item.status} />
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <ExternalLink className="w-3 h-3" />
                  {item.scheme}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <User className="w-3 h-3" />
                  {item.author}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {formatDate(item.timestamp)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500 mb-1">Confidence</div>
                <div className={cn('text-sm font-bold',
                  item.status === 'Rumor' ? 'text-red-400' :
                  item.status === 'Legitimate' ? 'text-green-400' : 'text-amber-400'
                )}>
                  {item.confidence}%
                </div>
              </div>
              {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </div>
        </button>

        {expanded && (
          <div className="border-t border-white/10 px-4 pb-4 pt-3 animate-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-500">Confidence Score</span>
                  <span className={cn('font-bold',
                    item.status === 'Rumor' ? 'text-red-400' :
                    item.status === 'Legitimate' ? 'text-green-400' : 'text-amber-400'
                  )}>{item.confidence}%</span>
                </div>
                <Progress
                  value={item.confidence}
                  className="h-1.5"
                  indicatorClassName={item.status === 'Rumor' ? 'bg-red-500' : item.status === 'Legitimate' ? 'bg-green-500' : 'bg-amber-500'}
                />
              </div>
              <div className="sm:col-span-2">
                <div className="text-xs text-slate-500 mb-1.5">Level</div>
                <Badge variant={item.level === 'Central' ? 'central' : item.level === 'State' ? 'state' : 'district'}>
                  {item.level} Scheme
                </Badge>
              </div>
            </div>

            {item.aiExplanation && (
              <div className="rounded-xl bg-teal-500/5 border border-teal-500/20 p-3 mb-3">
                <p className="text-xs text-slate-300 leading-relaxed">{item.aiExplanation}</p>
              </div>
            )}

            <Button variant="outline" size="sm" onClick={() => setSchemeOpen(true)} className="gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              View Scheme Details
            </Button>
          </div>
        )}
      </div>

      <SchemeDetailsModal
        open={schemeOpen}
        onClose={() => setSchemeOpen(false)}
        schemeId={item.schemeId}
      />
    </>
  )
}

export default function History() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { t } = useLang()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const publicItems = mockHistoryItems.filter(h => h.isPublic)
  const myItems = mockHistoryItems.filter(h => h.author === 'You')

  const filterItems = (items: HistoryItem[]) => {
    let filtered = items
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(h => h.text.toLowerCase().includes(q) || h.scheme.toLowerCase().includes(q))
    }
    if (filter === 'rumor') filtered = filtered.filter(h => h.status === 'Rumor')
    if (filter === 'legitimate') filtered = filtered.filter(h => h.status === 'Legitimate')
    return filtered
  }

  const filteredPublic = filterItems(publicItems)
  const filteredMy = filterItems(myItems)

  const filterButtons: { key: Filter; label: string; count: number }[] = [
    { key: 'all', label: t('all'), count: publicItems.length },
    { key: 'rumor', label: t('rumors'), count: publicItems.filter(h => h.status === 'Rumor').length },
    { key: 'legitimate', label: t('legitimate'), count: publicItems.filter(h => h.status === 'Legitimate').length },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Fact Check History</h1>
        <p className="text-slate-400">Browse verified claims about government schemes.</p>
      </div>

      <Tabs defaultValue="public">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="public">{t('publicFeed')}</TabsTrigger>
            <TabsTrigger value="my" onClick={() => { if (!isAuthenticated) navigate('/login') }}>
              {t('myHistory')}
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder={t('search')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-5">
          {filterButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
                filter === btn.key
                  ? 'bg-teal-600 text-white'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              )}
            >
              {btn.label}
              <span className={cn('px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                filter === btn.key ? 'bg-white/20' : 'bg-white/10'
              )}>
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        <TabsContent value="public">
          <div className="space-y-3">
            {filteredPublic.length === 0 ? (
              <Card className="border-white/10">
                <CardContent className="p-10 text-center text-slate-500">
                  No results found for your search.
                </CardContent>
              </Card>
            ) : (
              filteredPublic.map(item => <HistoryRow key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="my">
          {!isAuthenticated ? (
            <Card className="border-white/10">
              <CardContent className="p-10 text-center">
                <p className="text-slate-400 mb-4">Please login to view your history.</p>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredMy.length === 0 ? (
                <Card className="border-white/10">
                  <CardContent className="p-10 text-center text-slate-500">
                    You haven't checked any claims yet. <a href="/" className="text-teal-400 hover:underline">Check a claim now</a>
                  </CardContent>
                </Card>
              ) : (
                filteredMy.map(item => <HistoryRow key={item.id} item={item} />)
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
