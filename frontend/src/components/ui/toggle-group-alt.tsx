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
        "group/toggle-group flex min-w-0 items-center gap-(--toggle-group-gap)",
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
      "border-[#e2e8f0] bg-[#ffffff] [box-shadow:0_1px_3px_0_rgb(0_0_0/0.1),0_1px_2px_-1px_rgb(0_0_0/0.1)] dark:border-[#314158] dark:bg-[#0f172b]",
    default:
      "border-transparent bg-[#f1f5f9] dark:bg-[#1d293d]",
  }

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        "group/toggle-item relative inline-flex min-w-0",
        "items-center justify-center overflow-hidden rounded-2xl border",
        "font-semibold leading-normal text-[#314158]",
        "outline-none select-none",
        "transition-all duration-200 ease-out",

        variantClasses[
          resolvedVariant as keyof typeof variantClasses
        ] ?? variantClasses.outline,

        sizeClasses[
          resolvedSize as keyof typeof sizeClasses
        ] ?? sizeClasses.default,

        // Hover
        "hover:transform-[translateY(-0.125rem)] hover:border-[#9ae600]",
        "hover:bg-[rgb(247_254_231/0.7)]",
        "hover:[box-shadow:0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]",
        "active:transform-[translateY(0)]",
        "active:[box-shadow:0_1px_3px_0_rgb(0_0_0/0.1),0_1px_2px_-1px_rgb(0_0_0/0.1)]",

        // Selected
        "data-[state=on]:border-[#5ea500]",
        "data-[state=on]:bg-[#ecfcca]",
        "data-[state=on]:text-[#09090b]",
        "data-[state=on]:[box-shadow:inset_0_0_0_1px_rgba(101,163,13,0.08)]",

        // Keyboard focus
        "focus-visible:z-10",
        "focus-visible:[box-shadow:0_0_0_2px_#ffffff,0_0_0_4px_#5ea500]",
        "dark:focus-visible:[box-shadow:0_0_0_2px_#020618,0_0_0_4px_#5ea500]",

        // Disabled
        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-45",
        "data-disabled:pointer-events-none",
        "data-disabled:opacity-45",

        // Dark mode
        "dark:text-[#e2e8f0]",
        "dark:hover:border-[#497d00]",
        "dark:hover:bg-[rgb(25_46_3/0.4)]",
        "dark:data-[state=on]:border-[#5ea500]",
        "dark:data-[state=on]:bg-[rgb(25_46_3/0.6)]",
        "dark:data-[state=on]:text-[#d8f999]",

        className
      )}
      {...props}
    >
      <div className="flex w-full min-w-0 items-center justify-between gap-3 text-left">
        <div className="min-w-0 flex-1">{children}</div>

        <span
          aria-hidden="true"
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full border",
            "border-[#cad5e2] text-transparent",
            "transition-all duration-200",
            "group-data-[state=on]/toggle-item:border-[#497d00]",
            "group-data-[state=on]/toggle-item:bg-[#497d00]",
            "group-data-[state=on]/toggle-item:text-[#ffffff]",
            "dark:border-[#45556c]",
            "dark:group-data-[state=on]/toggle-item:border-[#7ccf00]",
            "dark:group-data-[state=on]/toggle-item:bg-[#5ea500]"
          )}
        >
          <CheckIcon className="size-3.5 stroke-3" />
        </span>
      </div>
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
