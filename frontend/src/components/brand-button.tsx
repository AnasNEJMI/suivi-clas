import * as React from "react"
import type { BrandVariant, ButtonSize } from "./ui-lite/tokens"
import { useBrandButton } from "./ui-lite/use-ui-buttons.tsx"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BrandVariant; size?: ButtonSize }

export const BrandButton = React.forwardRef<HTMLButtonElement, Props>(function BrandButton(
  { variant = "default", size = "default", style, children, type = "button", ...btn }, ref
) {
  const b = useBrandButton(btn, variant, size, style)
  return <button ref={ref} type={type} {...b.props} style={b.style}>{b.wrap(children)}</button>
})