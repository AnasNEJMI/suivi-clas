import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

interface PropgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root>{
  rootColor? : string,
  indicatorColor? : string,
}
function Progress({
  className,
  rootColor = 'bg-primary/20',
  indicatorColor = 'bg-lime-600',
  value,
  ...props
}: PropgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        className,
        rootColor
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn("h-full w-full flex-1 transition-all rounded-full", indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
