import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import { format, startOfWeek, endOfWeek } from "date-fns"
import styles from "./WeekSelect.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import clsx from "clsx"
import { useRef, useState } from "react"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface WeekSelectProps {
  value: Date | null
  onChange: (date: Date | null) => void
  label?: string
  required?: boolean
  minDate?: Date
  error?: FieldError | undefined
  position?: "top" | "bottom"
}

export const WeekSelect = ({
  value,
  onChange,
  label,
  required,
  minDate,
  error,
  position = "top"
}: WeekSelectProps) => {
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
  const handleWeekSelect = (date: Date | null) => {
    if (date) {
      onChange(date)
    } else {
      onChange(null)
    }
    close()
  }

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  const getWeekLabel = (date: Date | null) => {
    if (!date) return ""
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return `${format(start, "dd.MM.yyyy")} – ${format(end, "dd.MM.yyyy")}`
  }

  return (
    <div ref={selectRef} className={styles.container}>
      <Input
        showErrorMessage
        error={error}
        label={label}
        required={!value && required}
        readOnly
        value={getWeekLabel(value)}
        onClick={toggleSelect}
        leftIcon={<Calendar />}
        rightIcon={value ? <CloseX className={styles.clearIcon} onClick={clearDate} /> : undefined}
        placeholder="Выберите неделю"
      />
      {isOpen && (
        <div className={clsx(styles.pickerWrapper, styles[position])}>
          <CustomDatePicker
            selected={value}
            onChange={handleWeekSelect}
            minDate={minDate}
            showWeekPicker
          />
        </div>
      )}
    </div>
  )
}
