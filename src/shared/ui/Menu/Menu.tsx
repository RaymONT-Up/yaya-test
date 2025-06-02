import React, { useRef, useState, useMemo } from "react"
import { Text, TextTheme, TextVariant } from "@/shared/ui/Text/Text"
import { Input } from "@/shared/ui/Input/Input"
import styles from "./Menu.module.scss"
import { Search } from "@/shared/assets/svg/Search"
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { ComponentLoader } from "@/shared/ui/ComponentLoader/ComponentLoader"
import clsx from "clsx"

export type SelectItem = {
  title: string
  titleComponent?: React.ReactNode
  text?: React.ReactNode | string
  value: string | number
  color?: string
}

interface MenuProps {
  isOpen: boolean
  options: SelectItem[]
  selectedValues: (string | number)[]
  onChange: (values: (string | number)[]) => void
  onClose: () => void
  width?: string | number
  height?: string | number
  showSearch?: boolean
  selectAllText?: string
  showResetBtn?: boolean
  isLoading?: boolean
  error?: string
  showColorMarks?: boolean
  className?: string
  optionWrapperClassName?: string
  showSelectAll?: boolean
}

export const Menu: React.FC<MenuProps> = ({
  isOpen,
  options,
  selectedValues,
  onChange,
  width = "360px",
  height = "360px",
  showSearch = false,
  selectAllText = "Выбрать все",
  showResetBtn = false,
  isLoading = false,
  error,
  showColorMarks = false,
  className,
  optionWrapperClassName,
  showSelectAll = true
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const [searchValue, setSearchValue] = useState("")

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
  const isIndeterminate = selectedValues.length > 0 && !allSelected

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
        <div
          className={clsx(styles.menuContent, className)}
          ref={popoverRef}
          style={{ width, height }}
        >
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
          <div className={clsx(styles.optionsWrapper, optionWrapperClassName)}>
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
            ) : (
              <>
                {filteredOptions.length > 0 && showSelectAll && (
                  <div className={styles.option}>
                    <Checkbox
                      indeterminate={isIndeterminate}
                      checked={allSelected}
                      onChange={handleToggleAll}
                    >
                      <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                        {selectAllText}
                      </Text>
                    </Checkbox>
                    {showResetBtn && (
                      <Button
                        size={ButtonSize.Small}
                        variant={ButtonVariant.Subtle}
                        onClick={() => onChange([])}
                        className={styles.resetButton}
                      >
                        Сбросить все
                      </Button>
                    )}
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
                          className={showColorMarks ? styles.alignCenter : undefined}
                        >
                          <div className={styles.markContainer}>
                            {showColorMarks && (
                              <div
                                className={styles.colorMark}
                                style={{ backgroundColor: option.color || "var(--blue-900)" }}
                              />
                            )}
                            <div>
                              <Text
                                variant={TextVariant.LABEL}
                                labelSize="medium"
                                className={styles.title}
                              >
                                {option.titleComponent ? option.titleComponent : option.title}
                              </Text>
                              {option.text && (
                                <Text
                                  variant={TextVariant.BODY}
                                  bodySize="small"
                                  className={styles.text}
                                >
                                  {option.text}
                                </Text>
                              )}
                            </div>
                          </div>
                        </Checkbox>
                      </div>
                    )
                  })
                ) : (
                  <Text variant={TextVariant.BODY} bodySize="small" className={styles.empty}>
                    Опции не найдены
                  </Text>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
