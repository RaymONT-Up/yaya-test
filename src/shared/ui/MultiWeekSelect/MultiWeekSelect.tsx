import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import { startOfWeek, addDays, isSameWeek, compareAsc } from "date-fns"
import styles from "./MultiWeekSelect.module.scss"
import clsx from "clsx"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import { FieldError } from "react-hook-form"
import { useRef, useState } from "react"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface MultiWeekSelectProps {
  value: Date[]
  onChange: (dates: Date[]) => void
  label?: string
  required?: boolean
  minDate?: Date
  position?: "top" | "bottom"
  error?: FieldError | undefined
}

const getWeekDates = (date: Date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const MultiWeekSelect = ({
  value,
  onChange,
  label,
  required,
  minDate,
  position = "top",
  error
}: MultiWeekSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }
  const selectRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectRef,
    close
  })
  const toggleWeek = (date: Date | null) => {
    if (!date) return

    const week = getWeekDates(date)

    const validWeek = minDate ? week.filter((d) => compareAsc(d, minDate) >= 0) : week

    if (validWeek.length === 0) return

    const weekStart = startOfWeek(validWeek[0], { weekStartsOn: 1 })

    const hasWeek = value.some((d) => isSameWeek(d, weekStart, { weekStartsOn: 1 }))
    let updated: Date[]

    if (hasWeek) {
      updated = value.filter((d) => !isSameWeek(d, weekStart, { weekStartsOn: 1 }))
    } else {
      updated = [...value, ...validWeek]
    }

    const sortedUnique = Array.from(
      new Map(updated.map((d) => [d.toDateString(), d])).values()
    ).sort(compareAsc)

    onChange(sortedUnique)
  }

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const getLabel = (dates: Date[]) => {
    if (dates.length === 0) return ""

    const weekKeys = new Map(
      dates.map((d) => {
        const start = startOfWeek(d, { weekStartsOn: 1 })
        const end = addDays(start, 6)
        return [`${start.toDateString()}-${end.toDateString()}`, true]
      })
    )

    return `Выбрано недель: ${weekKeys.size}`
  }
  console.log(value)
  return (
    <div ref={selectRef} className={styles.container}>
      <Input
        showErrorMessage
        error={error || undefined}
        label={label}
        required={required && value.length === 0}
        readOnly
        value={getLabel(value)}
        onClick={toggleSelect}
        leftIcon={<Calendar />}
        rightIcon={
          value.length > 0 ? (
            <CloseX className={styles.clearIcon} onClick={clearSelection} />
          ) : undefined
        }
        placeholder="Выберите недели"
      />
      {isOpen && (
        <div className={clsx(styles.pickerWrapper, styles[position])}>
          <CustomDatePicker
            selected={null}
            onChange={toggleWeek}
            minDate={minDate}
            showWeekPicker
            inline
            highlightDates={value}
          />
        </div>
      )}
    </div>
  )
}
