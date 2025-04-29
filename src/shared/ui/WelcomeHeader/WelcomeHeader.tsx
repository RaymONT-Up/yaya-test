import { FC, ReactNode } from 'react'
import styles from './WelcomeHeader.module.scss'
import { Logo } from '@/shared/assets/svg/Logo'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import clsx from 'clsx'

interface WelcomeHeaderProps {
  title: string
  description: string
  className?: string
  children?: ReactNode
}

export const WelcomeHeader: FC<WelcomeHeaderProps> = ({
  title,
  description,
  className,
  children
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Text variant={TextVariant.HEADING} headingLevel="h6" className={styles.title}>
        {title}
      </Text>
      <Text bodySize="medium" className={styles.text}>
        {description}
      </Text>
      {children}
    </div>
  )
}
