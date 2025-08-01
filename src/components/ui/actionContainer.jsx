import React from 'react'
import { cn } from '../../lib/utils'

function ActionContainer ({ className, children, ...props }) {
  return (
    <div
      className={cn('flex gap-2 items-center justify-end py-2 w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { ActionContainer }
