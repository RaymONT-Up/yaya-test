import { ReactNode, useEffect, useState } from "react"
import styles from "./Dialog.module.scss"
import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import { CloseX } from "@/shared/assets/svg/Close"
import { Portal } from "../Portal/Portal"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { Image } from "@/shared/ui/Image/Image"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  headline?: string
  bodyText?: string
  type?: "default" | "image"
  image?: string
  width?: string
  actions?: ReactNode
  children: ReactNode
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  headline,
  bodyText,
  type = "default",
  image,
  width = "auto",
  actions,
  children
}: DialogProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      // Чтобы дать время проиграться анимации закрытия
      const timer = setTimeout(() => setShouldRender(false), 300) // 300 мс — время transition
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""

      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.paddingRight = ""
    }
  }, [isOpen])

  if (!shouldRender) return null

  const handleClose = () => onClose()

  return (
    <Portal>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={handleClose}>
        <div
          className={`${styles.dialog} ${styles[type]} ${isOpen ? styles.open : ""}`}
          style={{ width }}
          onClick={(e) => e.stopPropagation()}
        >
          {type === "image" && image && (
            <div className={styles.imageContainer}>
              <Image src={image} alt="Dialog image" aspectRatio="3/2" maxHeight="233px" />
            </div>
          )}

          <div className={styles.dialogHeader}>
            {headline && (
              <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.headline}>
                {headline}
              </Text>
            )}
            {title && (
              <Text variant={TextVariant.HEADING} headingLevel="h6" className={styles.title}>
                {title}
              </Text>
            )}
            {bodyText && (
              <Text bodySize="medium" className={styles.bodyText}>
                {bodyText}
              </Text>
            )}
            <Button
              variant={ButtonVariant.Subtle}
              size={ButtonSize.Small}
              isIconButton
              iconStart={<CloseX />}
              onClick={handleClose}
              className={styles.closeButton}
            />
          </div>

          <div className={styles.dialogContent}>{children}</div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </Portal>
  )
}
