import { TextareaHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'
import styles from './Textarea.module.scss'
import { Text, TextTheme, TextVariant } from '@/shared/ui/Text/Text'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: FieldError | string
  showErrorText?: boolean
  className?: string
  wrapperClassName?: string
  required?: boolean
  resizeable?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className,
      wrapperClassName,
      required,
      showErrorText = false,
      resizeable = true,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx(styles.wrapper, wrapperClassName)}>
        {label && (
          <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.label}>
            {label}
            {required && <span className={styles.requiredLabel}> *</span>}
          </Text>
        )}

        <div className={clsx(styles.inputWrapper, { [styles.required]: required })}>
          <textarea
            ref={ref}
            className={clsx(styles.input, className, {
              [styles.error]: !!error,
              [styles.resizeable]: resizeable
            })}
            required={required}
            {...props}
          />
        </div>

        {error && showErrorText && (
          <Text className={styles.errorMessage} theme={TextTheme.ERROR}>
            {typeof error === 'string' ? error : error.message}
          </Text>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
