import { FC, ReactNode } from "react"
import clsx from "clsx"
import styles from "./Tag.module.scss"
import { CloseX } from "@/shared/assets/svg/Close"
import { Text, TextVariant } from "@/shared/ui/Text/Text"

export enum TagScheme {
  Brand = "brand",
  Danger = "danger",
  Positive = "positive",
  Warning = "warning",
  Neutral = "neutral"
}

export enum TagVariant {
  Primary = "primary",
  Secondary = "secondary"
}

interface TagProps {
  label: string
  scheme?: TagScheme
  variant?: TagVariant
  icon?: ReactNode
  removable?: boolean
  className?: string
  onRemove?: () => void
}

export const Tag: FC<TagProps> = ({
  label,
  scheme = TagScheme.Neutral,
  variant = TagVariant.Primary,
  icon,
  removable = false,
  className,
  onRemove
}) => {
  return (
    <span className={clsx(styles.tag, styles[scheme], styles[variant], className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <Text variant={TextVariant.LABEL} labelSize="small" className={styles.label}>
        {label}
      </Text>
      {removable && (
        <button type="button" className={styles.remove} onClick={onRemove}>
          <CloseX
            height={16}
            width={16}
            color={
              scheme === TagScheme.Neutral && variant === TagVariant.Primary
                ? "#6B6B6F"
                : variant === TagVariant.Primary
                  ? "#fff"
                  : "#5B5B5F"
            }
          />{" "}
        </button>
      )}
    </span>
  )
}
