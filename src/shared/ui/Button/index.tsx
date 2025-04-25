import { FC, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './Button.module.scss'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  iconStart?: string
  iconEnd?: string
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
        <span className={styles.loader}></span>
      ) : (
        <>
          <span>{children}</span>
        </>
      )}
    </button>
  )
}
