import { FC } from "react"
import clsx from "clsx"
import styles from "./ToggleButton.module.scss"

type ToggleButtonProps = {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  selected = false,
  onClick,
  children,
  className
}) => {
  return (
    <button
      className={clsx(styles.toggleButton, { [styles.selected]: selected }, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
