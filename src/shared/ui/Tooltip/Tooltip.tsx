import { FC, ReactNode, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import styles from "./Tooltip.module.scss"
import clsx from "clsx"
import { Text, TextVariant } from "../Text/Text"

type TooltipPosition = "top" | "bottom" | "left" | "right"

interface TooltipProps {
  children: ReactNode
  title?: string
  text: ReactNode | string
  position?: TooltipPosition
  maxWidth?: number | string
  className?: string
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  title,
  text,
  position = "top",
  maxWidth,
  className
}) => {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && wrapperRef.current && tooltipRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      let top = 0
      let left = 0

      switch (position) {
        case "top":
          top = rect.top - tooltipRect.height - 8
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case "bottom":
          top = rect.bottom + 8
          left = rect.left + rect.width / 2 - tooltipRect.width / 2
          break
        case "left":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.left - tooltipRect.width - 8
          break
        case "right":
          top = rect.top + rect.height / 2 - tooltipRect.height / 2
          left = rect.right + 8
          break
      }

      setCoords({ top, left })
    }
  }, [visible, position])

  return (
    <div
      ref={wrapperRef}
      className={styles.tooltipWrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className={clsx(styles.tooltip, styles[position], className)}
            style={{
              position: "absolute",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 9999,
              maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth
            }}
          >
            {title && (
              <Text className={styles.text} variant={TextVariant.HEADING} headingLevel="h6">
                {title}
              </Text>
            )}
            <Text className={styles.text}>{text}</Text>
          </div>,
          document.body
        )}
    </div>
  )
}
