import { ReactNode, useEffect, useState } from "react"
import styles from "./Modal.module.scss"
import { Portal } from "../Portal/Portal"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { CloseX } from "@/shared/assets/svg/Close"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { Info } from "@/shared/assets/svg/Info"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  headline?: string
  message?: string
  placeholderText?: string
  showMessage?: boolean
  showTitle?: boolean
  showHeadline?: boolean
  showBodyText?: boolean
  showPlaceholder?: boolean
  showActions?: boolean
  dismissable?: boolean
  width?: string
  actions?: ReactNode
  children: ReactNode
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  headline,
  message,
  showMessage = false,
  showHeadline = false,
  showTitle = true,
  showActions = true,
  dismissable = true,
  width = "auto",
  actions,
  children
}: ModalProps) => {
  const [visible, setVisible] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      // Дать время анимации закрытия
      const timeoutId = setTimeout(() => setVisible(false), 300)
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
      return () => clearTimeout(timeoutId)
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [isOpen])

  if (!visible) return null

  const handleClose = () => {
    if (dismissable) onClose()
  }

  return (
    <Portal>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : styles.overlayClose}`}
        onClick={handleClose}
      >
        <div
          className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClose}`}
          onClick={(e) => e.stopPropagation()}
          style={{ width }}
        >
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderText}>
              {showHeadline && headline && (
                <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.headline}>
                  {headline}
                </Text>
              )}
              {showTitle && title && (
                <Text variant={TextVariant.HEADING} headingLevel="h6" className={styles.title}>
                  {title}
                </Text>
              )}
            </div>

            <Button
              variant={ButtonVariant.Subtle}
              size={ButtonSize.Small}
              isIconButton
              iconStart={<CloseX />}
              onClick={handleClose}
            >
              ×
            </Button>
          </div>
          <div className={styles.modalContent}>{children}</div>
          {showActions && actions && (
            <div className={styles.actions}>
              {showMessage ? (
                <div className={styles.message}>
                  <Info />{" "}
                  <Text bodySize="medium" className={styles.infoMessage}>
                    {" "}
                    {message}{" "}
                  </Text>
                </div>
              ) : (
                <div />
              )}
              <div className={styles.buttonGroup}>{actions}</div>
            </div>
          )}
        </div>
      </div>
    </Portal>
  )
}
