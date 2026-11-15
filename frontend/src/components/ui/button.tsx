import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex font-outfit items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:     "bg-[#171717] text-[#fafafa] hover:bg-[rgb(23_23_23/0.9)]",
        destructive: "bg-[#e7000b] text-[#ffffff] hover:bg-[rgb(231_0_11/0.9)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:     "border border-[#e5e5e5] bg-[#ffffff] hover:bg-[#f5f5f5] hover:text-[#171717] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:   "bg-[#f5f5f5] text-[#171717] hover:bg-[rgb(245_245_245/0.8)]",
        ghost:       "hover:bg-[#f5f5f5] hover:text-[#171717] dark:hover:bg-accent/50",
        link:        "text-[#171717] underline-offset-4 hover:underline",
        qcm:         "text-[#ffffff] bg-[#432dd7] hover:bg-[#4f39f6]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
