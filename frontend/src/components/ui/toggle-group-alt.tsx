
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

type ToggleVariants = VariantProps<typeof toggleVariants>

type ToggleGroupContextValue = {
  variant?: ToggleVariants["variant"]
  size?: ToggleVariants["size"]
  spacing: number
}

const ToggleGroupContext =
  React.createContext<ToggleGroupContextValue>({
    variant: "outline",
    size: "default",
    spacing: 2,
  })

function ToggleGroup({
  className,
  variant = "outline",
  size = "default",
  spacing = 2,
  children,
  style,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleVariants & {
    spacing?: number
  }) {
  const groupStyle = {
    "--toggle-group-gap": `${Math.max(0, spacing) * 0.25}rem`,
    ...style,
  } as React.CSSProperties

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={groupStyle}
      className={cn(
        "group/toggle-group flex min-w-0 items-center gap-[var(--toggle-group-gap)]",
        "data-[orientation=vertical]:w-full",
        "data-[orientation=vertical]:flex-col",
        "data-[orientation=vertical]:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  ToggleVariants) {
  const context = React.useContext(ToggleGroupContext)

  const resolvedVariant = context.variant ?? variant ?? "outline"
  const resolvedSize = context.size ?? size ?? "default"

  const sizeClasses = {
    sm: "min-h-10 px-3 py-2 text-xs",
    default: "min-h-12 px-4 py-3 text-sm",
    lg: "min-h-14 px-5 py-3.5 text-sm",
    icon: "size-11 p-0",
  }

  const variantClasses = {
    outline:
      "border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
    default:
      "border-transparent bg-slate-100 dark:bg-slate-800",
  }

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        "group/toggle-item relative inline-flex min-w-0",
        "items-center justify-center overflow-hidden rounded-2xl border",
        "font-semibold leading-normal text-slate-700",
        "outline-none select-none",
        "transition-all duration-200 ease-out",

        // Default appearance
        variantClasses[
          resolvedVariant as keyof typeof variantClasses
        ] ?? variantClasses.outline,

        // Sizes
        sizeClasses[
          resolvedSize as keyof typeof sizeClasses
        ] ?? sizeClasses.default,

        // Hover
        "hover:-translate-y-0.5 hover:border-lime-400",
        "hover:bg-lime-50/70 hover:shadow-md",
        "active:translate-y-0 active:shadow-sm",

        // Selected state
        "data-[state=on]:border-lime-600",
        "data-[state=on]:bg-lime-100",
        "data-[state=on]:text-zinc-950",
        "data-[state=on]:shadow-[inset_0_0_0_1px_rgba(101,163,13,0.08)]",

        // Keyboard accessibility
        "focus-visible:z-10",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-lime-600",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-white",
        "dark:focus-visible:ring-offset-slate-950",

        // Disabled state
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-45",
        "data-[disabled]:pointer-events-none",
        "data-[disabled]:opacity-45",

        // Dark mode
        "dark:text-slate-200",
        "dark:hover:border-lime-700",
        "dark:hover:bg-lime-950/40",
        "dark:data-[state=on]:border-lime-600",
        "dark:data-[state=on]:bg-lime-950/60",
        "dark:data-[state=on]:text-lime-200",

        className
      )}
      {...props}
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-3 text-left">
        <div className="min-w-0 flex-1">
          {children}
        </div>

        {/* Persistent space keeps option labels aligned. */}
        <span
          aria-hidden="true"
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full border",
            "border-slate-300 text-transparent",
            "transition-all duration-200",
            "group-data-[state=on]/toggle-item:border-lime-700",
            "group-data-[state=on]/toggle-item:bg-lime-700",
            "group-data-[state=on]/toggle-item:text-white",
            "dark:border-slate-600",
            "dark:group-data-[state=on]/toggle-item:border-lime-500",
            "dark:group-data-[state=on]/toggle-item:bg-lime-600"
          )}
        >
          <CheckIcon className="size-3.5 stroke-[3]" />
        </span>
      </div>
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
