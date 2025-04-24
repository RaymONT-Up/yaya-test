import React, { useEffect, useState } from 'react'
import styles from './Dropdown.module.scss'

export interface DropdownOption {
  label: string
  value: string | number
}

interface DropdownProps {
  options: DropdownOption[]
  defaultValue?: string | number
  onSelect?: (option: DropdownOption) => void
}

export const Dropdown: React.FC<DropdownProps> = ({ options, defaultValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(options[0])

  useEffect(() => {
    if (defaultValue !== undefined) {
      const found = options.find((opt) => opt.value === defaultValue)
      if (found) {
        setSelectedOption(found)
      }
    }
  }, [defaultValue, options])

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSelect?.(option)
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selectedOption.label}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
