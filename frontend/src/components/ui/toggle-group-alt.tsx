import * as React from "react"
import {
  FONT, SHADOW_MD, SHADOW_SM, TOGGLE_COLORS as C, TOGGLE_SIZES,
  type ToggleSize,
} from "../ui-lite/tokens"
import { useButtonState } from "../ui-lite/use-button-state";

type Variant = "outline" | "default"
type Base = {
  variant?: Variant; size?: ToggleSize; spacing?: number
  orientation?: "horizontal" | "vertical"; disabled?: boolean
  style?: React.CSSProperties; children?: React.ReactNode
}
type SingleProps = Base & { type?: "single"; value?: string; defaultValue?: string; onValueChange?: (v: string) => void }
type MultipleProps = Base & { type: "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?: (v: string[]) => void }
export type ToggleGroupProps = SingleProps | MultipleProps

type Ctx = { variant: Variant; size: ToggleSize; disabled: boolean; multiple: boolean; isOn: (v: string) => boolean; toggle: (v: string) => void }
const GroupContext = React.createContext<Ctx | null>(null)
const toList = (v?: string | string[]) => (Array.isArray(v) ? v : v ? [v] : [])

export function ToggleGroup(props: ToggleGroupProps) {
  const { variant = "outline", size = "default", spacing = 2, orientation = "horizontal", disabled = false, style, children } = props
  const multiple = props.type === "multiple"
  const vertical = orientation === "vertical"
  const [inner, setInner] = React.useState<string[]>(() => toList(props.defaultValue))
  const list = props.value !== undefined ? toList(props.value) : inner

  const toggle = (v: string) => {
    const next = list.includes(v) ? list.filter((x) => x !== v) : multiple ? [...list, v] : [v]
    if (props.value === undefined) setInner(next)
    if (props.type === "multiple") props.onValueChange?.(next)
    else props.onValueChange?.(next[0] ?? "")
  }

  return (
    <GroupContext.Provider value={{ variant, size, disabled, multiple, isOn: (v) => list.includes(v), toggle }}>
      <div
        role={multiple ? "group" : "radiogroup"}
        style={{
          display: "flex", minWidth: 0,
          flexDirection: vertical ? "column" : "row",
          alignItems: vertical ? "stretch" : "center",
          width: vertical ? "100%" : undefined,
          gap: Math.max(0, spacing) * 4,
          ...style,
        }}
      >
        {children}
      </div>
    </GroupContext.Provider>
  )
}

type ItemProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> & {
  value: string; variant?: Variant; size?: ToggleSize
}

export function ToggleGroupItem({ value, variant, size, style, children, onClick, ...btn }: ItemProps) {
  const g = React.useContext(GroupContext)
  const st = useButtonState(btn)
  if (!g) throw new Error("ToggleGroupItem must be used inside ToggleGroup")

  const v = variant ?? g.variant
  const sz = TOGGLE_SIZES[size ?? g.size]
  const on = g.isOn(value)
  const disabled = g.disabled || !!btn.disabled

  let border = v === "outline" ? C.outlineBorder : "transparent"
  let bg = v === "outline" ? "#ffffff" : C.defaultBg
  let color = C.text
  if (st.hovered) { border = C.hoverBorder; bg = C.hoverBg }
  if (on) { border = C.onBorder; bg = C.onBg; color = C.onText }

  const shadows: string[] = []
  if (st.focused) shadows.push(C.ring)
  if (st.pressed) shadows.push(SHADOW_SM)
  else if (st.hovered) shadows.push(SHADOW_MD)
  else if (v === "outline") shadows.push(SHADOW_SM)
  if (on) shadows.push(C.onInset)

  return (
    <button
      type="button"
      role={g.multiple ? undefined : "radio"}
      aria-checked={g.multiple ? undefined : on}
      aria-pressed={g.multiple ? on : undefined}
      data-state={on ? "on" : "off"}
      {...st.props}
      onClick={(e) => { onClick?.(e); if (!e.defaultPrevented) g.toggle(value) }}
      style={{
        position: "relative", zIndex: st.focused ? 10 : undefined,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        minWidth: 0, overflow: "hidden", borderRadius: 16,
        borderWidth: 1, borderStyle: "solid", borderColor: border,
        minHeight: sz.minHeight, width: sz.width, height: sz.height, padding: sz.padding,
        fontFamily: FONT, fontSize: sz.fontSize, fontWeight: 600, lineHeight: 1.5,
        color, backgroundColor: bg, boxShadow: shadows.join(", ") || "none",
        transform: st.hovered && !st.pressed ? "translateY(-2px)" : "none",
        outline: "none", WebkitAppearance: "none", appearance: "none",
        WebkitUserSelect: "none", userSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1, pointerEvents: disabled ? "none" : "auto",
        transition: "all 200ms ease-out",
        ...style,
      }}
    >
      <div style={{ display: "flex", width: "100%", minWidth: 0, alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left" }}>
        <div style={{ minWidth: 0, flex: 1 }}>{children}</div>
        <span
          aria-hidden="true"
          style={{
            display: "grid", placeItems: "center", flexShrink: 0,
            width: 20, height: 20, borderRadius: "50%",
            borderWidth: 1, borderStyle: "solid",
            borderColor: on ? C.checkOn : C.checkBorder,
            backgroundColor: on ? C.checkOn : "transparent",
            color: on ? "#ffffff" : "transparent",
            transition: "all 200ms",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      </div>
    </button>
  )
}