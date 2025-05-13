import React, { useEffect, useRef, useState, useMemo } from "react"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { Input } from "@/shared/ui/Input/Input"
import styles from "./Menu.module.scss"
import { Search } from "@/shared/assets/svg/Search"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"

export type SelectItem = {
  title: string
  text?: React.ReactNode | string
  value: string | number
}

interface MenuProps {
  isOpen: boolean
  options: SelectItem[]
  selectedValues: (string | number)[]
  onChange: (values: (string | number)[]) => void
  onClose: () => void
  width?: string | number
  showSearch?: boolean
  selectAllText?: string
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  options,
  selectedValues,
  onChange,
  onClose,
  width = "360px",
  showSearch = false,
  selectAllText = "Выбрать все"
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleToggleValue = (value: string | number) => {
    const exists = selectedValues.includes(value)
    if (exists) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const allValues = useMemo(() => options.map((opt) => opt.value), [options])
  const allSelected = allValues.length > 0 && allValues.every((v) => selectedValues.includes(v))

  const handleToggleAll = () => {
    if (allSelected) {
      onChange([])
    } else {
      onChange(allValues)
    }
  }

  const filteredOptions = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase()
    if (!normalized) return options
    return options.filter((option) => option.title.toLowerCase().includes(normalized))
  }, [searchValue, options])

  return (
    <div className={styles.menuContainer}>
      {isOpen && (
        <div className={styles.menuContent} ref={popoverRef} style={{ width }}>
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
            {filteredOptions.length > 0 && (
              <div className={styles.option}>
                <Checkbox checked={allSelected} onChange={handleToggleAll}>
                  <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                    {selectAllText}
                  </Text>
                </Checkbox>
              </div>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isChecked = selectedValues.includes(option.value)

                return (
                  <div className={styles.option} key={option.value}>
                    <Checkbox
                      checked={isChecked}
                      onChange={() => handleToggleValue(option.value)}
                      value={option.value}
                    >
                      <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                        {option.title}
                      </Text>
                      {option.text && (
                        <Text variant={TextVariant.BODY} bodySize="small" className={styles.text}>
                          {option.text}
                        </Text>
                      )}
                    </Checkbox>
                  </div>
                )
              })
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
