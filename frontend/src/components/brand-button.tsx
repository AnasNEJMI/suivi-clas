import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const brandButtonVariants = cva(
  "group relative inline-flex h-12 items-center justify-center gap-2 px-4 whitespace-nowrap rounded-lg text-base lg:text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-lime-800 text-white hover:before:bg-lime-500 before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-lime-600 before:z-10 before:-translate-y-1.5 active:before:translate-y-0",
        black: "bg-zinc-900 text-white hover:before:bg-zinc-600 before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-zinc-700 before:z-10 before:-translate-y-1.5 active:before:translate-y-0",
        destructive:
          "bg-red-800 text-white hover:before:bg-red-600 before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-red-600 before:z-10 before:-translate-y-1.5 active:before:translate-y-0",
        outline:
          "bg-zinc-200 text-black before:border before:border-zinc-200 hover:before:bg-white before:rounded-lg before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-zinc-50 before:z-10 before:-translate-y-1.5 active:before:translate-y-0",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        qcm : "text-white bg-indigo-700 hover:bg-indigo-600"
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

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(brandButtonVariants({ variant, size, className }))}
      {...props}
    >
      <div  className="relative z-20 -translate-y-1.5 group-active:translate-y-0 flex flex-row items-center gap-2">
        {children}
      </div>
    </Comp>
  )
}

export { BrandButton, brandButtonVariants }