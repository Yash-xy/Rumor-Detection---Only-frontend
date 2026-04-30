import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-teal-500/40 bg-teal-500/15 text-teal-400',
        rumor: 'border-red-500/40 bg-red-500/15 text-red-400',
        legitimate: 'border-green-500/40 bg-green-500/15 text-green-400',
        unverified: 'border-amber-500/40 bg-amber-500/15 text-amber-400',
        central: 'border-blue-500/40 bg-blue-500/15 text-blue-400',
        state: 'border-purple-500/40 bg-purple-500/15 text-purple-400',
        district: 'border-orange-500/40 bg-orange-500/15 text-orange-400',
        outline: 'border-white/20 bg-transparent text-slate-300',
        secondary: 'border-navy-500/40 bg-navy-700/40 text-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
