import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex font-medium uppercase cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded text-base font-medium transition-all disabled:pointer-events-none disabled:text-muted/40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        outline:
          'border bg-background shadow-xs text-muted hover:bg-muted hover:text-primary-foreground',
        ghost:
          'text-muted hover:text-muted-foreground'
      },
      size: {
        default: 'h-9 px-2 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-4 has-[>svg]:px-4',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'lg'
    }
  }
)

function Button ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : 'button'

  return (
    (
      <Comp
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  )
}

export { Button, buttonVariants }
