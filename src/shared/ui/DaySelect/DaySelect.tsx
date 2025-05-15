import { Input } from "@/shared/ui/Input/Input"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { CloseX } from "@/shared/assets/svg/Close"
import { format } from "date-fns"
import styles from "./DaySelect.module.scss"
import { FieldError } from "react-hook-form"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import clsx from "clsx"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"
interface DaySelectProps {
  value: Date | null | string
  onChange: (date: Date | null) => void
  label?: string
  required?: boolean
  minDate?: Date
  error?: FieldError | undefined
  position?: "top" | "bottom"
  showErrorMessage?: boolean
}

export const DaySelect = ({
  value,
  onChange,
  label,
  required,
  minDate,
  error,
  position = "top",
  showErrorMessage = false
}: DaySelectProps) => {
  const { isOpen, toggle, close } = useSelectManager("date")

  const handleDaySelect = (date: Date | null) => {
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

  return (
    <div className={styles.container}>
      <Input
        showErrorMessage={showErrorMessage}
        error={error ? error : undefined}
        label={label}
        required={!value && required}
        readOnly
        value={value ? format(value, "yyyy-MM-dd") : ""}
        onClick={toggle}
        leftIcon={<Calendar />}
        rightIcon={value ? <CloseX className={styles.clearIcon} onClick={clearDate} /> : undefined}
        placeholder="Выберите дату"
      />
      {isOpen && (
        <div className={clsx(styles.pickerWrapper, styles[position])}>
          <CustomDatePicker
            selected={value ? new Date(value) : null}
            onChange={handleDaySelect}
            minDate={minDate}
          />
        </div>
      )}
    </div>
  )
}
