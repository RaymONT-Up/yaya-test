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
  className?: string
  wrapperClassName?: string
  required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, wrapperClassName, required, type = 'text', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPasswordType = type === 'password'
    const inputType = isPasswordType && isPasswordVisible ? 'text' : type

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev)
    }

    return (
      <div className={clsx(styles.wrapper, wrapperClassName)}>
        {label && (
          <Text className={styles.label} variant={TextVariant.LABEL} labelSize="medium">
            {label}
          </Text>
        )}

        <div className={clsx(styles.inputWrapper, { [styles.required]: required })}>
          <input
            ref={ref}
            type={inputType}
            className={clsx(styles.input, className, {
              [styles.error]: !!error
            })}
            required={required}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
            </button>
          )}
        </div>

        {error && (
          <Text className={styles.errorMessage} theme={TextTheme.ERROR}>
            {typeof error === 'string' ? error : error.message}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
