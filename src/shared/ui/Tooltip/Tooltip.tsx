import { FC, ReactNode, useState } from 'react'
import styles from './Tooltip.module.scss'
import clsx from 'clsx'
import { Text, TextVariant } from '../Text/Text'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  children: ReactNode
  title?: string
  text: string
  position?: TooltipPosition
}

export const Tooltip: FC<TooltipProps> = ({ children, title, text, position = 'top' }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={styles.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className={clsx(styles.tooltip, styles[position])}>
          {title && (
            <Text className={styles.text} variant={TextVariant.HEADING} headingLevel="h6">
              {title}
            </Text>
          )}
          <Text className={styles.text}>{text}</Text>
        </div>
      )}
    </div>
  )
}
