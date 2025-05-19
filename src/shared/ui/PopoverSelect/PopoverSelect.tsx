import React, { useEffect, useRef, useState, useMemo } from "react"
import { Text, TextTheme, TextVariant } from "@/shared/ui/Text/Text"
import { Input } from "@/shared/ui/Input/Input"
import styles from "./PopoverSelect.module.scss"
import { Search } from "@/shared/assets/svg/Search"
import { ComponentLoader } from "@/shared/ui/ComponentLoader/ComponentLoader"

export type SelectItem = {
  title: string
  text: React.ReactNode | string
  value: string | number
}

interface PopoverSelectProps {
  isOpen: boolean
  options: SelectItem[]
  selectedValue: number | null | string
  onSelect: (option: SelectItem) => void
  onClose: () => void
  width?: string | number
  showSearch?: boolean
  isLoading?: boolean
  error?: string
}

export const PopoverSelect: React.FC<PopoverSelectProps> = ({
  isOpen,
  options,
  selectedValue,
  onSelect,
  onClose,
  width = "360px",
  showSearch = false,
  isLoading = false,
  error
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSelectOption = (option: SelectItem) => {
    onSelect(option)
    onClose()
  }

  const filteredOptions = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase()
    if (!normalized) return options
    return options.filter((option) => option.title.toLowerCase().includes(normalized))
  }, [searchValue, options])

  return (
    <div className={styles.popoverContainer}>
      {isOpen && (
        <div className={styles.popoverContent} ref={popoverRef} style={{ width }}>
          {showSearch && (
            <div className={styles.search}>
              <Input
                leftIcon={<Search />}
                placeholder="Поиск по названию"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          )}
          <div className={styles.optionsWrapper}>
            {isLoading ? (
              <div className={styles.loaderWrapper}>
                <ComponentLoader size={40} />
              </div>
            ) : error ? (
              <div className={styles.errorWrapper}>
                <Text
                  theme={TextTheme.ERROR}
                  variant={TextVariant.BODY}
                  bodySize="small"
                  className={styles.empty}
                >
                  {error}
                </Text>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${option.value === selectedValue ? styles.selected : ""}`}
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
              ))
            ) : (
              <Text variant={TextVariant.BODY} bodySize="small" className={styles.empty}>
                Опции не найдены
              </Text>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
