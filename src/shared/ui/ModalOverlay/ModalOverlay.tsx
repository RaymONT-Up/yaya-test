import styles from "./ModalOverlay.module.scss"
interface ModalOverlayProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children, isOpen }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  if (!isOpen) return null
  return (
    <div className={styles.overlay} onClick={handleClick}>
      {children}
    </div>
  )
}
