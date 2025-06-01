import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import { format } from "date-fns"
import styles from "./DateRangeSelect.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import clsx from "clsx"
import { useRef, useState } from "react"
import { useClickOutside } from "@/shared/libs/useClickOutside"

interface DateRangeSelectProps {
  value: [Date | null, Date | null]
  onChange: (range: [Date | null, Date | null]) => void
  label?: string
  required?: boolean
  minDate?: Date
  maxDate?: Date
  error?: FieldError
  position?: "top" | "bottom"
}

export const DateRangeSelect = ({
  value,
  onChange,
  label,
  required,
  minDate,
  maxDate,
  error,
  position = "top"
}: DateRangeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const handleRangeSelect = (dates: [Date | null, Date | null]) => {
    onChange(dates)
    if (dates[0] && dates[1]) close()
  }

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([null, null])
  }

  const formattedValue =
    value[0] && value[1]
      ? `${format(value[0], "dd.MM.yyyy")} – ${format(value[1], "dd.MM.yyyy")}`
      : ""

  const toggleSelect = () => {
    setIsOpen((prev) => !prev)
  }
  const selectRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectRef,
    close
  })
  return (
    <div ref={selectRef} className={styles.container}>
      <Input
        showErrorMessage
        error={error}
        label={label}
        required={required && (!value[0] || !value[1])}
        readOnly
        value={formattedValue}
        onClick={toggleSelect}
        leftIcon={<Calendar />}
        rightIcon={
          value[0] && value[1] ? (
            <CloseX className={styles.clearIcon} onClick={clearDate} />
          ) : undefined
        }
        placeholder="Выберите диапазон"
      />
      {isOpen && (
        <div className={clsx(styles.pickerWrapper, styles[position])}>
          <CustomDatePicker
            selectsRange
            startDate={value[0]}
            endDate={value[1]}
            onChange={handleRangeSelect}
            minDate={minDate}
            maxDate={maxDate}
            inline
          />
        </div>
      )}
    </div>
  )
}
