import * as React from "react"

export type ButtonHandlers = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onPointerEnter" | "onPointerLeave" | "onPointerDown" | "onPointerUp" |
  "onPointerCancel" | "onKeyDown" | "onKeyUp" | "onFocus" | "onBlur" | "disabled"
>

const focusVisible = (el: HTMLElement) => {
  try { return el.matches(":focus-visible") } catch { return false }
}

export function useButtonState<T extends ButtonHandlers>(props: T) {
  const [hovered, setHovered] = React.useState(false)
  const [pressed, setPressed] = React.useState(false)
  const [focused, setFocused] = React.useState(false)

  const merged = {
    ...props,
    onPointerEnter: (e: React.PointerEvent<HTMLButtonElement>) => { if (e.pointerType === "mouse") setHovered(true); props.onPointerEnter?.(e) },
    onPointerLeave: (e: React.PointerEvent<HTMLButtonElement>) => { setHovered(false); setPressed(false); props.onPointerLeave?.(e) },
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => { setPressed(true); props.onPointerDown?.(e) },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => { setPressed(false); props.onPointerUp?.(e) },
    onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => { setPressed(false); props.onPointerCancel?.(e) },
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => { if (e.key === " " || e.key === "Enter") setPressed(true); props.onKeyDown?.(e) },
    onKeyUp: (e: React.KeyboardEvent<HTMLButtonElement>) => { setPressed(false); props.onKeyUp?.(e) },
    onFocus: (e: React.FocusEvent<HTMLButtonElement>) => { setFocused(focusVisible(e.currentTarget)); props.onFocus?.(e) },
    onBlur: (e: React.FocusEvent<HTMLButtonElement>) => { setFocused(false); setPressed(false); props.onBlur?.(e) },
  } as T

  return { hovered, pressed, focused, props: merged }
}

export function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`
  const [matches, setMatches] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  )
  React.useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [query])
  return matches
}