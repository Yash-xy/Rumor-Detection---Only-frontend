import { useState, useRef } from 'react'
import {
  Shield, Send, Sparkles, AlertTriangle, CheckCircle2, HelpCircle,
  BarChart2, Tag, ChevronRight, Loader2, Info, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/contexts/LanguageContext'
import { mockAnalysisResults, mockSchemes } from '@/lib/mockData'
import type { AnalysisResult } from '@/lib/mockData'
import RelatedSchemesModal from '@/components/modals/RelatedSchemesModal'
import { cn } from '@/lib/utils'

const MAX_CHARS = 500

function StatusIcon({ status }: { status: string }) {
  if (status === 'Rumor') return <AlertTriangle className="w-5 h-5 text-red-400" />
  if (status === 'Legitimate') return <CheckCircle2 className="w-5 h-5 text-green-400" />
  return <HelpCircle className="w-5 h-5 text-amber-400" />
}

function statusColors(status: string) {
  if (status === 'Rumor') return 'border-red-500/30 bg-red-500/10'
  if (status === 'Legitimate') return 'border-green-500/30 bg-green-500/10'
  return 'border-amber-500/30 bg-amber-500/10'
}

function statusTextColor(status: string) {
  if (status === 'Rumor') return 'text-red-400'
  if (status === 'Legitimate') return 'text-green-400'
  return 'text-amber-400'
}

const EXAMPLE_CLAIMS = [
  'PM-KISAN is giving ₹12,000 instead of ₹6,000 this year due to election season.',
  'Ayushman Bharat provides free treatment up to ₹5 lakh per family per year.',
  'MGNREGA wages have been increased to ₹500/day from April 2025.',
]

export default function CheckRumor() {
  const { t } = useLang()
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [showAI, setShowAI] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false)
  const [schemesOpen, setSchemesOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleAnalyze = async () => {
    if (!text.trim() || isAnalyzing) return
    setIsAnalyzing(true)
    setResult(null)
    setShowAI(false)
    await new Promise(r => setTimeout(r, 1800))

    const isRumor = text.toLowerCase().includes('rumor') ||
      text.toLowerCase().includes('12,000') ||
      text.toLowerCase().includes('₹500') ||
      text.toLowerCase().includes('increase') ||
      Math.random() > 0.5

    const mockResult = isRumor ? mockAnalysisResults[0] : mockAnalysisResults[1]
    setResult({ ...mockResult, text, timestamp: new Date() })
    setIsAnalyzing(false)
  }

  const handleGenerateAI = async () => {
    setLoadingAI(true)
    await new Promise(r => setTimeout(r, 1200))
    setShowAI(true)
    setLoadingAI(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAnalyze()
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-6">
            <Shield className="w-3.5 h-3.5" />
            AI-Powered Government Scheme Fact Checker
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Detect <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Rumors</span> Instantly
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Paste any claim about a government scheme. Our AI analyzes it against official data to verify authenticity.
          </p>
        </div>

        {/* Main Input Card */}
        <Card className="mb-6 border-white/10 shadow-glass">
          <CardContent className="p-6">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={e => setText(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={handleKeyDown}
                placeholder={t('enterText')}
                className="min-h-[140px] text-base pr-4 bg-transparent border-white/10 focus-visible:ring-teal-500/30 resize-none"
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-600">
                {text.length}/{MAX_CHARS}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 gap-3">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">Ctrl+Enter</kbd> to analyze
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className="gap-2 min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('analyze')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Example Claims */}
        {!result && !isAnalyzing && (
          <div className="mb-8">
            <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Try an example:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_CLAIMS.map((claim, i) => (
                <button
                  key={i}
                  onClick={() => setText(claim)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-teal-500/30 hover:bg-teal-500/5 transition-all duration-200 text-left"
                >
                  {claim.length > 60 ? claim.slice(0, 60) + '…' : claim}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="mb-6 border-white/10 animate-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                <span className="text-sm font-medium text-slate-300">Analyzing claim against official scheme database…</span>
              </div>
              <div className="space-y-2">
                {['Parsing claim semantics', 'Matching against scheme database', 'Computing confidence score'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={cn('w-2 h-2 rounded-full', i === 0 ? 'bg-teal-400' : i === 1 ? 'bg-teal-400/50 animate-pulse' : 'bg-white/20')} />
                    <span className="text-xs text-slate-500">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Panel */}
        {result && !isAnalyzing && (
          <div className="animate-in space-y-4">
            {/* Status Banner */}
            <div className={cn('rounded-2xl border p-5', statusColors(result.status))}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl border', statusColors(result.status))}>
                    <StatusIcon status={result.status} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xl font-bold', statusTextColor(result.status))}>
                        {result.status}
                      </span>
                      <Badge variant={result.status === 'Rumor' ? 'rumor' : result.status === 'Legitimate' ? 'legitimate' : 'unverified'}>
                        {result.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {result.status === 'Rumor'
                        ? 'This claim does not match official scheme information.'
                        : 'This claim aligns with official scheme data.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Card */}
            <Card className="border-white/10">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-500 font-medium">Confidence</span>
                      <span className={cn('font-bold text-sm', statusTextColor(result.status))}>{result.confidence}%</span>
                    </div>
                    <Progress
                      value={result.confidence}
                      className="h-2"
                      indicatorClassName={result.status === 'Rumor' ? 'bg-red-500' : 'bg-green-500'}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-500 font-medium">Scheme Similarity</span>
                      <span className="font-bold text-sm text-teal-400">{result.similarity}%</span>
                    </div>
                    <Progress value={result.similarity} className="h-2" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium mb-2">Related Scheme</div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                      <Tag className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="text-xs text-teal-300 font-medium truncate">{result.scheme}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Explanation */}
            {showAI && result.aiExplanation && (
              <Card className="border-teal-500/20 bg-teal-500/5">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-semibold text-teal-300">AI Analysis</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{result.aiExplanation}</p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!showAI && (
                <Button variant="secondary" onClick={handleGenerateAI} disabled={loadingAI} className="gap-2">
                  {loadingAI ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {t('aiAnalysis')}
                </Button>
              )}
              <Button variant="outline" onClick={() => setSchemesOpen(true)} className="gap-2">
                <BarChart2 className="w-4 h-4" />
                {t('viewSchemes')}
              </Button>
              <Button variant="ghost" onClick={() => { setResult(null); setText('') }} className="gap-2 text-slate-400">
                Check Another Claim
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <RelatedSchemesModal
        open={schemesOpen}
        onClose={() => setSchemesOpen(false)}
        currentSchemeId={result?.schemeId}
      />
    </div>
  )
}
