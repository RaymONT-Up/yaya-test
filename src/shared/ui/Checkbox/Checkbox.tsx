import React from "react"
import styles from "./Checkbox.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
  value?: string | number
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, children, value }) => {
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
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={value}
        className={styles.input}
      />
      <span className={styles.customCheckbox} />
      {content}
    </label>
  )
}
