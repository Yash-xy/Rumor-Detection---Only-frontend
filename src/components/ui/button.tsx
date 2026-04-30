import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-teal-600 text-white hover:bg-teal-500 shadow-sm',
        destructive: 'bg-red-600 text-white hover:bg-red-500',
        outline: 'border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white',
        secondary: 'bg-navy-700/60 border border-navy-500/40 text-slate-200 hover:bg-navy-600/80 hover:border-navy-400/60',
        ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
        link: 'text-teal-400 underline-offset-4 hover:underline p-0 h-auto',
        navy: 'bg-navy-700 text-white hover:bg-navy-600 border border-navy-500/40',
        amber: 'bg-amber-600 text-white hover:bg-amber-500',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-9 w-9 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
