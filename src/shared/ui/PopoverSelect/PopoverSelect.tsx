import React, { useEffect, useRef } from 'react'
import { DropdownOption } from '@/shared/ui/Dropdown/Dropdown'
import { Text } from '@/shared/ui/Text/Text'
import styles from './PopoverSelect.module.scss'

interface PopoverSelectProps {
  isOpen: boolean
  options: DropdownOption[]
  selectedValue: number | null
  onSelect: (option: DropdownOption) => void
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

  const handleSelectOption = (option: DropdownOption) => {
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
              <Text>{option.label}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
