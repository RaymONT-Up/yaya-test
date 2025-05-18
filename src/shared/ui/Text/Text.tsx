import React from "react"
import clsx from "clsx"
import styles from "./Text.module.scss"

export enum TextTheme {
  DEFAULT = "default",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error"
}

export enum TextVariant {
  HEADING = "heading",
  LABEL = "label",
  BODY = "body",
  BUTTON = "button"
}

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8"

export type LabelSize = "large" | "medium" | "small"

export type ButtonSize = "medium" | "small"

export type BodySize = "large" | "medium" | "small" | "tiny"

export interface TextProps {
  children: React.ReactNode
  theme?: TextTheme
  className?: string
  variant?: TextVariant
  headingLevel?: HeadingLevel
  labelSize?: LabelSize
  bodySize?: BodySize
  buttonSize?: ButtonSize
  fontWeight?: 400 | 600 | 500
  onClick?: () => void
}

export const Text: React.FC<TextProps> = ({
  children,
  theme = TextTheme.DEFAULT,
  className,
  variant = TextVariant.BODY,
  headingLevel = "h1",
  labelSize = "medium",
  bodySize = "medium",
  buttonSize = "medium",
  fontWeight = 400,
  onClick
}) => {
  const mods = [
    styles[theme],
    styles[variant],
    variant === TextVariant.HEADING && styles[headingLevel],
    variant === TextVariant.LABEL && styles[`label-${labelSize}`],
    variant === TextVariant.BODY && styles[`body-${bodySize}`],
    variant === TextVariant.BODY && styles[`weight-${fontWeight}`],
    variant === TextVariant.BUTTON && styles[`button-${buttonSize}`]
  ]

  return (
    <span onClick={onClick} className={clsx(styles.text, mods, className)}>
      {children}
    </span>
  )
}
