import React, { useEffect, useRef } from "react"
import styles from "./Checkbox.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import clsx from "clsx"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
  value?: string | number
  className?: string
  indeterminate?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  children,
  value,
  className,
  indeterminate = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  const content =
    typeof children === "string" ? (
      <div className={styles.labelContent}>
        <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
          {children}
        </Text>
      </div>
    ) : (
      children
    )

  return (
    <label className={clsx(styles.checkboxLabel, className)}>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={value}
        className={styles.input}
        data-indeterminate={indeterminate ? "true" : "false"}
      />
      <span className={styles.customCheckbox} />
      {content}
    </label>
  )
}
