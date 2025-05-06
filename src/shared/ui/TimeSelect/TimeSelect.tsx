import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { PopoverSelect, SelectItem } from '@/shared/ui/PopoverSelect/PopoverSelect'
import { Clock } from '@/shared/assets/svg/Clock'
import styles from './TimeSelect.module.scss'
import { CloseX } from '@/shared/assets/svg/Close'
import { parseTimeToMinutes } from '@/shared/libs/formaDate'

interface TimeSelectProps {
  mode: 'start' | 'end'
  value: string | null | number
  startTime?: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')
const formatTime = (totalMinutes: number) => {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${pad(h)}:${pad(m)}`
}

export const TimeSelect = ({
  mode,
  value,
  startTime,
  onChange,
  label,
  required = false
}: TimeSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (mode === 'end' && startTime && value) {
      const valueMin = parseTimeToMinutes(value.toString())
      const startMin = parseTimeToMinutes(startTime)
      if (valueMin <= startMin) {
        onChange('')
      }
    }
  }, [startTime, mode, value, onChange])

  const timeOptions: SelectItem[] = useMemo(() => {
    const options: SelectItem[] = []
    const baseHour = 6
    const endHour = 22
    const stepMinutes = 15
    const startMinutes = mode === 'end' && startTime ? parseTimeToMinutes(startTime) : 0

    for (let minutes = baseHour * 60; minutes <= endHour * 60; minutes += stepMinutes) {
      if (mode === 'end' && minutes <= startMinutes) continue

      const timeStr = formatTime(minutes)
      let text = ''

      if (mode === 'end' && startTime) {
        const diff = minutes - startMinutes
        const h = Math.floor(diff / 60)
        const m = diff % 60
        text = `(${h > 0 ? `${h}ч ` : ''}${m}м)`
      }

      options.push({
        title: timeStr,
        text,
        value: timeStr
      })
    }

    return options
  }, [mode, startTime])

  const selected = timeOptions.find((opt) => opt.value === value)

  const handleSelect = (item: SelectItem) => {
    onChange(item.value.toString())
    setIsOpen(false)
  }

  const clearValue = () => onChange('')

  return (
    <div className={styles.container}>
      <Input
        required={!value && required}
        label={label}
        placeholder="00:00"
        value={selected?.value ?? ''}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={<Clock width={16} height={16} color="#6B6B6F" />}
        rightIcon={value ? <CloseX onClick={clearValue} className={styles.clearIcon} /> : undefined}
      />
      <PopoverSelect
        isOpen={isOpen}
        options={timeOptions}
        selectedValue={value}
        onSelect={handleSelect}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}
