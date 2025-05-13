import { useState } from "react"
import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import styles from "./SelectDays.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
interface DaySelectProps {
  value: Date[] | undefined
  onChange: (date: Date[] | null) => void
  label?: string
  required?: boolean
  minDate?: Date
  error?: FieldError | undefined
}

export const SelectDays = ({
  value,
  onChange,
  label,
  required,
  minDate,
  error
}: DaySelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDaySelect = (date: Date[] | null) => {
    if (date) {
      onChange(date)
    } else {
      onChange(null)
    }
  }

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <div className={styles.container}>
      <Input
        error={error ? error : undefined}
        label={label}
        required={!value && required}
        readOnly
        value={value ? `Выбрано дней: ${value?.length}` : ""}
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={<Calendar />}
        rightIcon={value ? <CloseX className={styles.clearIcon} onClick={clearDate} /> : undefined}
        placeholder="Выберите даты"
      />
      {isOpen && (
        <div className={styles.pickerWrapper}>
          <CustomDatePicker
            onChange={handleDaySelect}
            minDate={minDate}
            selectsMultiple
            selectedDates={value}
          />
        </div>
      )}
    </div>
  )
}
