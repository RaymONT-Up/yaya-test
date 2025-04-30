import { FC, ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'
import { Loader } from '@/shared/ui/Loader/Loader'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  iconStart?: ReactNode
  iconEnd?: ReactNode
  loading?: boolean
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit' | 'reset'
  }
export enum ButtonVariant {
  Primary = 'primary',
  Neutral = 'neutral',
  Subtle = 'subtle',
  Text = 'text'
}

export enum ButtonSize {
  Medium = 'medium',
  Small = 'small'
}

export const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  size = ButtonSize.Medium,
  loading = false,
  disabled,
  children,
  type = 'button',
  className,
  iconStart,
  iconEnd,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loader size={size === ButtonSize.Small ? 28 : 40} />
      ) : (
        <>
          {iconStart && <span className={styles.icon}>{iconStart}</span>}
          <span className={styles.content}>{children}</span>
          {iconEnd && <span className={styles.icon}>{iconEnd}</span>}
        </>
      )}
    </button>
  )
}
