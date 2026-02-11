import React from "react"

const BIG_SCREEN_BREAKPOINT = 1024

export function useIsBigScreen() {
  const [isBigScreen, setIsBigScreen] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BIG_SCREEN_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsBigScreen(window.innerWidth < BIG_SCREEN_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsBigScreen(window.innerWidth < BIG_SCREEN_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isBigScreen
}