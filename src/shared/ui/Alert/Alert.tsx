import { ReactNode } from 'react'
import styles from './Alert.module.scss'
import clsx from 'clsx'
import { Text, TextVariant } from '@/shared/ui/Text/Text'
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { CloseX } from '@/shared/assets/svg/Close'

export enum AlertVariant {
  Info = 'Info',
  Danger = 'Danger',
  Success = 'Success',
  Warning = 'Warning'
}

interface AlertProps {
  variant?: AlertVariant
  icon?: ReactNode
  title?: string
  text?: string
  primaryButton?: ReactNode
  secondaryButton?: ReactNode
  className?: string
  showCloseBtn?: boolean
}

const variantClassMap: Record<AlertVariant, string> = {
  [AlertVariant.Info]: styles.info,
  [AlertVariant.Danger]: styles.danger,
  [AlertVariant.Success]: styles.success,
  [AlertVariant.Warning]: styles.warning
}

export const Alert = ({
  variant = AlertVariant.Info,
  icon,
  title,
  text,
  primaryButton,
  secondaryButton,
  className,
  showCloseBtn = false
}: AlertProps) => {
  return (
    <div className={clsx(styles.alert, variantClassMap[variant], className)}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        {title && (
          <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.title}>
            {title}
          </Text>
        )}
        {text && (
          <Text bodySize="medium" className={styles.text}>
            {text}
          </Text>
        )}
        {(primaryButton || secondaryButton) && (
          <div className={styles.actions}>
            {secondaryButton}
            {primaryButton}
          </div>
        )}
      </div>
      {showCloseBtn && (
        <div className={styles.close}>
          <Button
            variant={ButtonVariant.Text}
            size={ButtonSize.Small}
            isIconButton
            iconStart={<CloseX width={16} height={16} />}
          />
        </div>
      )}
    </div>
  )
}
