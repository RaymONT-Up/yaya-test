import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import { format, startOfWeek, endOfWeek } from "date-fns"
import styles from "./WeekSelect.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import clsx from "clsx"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"

interface WeekSelectProps {
  value: Date | null
  onChange: (date: Date | null) => void
  label?: string
  required?: boolean
  minDate?: Date
  error?: FieldError | undefined
  position?: "top" | "bottom"
  popoverName?: string
}

export const WeekSelect = ({
  value,
  onChange,
  label,
  required,
  minDate,
  error,
  position = "top",
  popoverName = "week"
}: WeekSelectProps) => {
  const { isOpen, toggle, close } = useSelectManager(popoverName)

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
    <div className={styles.container}>
      <Input
        showErrorMessage
        error={error}
        label={label}
        required={!value && required}
        readOnly
        value={getWeekLabel(value)}
        onClick={toggle}
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
