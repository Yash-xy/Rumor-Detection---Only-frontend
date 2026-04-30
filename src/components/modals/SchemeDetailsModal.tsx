import { Building2, Tag, Users, Calendar, ExternalLink, TrendingUp, CheckCircle2, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { mockSchemes } from '@/lib/mockData'
import type { SchemeLevel } from '@/lib/mockData'

interface SchemeDetailsModalProps {
  open: boolean
  onClose: () => void
  schemeId?: string
}

function levelVariant(level: SchemeLevel) {
  if (level === 'Central') return 'central' as const
  if (level === 'State') return 'state' as const
  return 'district' as const
}

export default function SchemeDetailsModal({ open, onClose, schemeId }: SchemeDetailsModalProps) {
  const scheme = mockSchemes.find(s => s.id === schemeId) ?? mockSchemes[0]

  if (!scheme) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-navy-600/20 border border-teal-500/30 shrink-0">
              <TrendingUp className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <DialogTitle>{scheme.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant={levelVariant(scheme.level)}>{scheme.level} Scheme</Badge>
                <Badge variant="secondary">{scheme.category}</Badge>
              </div>
            </div>
          </div>
          <DialogDescription className="mt-3 text-slate-300 leading-relaxed">
            {scheme.description}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {scheme.ministry && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Building2 className="w-3 h-3" />
                  Ministry
                </div>
                <p className="text-xs font-medium text-slate-200">{scheme.ministry}</p>
              </div>
            )}
            {scheme.launchYear && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Calendar className="w-3 h-3" />
                  Launch Year
                </div>
                <p className="text-xs font-medium text-slate-200">{scheme.launchYear}</p>
              </div>
            )}
            {scheme.beneficiaries && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                  <Users className="w-3 h-3" />
                  Beneficiaries
                </div>
                <p className="text-xs font-medium text-slate-200">{scheme.beneficiaries}</p>
              </div>
            )}
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Tag className="w-3 h-3" />
                Category
              </div>
              <p className="text-xs font-medium text-slate-200">{scheme.category}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-400">Relevance Score</span>
              <span className="font-bold text-teal-400">{scheme.similarity}%</span>
            </div>
            <Progress value={scheme.similarity} className="h-2" />
            <p className="text-xs text-slate-500 mt-2">Based on semantic similarity with the analyzed claim</p>
          </div>

          <div className="rounded-xl bg-teal-500/5 border border-teal-500/20 p-4">
            <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-2">Verification Tips</h4>
            <ul className="space-y-1.5">
              {[
                'Always verify from official government portals',
                'Check the official ministry website for announcements',
                'Contact your local government office for confirmation',
              ].map(tip => (
                <li key={tip} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button variant="default" className="flex-1 gap-2" asChild>
            <a href="https://india.gov.in" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
              Official Portal
            </a>
          </Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
