import React from 'react'
import clsx from 'clsx'
import styles from './Text.module.scss'

export enum TextTheme {
  DEFAULT = 'default',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface TextProps {
  children: React.ReactNode
  theme?: TextTheme
  className?: string
}

export const Text: React.FC<TextProps> = ({ children, theme = TextTheme.DEFAULT, className }) => {
  return <span className={clsx(styles.text, styles[theme], className)}>{children}</span>
}
