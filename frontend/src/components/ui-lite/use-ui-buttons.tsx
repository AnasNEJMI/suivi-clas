import * as React from "react"
import {
  BRAND_SIZES, BRAND_VARIANTS, BUTTON_SIZES, BUTTON_VARIANTS, FONT, FOCUS_RING, LIFT,
  type BrandVariant, type ButtonSize, type ButtonVariant,
} from "./tokens"
import { useButtonState, useMinWidth, type ButtonHandlers } from "./use-button-state"

export function useBrandButton<T extends ButtonHandlers>(
  btn: T, variant: BrandVariant, size: ButtonSize, extra?: React.CSSProperties
) {
  const v = BRAND_VARIANTS[variant]
  const s = BRAND_SIZES[size]
  const large = useMinWidth(1024)
  const { hovered, pressed, focused, props } = useButtonState(btn)
  const disabled = !!btn.disabled
  const dy = pressed ? 0 : -LIFT

  const style: React.CSSProperties = {
    position: "relative", isolation: "isolate", boxSizing: "border-box",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: s.gap, height: s.height, width: s.width, padding: s.padding,
    borderRadius: s.radius, border: 0, margin: 0, whiteSpace: "nowrap", flexShrink: 0,
    fontFamily: FONT, fontSize: large && !v.forceBase ? 18 : 16, fontWeight: 500, lineHeight: 1.5,
    color: v.text,
    backgroundColor: !v.face && hovered && v.baseHover ? v.baseHover : v.base,
    WebkitAppearance: "none", appearance: "none", WebkitTapHighlightColor: "transparent",
    outline: "none", boxShadow: focused ? FOCUS_RING : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto",
    transition: "opacity 150ms, background-color 150ms",
    ...extra,
  }

  const wrap = (children: React.ReactNode) => (
    <>
      {v.face && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
            boxSizing: "border-box", borderRadius: "inherit", zIndex: 1,
            backgroundColor: hovered ? v.faceHover : v.face,
            border: v.faceBorder, pointerEvents: "none",
            transform: `translateY(${dy}px)`,
            transition: "transform 80ms ease-out, background-color 150ms",
          }}
        />
      )}
      <span
        style={{
          position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: s.gap,
          ...(v.face ? { transform: `translateY(${dy}px)`, transition: "transform 80ms ease-out" } : {}),
        }}
      >
        {children}
      </span>
    </>
  )

  return { props, style, wrap }
}

export function useFlatButton<T extends ButtonHandlers>(
  btn: T, variant: ButtonVariant, size: ButtonSize, extra?: React.CSSProperties
) {
  const v = BUTTON_VARIANTS[variant]
  const s = BUTTON_SIZES[size]
  const { hovered, focused, props } = useButtonState(btn)
  const disabled = !!btn.disabled

  const style: React.CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: s.gap, height: s.height, width: s.width, padding: s.padding,
    borderRadius: s.radius, margin: 0, whiteSpace: "nowrap", flexShrink: 0,
    borderWidth: 1, borderStyle: "solid", borderColor: v.border ?? "transparent",
    fontFamily: FONT, fontSize: "inherit", fontWeight: 500,
    color: hovered && v.textHover ? v.textHover : v.text,
    backgroundColor: hovered && v.bgHover ? v.bgHover : v.bg,
    textDecoration: variant === "link" && hovered ? "underline" : "none",
    textUnderlineOffset: 4,
    WebkitAppearance: "none", appearance: "none", WebkitTapHighlightColor: "transparent",
    outline: "none", boxShadow: focused ? FOCUS_RING : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto",
    transition: "background-color 150ms, color 150ms, opacity 150ms",
    ...extra,
  }

  return { props, style }
}