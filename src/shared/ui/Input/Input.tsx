import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'
import styles from './Input.module.scss'
import { Text, TextTheme, TextVariant } from '@/shared/ui/Text/Text'
import { EyeOpen } from '@/shared/assets/svg/EyeOpen'
import { EyeClosed } from '@/shared/assets/svg/EyeClosed'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError | string
  showErrorMessage?: boolean
  className?: string
  wrapperClassName?: string
  required?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      showErrorMessage = false,
      className,
      wrapperClassName,
      required,
      type = 'text',
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPasswordType = type === 'password'
    const inputType = isPasswordType && isPasswordVisible ? 'text' : type

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev)
    }

    return (
      <div className={clsx(styles.wrapper, wrapperClassName)}>
        {label && (
          <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.label}>
            {label}
            {required && <span className={styles.requiredLabel}> *</span>}
          </Text>
        )}

        <div className={clsx(styles.inputWrapper, { [styles.required]: required })}>
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

          <input
            ref={ref}
            type={inputType}
            className={clsx(styles.input, className, {
              [styles.error]: !!error,
              [styles.withLeftIcon]: !!leftIcon,
              [styles.withRightIcon]: !!rightIcon || isPasswordType
            })}
            required={required}
            {...props}
          />

          {isPasswordType ? (
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
            </button>
          ) : (
            rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>
          )}
        </div>

        {error && showErrorMessage && (
          <Text className={styles.errorMessage} theme={TextTheme.ERROR}>
            {typeof error === 'string' ? error : error.message}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
