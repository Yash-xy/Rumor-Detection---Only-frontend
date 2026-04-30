import { Building2, Tag, BarChart2, Award, Users, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { mockSchemes } from '@/lib/mockData'
import type { RumorStatus, SchemeLevel } from '@/lib/mockData'

interface RelatedSchemesModalProps {
  open: boolean
  onClose: () => void
  currentSchemeId?: string
}

function levelVariant(level: SchemeLevel) {
  if (level === 'Central') return 'central'
  if (level === 'State') return 'state'
  return 'district'
}

export default function RelatedSchemesModal({ open, onClose, currentSchemeId }: RelatedSchemesModalProps) {
  const schemes = mockSchemes.filter(s => s.id !== currentSchemeId).sort((a, b) => b.similarity - a.similarity)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-400" />
            Related Government Schemes
          </DialogTitle>
          <DialogDescription>
            Schemes most similar to the analyzed claim, ranked by relevance score.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-teal-500/30 hover:bg-teal-500/5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-teal-300 transition-colors">
                  {scheme.title}
                </h3>
                <Badge variant={levelVariant(scheme.level)} className="shrink-0 text-[10px]">
                  {scheme.level}
                </Badge>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {scheme.description}
              </p>

              <Separator className="mb-3" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Similarity</span>
                  <span className="font-semibold text-teal-400">{scheme.similarity}%</span>
                </div>
                <Progress value={scheme.similarity} className="h-1.5" />
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Tag className="w-3 h-3" />
                  {scheme.category}
                </span>
                {scheme.ministry && (
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Building2 className="w-3 h-3" />
                    {scheme.ministry.replace('Ministry of ', 'MoI ')}
                  </span>
                )}
                {scheme.launchYear && (
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    Est. {scheme.launchYear}
                  </span>
                )}
              </div>

              {scheme.beneficiaries && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                  <Users className="w-3 h-3" />
                  {scheme.beneficiaries}
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
