import { useState } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { Calendar } from '@/shared/assets/svg/Calendar'
import { CloseX } from '@/shared/assets/svg/Close'
import { format } from 'date-fns'
import styles from './DaySelect.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DaySelectProps {
  value: Date | null | string
  onChange: (date: Date | null) => void
  label?: string
  required?: boolean
}

export const DaySelect = ({ value, onChange, label, required }: DaySelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDaySelect = (date: Date | null) => {
    if (date) {
      onChange(date)
    } else {
      onChange(null)
    }
    setIsOpen(false)
  }

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
  }

  return (
    <div className={styles.container}>
      <Input
        label={label}
        required={!value && required}
        readOnly
        value={value ? format(value, 'yyyy-MM-dd') : ''}
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={<Calendar />}
        rightIcon={value ? <CloseX className={styles.clearIcon} onClick={clearDate} /> : undefined}
        placeholder="Выберите дату"
      />
      {isOpen && (
        <div className={styles.pickerWrapper}>
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={handleDaySelect}
            inline
            dateFormat="yyyy-MM-dd"
          />
        </div>
      )}
    </div>
  )
}
