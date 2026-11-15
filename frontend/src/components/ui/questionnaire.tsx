import * as React from "react"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { useBrandButton, useFlatButton } from "@/components/ui-lite/use-ui-buttons"
import { useMinWidth } from "@/components/ui-lite/use-button-state"
import type { BrandVariant, ButtonSize, ButtonVariant } from "@/components/ui-lite/tokens"
import "./questionnaire.css"

const MUTED = "#737373"
const cx = (base: string, extra?: unknown) => (typeof extra === "string" && extra ? `${base} ${extra}` : base)
const asStyle = (s: unknown) => (s && typeof s === "object" ? (s as React.CSSProperties) : undefined)

function Questionnaire({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      style={{ display: "flex", width: "100%", minWidth: 0, flexDirection: "column", gap: 16, ...asStyle(style) }}
      {...props}
    />
  )
}

function QuestionnaireProgress({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Progress>) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      style={{
        minHeight: 16, width: "fit-content", minWidth: "14ch", fontSize: 12, lineHeight: "16px",
        fontWeight: 500, color: MUTED, fontVariantNumeric: "tabular-nums", ...asStyle(style),
      }}
      {...props}
    />
  )
}

function QuestionnaireItem({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      style={{ display: "flex", minWidth: 0, flexDirection: "column", gap: 16, border: 0, padding: 0, margin: 0, outline: "none", ...asStyle(style) }}
      {...props}
    />
  )
}

function QuestionnaireTitle({ className, style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cx("cn-font-heading q-title", className)}
      style={{ fontSize: 18, lineHeight: 1.375, fontWeight: 500, ...asStyle(style) }}
      {...props}
    />
  )
}

function QuestionnaireDescription({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      style={{ fontSize: 14, lineHeight: "20px", color: MUTED, ...asStyle(style) }}
      {...props}
    />
  )
}

function QuestionnaireChoices({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      style={{ display: "grid", minWidth: 0, gap: 8, ...asStyle(style) }}
      {...props}
    />
  )
}

function QuestionnaireChoice({ children, className, style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cx("q-choice", className)}
      style={{
        position: "relative", boxSizing: "border-box",
        display: "flex", alignItems: "flex-start", gap: 10, minHeight: 48,
        padding: "10px 12px", borderRadius: 8, borderWidth: 1, borderStyle: "solid",
        fontSize: 16, lineHeight: 1.5, textAlign: "start", cursor: "pointer", outline: "none",
        WebkitUserSelect: "none", userSelect: "none", WebkitTapHighlightColor: "transparent",
        ...asStyle(style),
      }}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 10, width: "100%", height: "100%", margin: 0, opacity: 0, cursor: "pointer" }}
      />
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        style={{ display: "flex", minWidth: 0, flex: "1 1 0%", flexDirection: "row", alignItems: "flex-start", gap: 2, lineHeight: 1.375 }}
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className="q-shortcut"
        style={{
          pointerEvents: "none", marginInlineStart: "auto", flexShrink: 0, width: 20, height: 20,
          alignItems: "center", justifyContent: "center", borderRadius: 6, border: "1px solid #e5e5e5",
          backgroundColor: "#ffffff", color: MUTED, fontFamily: "ui-monospace, Menlo, Consolas, monospace",
          fontSize: 10, lineHeight: 1, fontWeight: 500, transform: "translateY(1.8px)",
        }}
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireChoiceDescription({ style, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="questionnaire-choice-description" style={{ color: MUTED, ...style }} {...props} />
}

function QuestionnaireInput({ className, style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  const sm = useMinWidth(640)
  const md = useMinWidth(768)
  return (
    <div data-slot="questionnaire-input-wrapper" style={{ position: "relative", width: "100%", minWidth: 0 }}>
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        className={cx("q-input", className)}
        style={{
          boxSizing: "border-box", width: "100%", minWidth: 0,
          height: 32, minHeight: sm ? 0 : 44, padding: "4px 10px", borderRadius: 8,
          borderWidth: 1, borderStyle: "solid", outline: "none",
          fontSize: md ? 14 : 16, transition: "border-color .15s, box-shadow .15s, background-color .15s",
          ...asStyle(style),
        }}
        {...props}
      />
    </div>
  )
}

function QuestionnaireError({ style, ...props }: React.ComponentProps<typeof QuestionnairePrimitive.Error>) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      style={{ marginTop: 8, fontSize: 14, lineHeight: "20px", color: "#e7000b", ...asStyle(style) }}
      {...props}
    >
      Veuillez sélectionner une réponse avant de confirmer.
    </QuestionnairePrimitive.Error>
  )
}

function QuestionnaireActions({ style, ...props }: React.ComponentProps<"div">) {
  const sm = useMinWidth(640)
  return (
    <div
      data-slot="questionnaire-actions"
      style={{
        display: "grid", width: "100%", minHeight: sm ? 32 : 44,
        gridTemplateColumns: "minmax(0, 1fr) auto auto", alignItems: "center", gap: 8, ...style,
      }}
      {...props}
    />
  )
}

function QuestionnairePrevious({
  children, size = "default", variant = "outline", style, ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Previous> & { size?: ButtonSize; variant?: ButtonVariant }) {
  const sm = useMinWidth(640)
  const b = useFlatButton(props, variant, size, {
    gridColumn: 1, gridRow: 1, justifySelf: "start", minHeight: sm ? 0 : 44, ...asStyle(style),
  })
  return (
    <QuestionnairePrimitive.Previous data-slot="questionnaire-previous" data-size={size} data-variant={variant} {...b.props} style={b.style}>
      {children ?? "Previous"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  children, size = "default", variant = "outline", style, ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Skip> & { size?: ButtonSize; variant?: BrandVariant }) {
  const sm = useMinWidth(640)
  const b = useBrandButton(props, variant, size, {
    gridColumn: 2, gridRow: 1, justifySelf: "end", minHeight: sm ? 0 : 44, ...asStyle(style),
  })
  return (
    <QuestionnairePrimitive.Skip data-slot="questionnaire-skip" data-size={size} data-variant={variant} {...b.props} style={b.style}>
      {b.wrap(children ?? "Skip")}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  children, size = "default", variant = "default", style, ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Next> & { size?: ButtonSize; variant?: BrandVariant }) {
  const sm = useMinWidth(640)
  const b = useBrandButton(props, variant, size, {
    gridColumn: 3, gridRow: 1, justifySelf: "end", minHeight: sm ? 0 : 44, ...asStyle(style),
  })
  return (
    <QuestionnairePrimitive.Next data-slot="questionnaire-next" data-size={size} data-variant={variant} {...b.props} style={b.style}>
      {b.wrap(children ?? "Next")}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  children, size = "default", variant = "default", style, ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Submit> & { size?: ButtonSize; variant?: BrandVariant }) {
  const sm = useMinWidth(640)
  const b = useBrandButton(props, variant, size, {
    gridColumn: 3, gridRow: 1, justifySelf: "end", minHeight: sm ? 0 : 44, ...asStyle(style),
  })
  return (
    <QuestionnairePrimitive.Submit data-slot="questionnaire-submit" data-size={size} data-variant={variant} {...b.props} style={b.style}>
      {b.wrap(children ?? "Submit")}
    </QuestionnairePrimitive.Submit>
  )
}

export {
  Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoiceDescription,
  QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput,
  QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress,
  QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle,
}