"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "relative group inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:before:-translate-y-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 text-white hover:before:bg-zinc-700 before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-zinc-800 before:z-10 before:-translate-y-1.5 active:before:translate-y-0 data-[state=on]:before:bg-zinc-700",
        outline:
          "bg-zinc-200 text-black before:border before:border-px before:border-zinc-200 hover:before:bg-white before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-zinc-50 before:z-10 before:-translate-y-1.5 active:before:translate-y-0 data-[state=on]:before:bg-white data-[state=on]:before:border-2 data-[state=on]:before:border-lime-500",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
