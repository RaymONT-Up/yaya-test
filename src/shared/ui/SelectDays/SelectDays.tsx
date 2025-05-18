import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import styles from "./SelectDays.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import clsx from "clsx"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"
interface DaySelectProps {
  value: Date[] | undefined
  onChange: (date: Date[] | null) => void
  label?: string
  required?: boolean
  minDate?: Date
  error?: FieldError | undefined
  position?: "top" | "bottom"
}

export const SelectDays = ({
  value,
  onChange,
  label,
  required,
  minDate,
  error,
  position = "top"
}: DaySelectProps) => {
  const { isOpen, toggle } = useSelectManager("date_multiple")

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
        showErrorMessage
        error={error ? error : undefined}
        label={label}
        required={!value && required}
        readOnly
        value={value?.length ? `Выбрано дней: ${value?.length}` : ""}
        onClick={toggle}
        leftIcon={<Calendar />}
        rightIcon={
          value?.length ? <CloseX className={styles.clearIcon} onClick={clearDate} /> : undefined
        }
        placeholder="Выберите даты"
      />
      {isOpen && (
        <div className={clsx(styles.pickerWrapper, styles[position])}>
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
