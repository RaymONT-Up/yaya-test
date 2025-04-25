import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'
import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError | string
  className?: string
  wrapperClassName?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, wrapperClassName, iconLeft, iconRight, required, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, wrapperClassName)}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={clsx(styles.inputWrapper, { [styles.required]: required })}>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}

          <input
            ref={ref}
            className={clsx(styles.input, className, {
              [styles.error]: !!error
            })}
            required={required}
            {...props}
          />

          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </div>

        {error && (
          <span className={styles.errorMessage}>
            {typeof error === 'string' ? error : error.message}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
