export const FONT = "inherit" // set to your font stack if body isn't Outfit
export const LIFT = 6 // 3D offset of BrandButton's face, in px
export const FOCUS_RING = "0 0 0 3px rgba(161,161,161,0.5)"
export const SHADOW_SM = "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)"
export const SHADOW_MD = "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)"

export type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | "icon-xl"
type SizeSpec = { height: number; width?: number; padding: string; radius: number; gap: number }

export const BRAND_SIZES: Record<ButtonSize, SizeSpec> = {
  default: { height: 48, padding: "0 16px", radius: 8, gap: 8 },
  sm: { height: 32, padding: "0 12px", radius: 6, gap: 6 },
  lg: { height: 40, padding: "0 24px", radius: 6, gap: 8 },
  icon: { height: 36, width: 36, padding: "0", radius: 8, gap: 8 },
  "icon-sm": { height: 32, width: 32, padding: "0", radius: 8, gap: 8 },
  "icon-lg": { height: 40, width: 40, padding: "0", radius: 8, gap: 8 },
  "icon-xl": { height: 64, width: 64, padding: "0", radius: 8, gap: 8 },
}

export const BUTTON_SIZES: Record<ButtonSize, SizeSpec> = {
  default: { height: 48, padding: " 16px", radius: 6, gap: 8 },
  sm: { height: 32, padding: "0 12px", radius: 6, gap: 6 },
  lg: { height: 40, padding: "0 24px", radius: 6, gap: 8 },
  icon: { height: 36, width: 36, padding: "", radius: 6, gap: 8 },
  "icon-sm": { height: 32, width: 32, padding: "12px", radius: 6, gap: 8 },
  "icon-lg": { height: 40, width: 40, padding: "12px", radius: 6, gap: 8 },
  "icon-xl": { height: 64, width: 64, padding: "12px", radius: 6, gap: 8 },
}

export type BrandVariant = "default" | "black" | "destructive" | "outline" | "qcm"
export const BRAND_VARIANTS: Record<BrandVariant, {
  text: string; base: string; baseHover?: string
  face?: string; faceHover?: string; faceBorder?: string; forceBase?: boolean
}> = {
  default: { text: "#ffffff", base: "#3d6300", face: "#5ea500", faceHover: "#7ccf00" },
  black: { text: "#ffffff", base: "#18181b", face: "#3f3f46", faceHover: "#52525c" },
  destructive: { text: "#ffffff", base: "#9f0712", face: "#e7000b", faceHover: "#e7000b", forceBase: true },
  outline: { text: "#000000", base: "#e4e4e7", face: "#fafafa", faceHover: "#ffffff", faceBorder: "1px solid #e4e4e7" },
  qcm: { text: "#ffffff", base: "#432dd7", baseHover: "#4f39f6" },
}

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "qcm"
export const BUTTON_VARIANTS: Record<ButtonVariant, {
  text: string; bg: string; bgHover?: string; textHover?: string; border?: string
}> = {
  default: { text: "#fafafa", bg: "#171717", bgHover: "rgba(23,23,23,0.9)" },
  destructive: { text: "#ffffff", bg: "#e7000b", bgHover: "rgba(231,0,11,0.9)" },
  outline: { text: "inherit", bg: "#ffffff", bgHover: "#f5f5f5", textHover: "#171717", border: "#e5e5e5" },
  secondary: { text: "#171717", bg: "#f5f5f5", bgHover: "rgba(245,245,245,0.8)" },
  ghost: { text: "inherit", bg: "transparent", bgHover: "#f5f5f5", textHover: "#171717" },
  link: { text: "#171717", bg: "transparent" },
  qcm: { text: "#ffffff", bg: "#432dd7", bgHover: "#4f39f6" },
}

export type ToggleSize = "sm" | "default" | "lg" | "icon"
export const TOGGLE_SIZES: Record<ToggleSize, {
  minHeight: number; width?: number; height?: number; padding: string; fontSize: number
}> = {
  sm: { minHeight: 40, padding: "8px 12px", fontSize: 12 },
  default: { minHeight: 48, padding: "12px 16px", fontSize: 14 },
  lg: { minHeight: 56, padding: "14px 20px", fontSize: 14 },
  icon: { minHeight: 44, width: 44, height: 44, padding: "0", fontSize: 14 },
}

export const TOGGLE_COLORS = {
  text: "#314158", outlineBorder: "#e2e8f0", defaultBg: "#f1f5f9",
  hoverBorder: "#9ae600", hoverBg: "rgba(247,254,231,0.7)",
  onBorder: "#5ea500", onBg: "#ecfcca", onText: "#09090b",
  onInset: "inset 0 0 0 1px rgba(101,163,13,0.08)",
  ring: "0 0 0 2px #ffffff, 0 0 0 4px #5ea500",
  checkBorder: "#cad5e2", checkOn: "#497d00",
}