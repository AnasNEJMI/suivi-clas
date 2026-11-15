import * as React from "react"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker"
import "./calendar.css"

const cx = (...parts: Array<string | undefined | false>) => parts.filter(Boolean).join(" ")

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: "ghost" | "outline"
}) {
  // Keep react-day-picker's own rdp-* classes when the caller overrides a key
  const defaults = getDefaultClassNames() as unknown as Record<string, string>
  const mergedClassNames = Object.fromEntries(
    Object.entries(classNames ?? {}).map(([key, value]) => [key, cx(defaults[key], value as string)])
  ) as typeof classNames

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cx(
        "cal",
        buttonVariant === "outline" && "cal--outline",
        captionLayout !== "label" && "cal--dropdown",
        props.showWeekNumber && "cal--weeknum",
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={mergedClassNames}
      components={{
        Root: ({ className, rootRef, ...rest }) => (
          <div data-slot="calendar" ref={rootRef} className={className} {...rest} />
        ),
        Chevron: ({ className, orientation }) => {
          if (orientation === "left") return <ChevronLeftIcon size={16} className={className} />
          if (orientation === "right") return <ChevronRightIcon size={16} className={className} />
          return <ChevronDownIcon size={16} className={className} />
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...rest }) => (
          <td {...rest}>
            <div style={{ display: "flex", width: "var(--cell-size)", height: "var(--cell-size)", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={className}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }