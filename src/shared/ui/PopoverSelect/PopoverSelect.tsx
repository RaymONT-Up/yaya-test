import React, { useEffect, useRef } from 'react'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import styles from './PopoverSelect.module.scss'

export type SelectItem = {
  title: string
  text: string
  value: string | number
}
interface PopoverSelectProps {
  isOpen: boolean
  options: SelectItem[]
  selectedValue: number | null | string
  onSelect: (option: SelectItem) => void
  onClose: () => void
}

export const PopoverSelect: React.FC<PopoverSelectProps> = ({
  isOpen,
  options,
  selectedValue,
  onSelect,
  onClose
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSelectOption = (option: SelectItem) => {
    onSelect(option)
    onClose()
  }

  return (
    <div className={styles.popoverContainer}>
      {isOpen && (
        <div className={styles.popoverContent} ref={popoverRef}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${option.value === selectedValue ? styles.selected : ''}`}
              onClick={() => handleSelectOption(option)}
            >
              <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                {option.title}
              </Text>
              {option.text && (
                <Text variant={TextVariant.BODY} bodySize="small" className={styles.text}>
                  {option.text}
                </Text>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
