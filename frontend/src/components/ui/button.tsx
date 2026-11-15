import * as React from "react"
import type { ButtonSize, ButtonVariant } from "../ui-lite/tokens"
import { useFlatButton } from "../ui-lite/use-ui-buttons"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }

export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "default", size = "default", style, children, type = "button", ...btn }, ref
) {
  const b = useFlatButton(btn, variant, size, style)
  return <button ref={ref} type={type} {...b.props} style={b.style}>{children}</button>
})