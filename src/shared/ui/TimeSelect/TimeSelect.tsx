import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { PopoverSelect, SelectItem } from '@/shared/ui/PopoverSelect/PopoverSelect'
import { Clock } from '@/shared/assets/svg/Clock'
import styles from './TimeSelect.module.scss'
import { CloseX } from '@/shared/assets/svg/Close'
import { parseTimeToMinutes } from '@/shared/libs/formaDate'

interface TimeSelectProps {
  mode: 'start' | 'end'
  value: string | null
  minTime: string
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
  minTime,
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
    const minMinutes = minTime ? parseTimeToMinutes(minTime) : 0

    for (
      let minutes = Math.max(baseHour * 60, minMinutes);
      minutes <= endHour * 60;
      minutes += stepMinutes
    ) {
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
  }, [mode, startTime, minTime])

  const handleSelect = (item: SelectItem) => {
    onChange(item.value.toString())
    setIsOpen(false)
  }

  const clearValue = () => onChange('')
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')

    if (raw.length === 4) {
      const h = parseInt(raw.slice(0, 2), 10)
      const m = parseInt(raw.slice(2, 4), 10)
      const clampedH = Math.min(h, 22)
      const clampedM = Math.min(m, 59)

      let finalH = clampedH
      let finalM = clampedM

      if (mode === 'start' && finalH === 22) {
        finalH = 21
        finalM = 45
      } else if (mode === 'end' && finalH === 22) {
        finalM = 0
      }

      const newTime = `${pad(finalH)}:${pad(finalM)}`

      if (newTime < minTime) {
        onChange('')
      } else {
        onChange(newTime)
      }
    } else {
      onChange(raw)
    }
  }

  const onInputBlur = () => {
    if (!value) return

    const raw = value.replace(/\D/g, '')
    let formatted = ''

    if (raw.length === 1) {
      formatted = `0${raw}:00`
    } else if (raw.length === 2) {
      formatted = `${pad(Number(raw))}:00`
    } else if (raw.length === 3) {
      const h = parseInt(raw[0], 10)
      const m = parseInt(raw.slice(1), 10)
      formatted = `${pad(h)}:${pad(m)}`
    } else if (raw.length === 4) {
      const h = parseInt(raw.slice(0, 2), 10)
      const m = parseInt(raw.slice(2), 10)
      formatted = `${pad(h)}:${pad(m)}`
    } else {
      onChange('')
      return
    }

    const [h, m] = formatted.split(':').map(Number)

    if (h > 22 || m > 59) {
      onChange('')
      return
    }

    if (formatted < minTime) {
      onChange('')
    } else {
      if (mode === 'start' && h === 22) {
        onChange('21:45')
      } else if (mode === 'end' && h === 22 && m > 0) {
        onChange('22:00')
      } else {
        onChange(`${pad(h)}:${pad(m)}`)
      }
    }
  }

  return (
    <div className={styles.container}>
      <Input
        required={!value && required}
        label={label}
        placeholder="00:00"
        value={value ?? ''}
        onClick={() => setIsOpen((prev) => !prev)}
        leftIcon={<Clock width={16} height={16} color="#6B6B6F" />}
        rightIcon={value ? <CloseX onClick={clearValue} className={styles.clearIcon} /> : undefined}
        onChange={onInputChange}
        onBlur={onInputBlur}
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
