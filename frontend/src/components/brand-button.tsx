
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const brandButtonVariants = cva(
  "group relative isolate inline-flex appearance-none [-webkit-appearance:none] h-12 items-center justify-center gap-2 px-4 whitespace-nowrap rounded-lg text-base lg:text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-lime-800 text-white before:content-[''] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:bg-lime-600 before:z-0 before:-translate-y-1.5 active:before:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:hover:before:bg-lime-500",

        black:
          "bg-zinc-900 text-white before:content-[''] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:bg-zinc-700 before:z-0 before:-translate-y-1.5 active:before:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:hover:before:bg-zinc-600",

        destructive:
          "bg-red-800 text-white before:content-[''] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:bg-red-600 before:z-0 before:-translate-y-1.5 active:before:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:hover:before:bg-red-500",

        outline:
          "bg-zinc-200 text-black before:content-[''] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:border before:border-zinc-200 before:bg-zinc-50 before:z-0 before:-translate-y-1.5 active:before:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:hover:before:bg-white",

        secondary:
          "bg-secondary text-secondary-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:bg-secondary/80 active:bg-secondary/70",

        ghost:
          "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 active:bg-accent",

        link:
          "text-primary underline-offset-4 [@media(hover:hover)_and_(pointer:fine)]:hover:underline",

        qcm:
          "text-white bg-indigo-700 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-indigo-600 active:bg-indigo-800"
      },

      size: {
        default: "h-12",
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

function BrandButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof brandButtonVariants> & {
    asChild?: boolean
  }) {

  const Comp = asChild ? Slot : "button"

  const raisedVariants = [
    "default",
    "black",
    "destructive",
    "outline",
  ]

  const hasRaisedEffect = raisedVariants.includes(variant ?? "default")

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        brandButtonVariants({ variant, size, className })
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <span
          className={cn(
            "relative z-10 flex flex-row items-center gap-2",
            hasRaisedEffect &&
              "-translate-y-1.5 group-active:translate-y-0"
          )}
        >
          {children}
        </span>
      )}
    </Comp>
  )
}

export { BrandButton, brandButtonVariants }
