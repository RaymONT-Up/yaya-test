import { FC } from "react"
import clsx from "clsx"
import styles from "./Counter.module.scss"
import { Text, TextVariant } from "@/shared/ui/Text/Text"

export enum CounterVariant {
  Default = "default",
  Neutral = "neutral"
}

interface CounterProps {
  count: number
  variant?: CounterVariant
  className?: string
}

export const Counter: FC<CounterProps> = ({
  count,
  variant = CounterVariant.Default,
  className
}) => {
  return (
    <div className={clsx(styles.counter, styles[variant], className)}>
      <Text variant={TextVariant.BUTTON} buttonSize="small" className={styles.text}>
        {count}
      </Text>
    </div>
  )
}
