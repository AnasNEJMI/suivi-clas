
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const FACE =
  "before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:rounded-lg before:z-10 before:[transform:translateY(-0.375rem)] active:before:[transform:translateY(0)]"

const brandButtonVariants = cva(
  "group relative isolate inline-flex appearance-none [-webkit-appearance:none] h-12 items-center justify-center gap-2 px-4 whitespace-nowrap rounded-lg text-base lg:text-lg font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:     `bg-[#3d6300] text-[#ffffff] before:bg-[#5ea500] hover:before:bg-[#7ccf00] ${FACE}`,
        black:       `bg-[#18181b] text-[#ffffff] before:bg-[#3f3f46] hover:before:bg-[#52525c] ${FACE}`,
        destructive: `bg-[#9f0712] text-[#ffffff] text-base! before:bg-[#e7000b] ${FACE}`,
        outline:     `bg-[#e4e4e7] text-[#000000] before:bg-[#fafafa] before:[border:1px_solid_#e4e4e7] hover:before:bg-[#ffffff] ${FACE}`,
        qcm:         "text-[#ffffff] bg-[#432dd7] hover:bg-[#4f39f6]",
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
      className={cn(
        brandButtonVariants({ variant, size, className })
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <div className="relative z-20 flex flex-row items-center gap-2 transform-[translateY(-0.375rem)] group-active:transform-[translateY(0)]">
          {children}
        </div>
      )}
    </Comp>
  )
}

export { BrandButton, brandButtonVariants }
