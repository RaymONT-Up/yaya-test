import styles from "./Header.module.scss"
import { LogoutButton } from "@/features/auth/logout"
import { Logo } from "@/shared/assets/svg/Logo"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { CenterSelector } from "@/widgets/centerSelector"
import centerImg from "@/shared/assets/png/centerImage.png"
import { useAppSelector } from "@/app/config/store"
import { selectCurrentCenter } from "@/entities/center"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import { useRef, useState } from "react"
import { useClickOutside } from "@/shared/libs/useClickOutside"

export const Header = () => {
  const [isSelectCenterOpen, setIsSelectCenterOpen] = useState(false)
  const toggle = () => setIsSelectCenterOpen((prev) => !prev)
  const close = () => setIsSelectCenterOpen(false)
  const currentCenter = useAppSelector(selectCurrentCenter)
  const selectRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectRef,
    close: close
  })
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo width={80} height={34} />
        <div className={styles.actions}>
          <div className={styles.selectCenter}>
            <div ref={selectRef} className={styles.centerSelector} onClick={toggle}>
              <img src={centerImg} alt="Центр" className={styles.image} />
              <div className={styles.centerInfo}>
                <Text variant={TextVariant.HEADING} headingLevel="h8" className={styles.centerName}>
                  {currentCenter?.name || "Выберите центр"}
                </Text>
                <Text bodySize="small" className={styles.centerAddress}>
                  {currentCenter?.address}
                </Text>
              </div>
              <ChevronDown
                width={20}
                height={20}
                color={"#6B6B6F"}
                className={`${styles.chevron} ${isSelectCenterOpen ? styles.open : ""}`}
              />
            </div>
            <div className={styles.centerSelectorComponent}>
              <CenterSelector isOpen={isSelectCenterOpen} onSelect={close} />
            </div>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
