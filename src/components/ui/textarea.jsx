import * as React from 'react'

import { cn } from '../../lib/utils'

function Textarea ({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        ' placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
