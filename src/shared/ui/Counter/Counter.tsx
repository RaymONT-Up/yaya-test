import { FC } from "react"
import clsx from "clsx"
import styles from "./Counter.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"

export enum CounterVariant {
  Default = "default",
  Neutral = "neutral"
}

interface CounterProps {
  count: string | number
  variant?: CounterVariant
  className?: string
  size?: "circle" | "default"
}

export const Counter: FC<CounterProps> = ({
  count,
  variant = CounterVariant.Default,
  className,
  size = "default"
}) => {
  return (
    <div className={clsx(styles.counter, styles[variant], styles[size], className)}>
      <Text variant={TextVariant.BUTTON} buttonSize="small" className={styles.text}>
        {count}
      </Text>
    </div>
  )
}
