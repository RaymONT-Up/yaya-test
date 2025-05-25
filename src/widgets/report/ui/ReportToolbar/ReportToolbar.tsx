import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./ReportToolbar.module.scss"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import clsx from "clsx"
import { Input } from "@/shared/ui/Input/Input"

type Props = {
  centerName: string
  sectionName: string
  trainerName: string
  onReset: () => void
}

export const ReportToolbar = ({ centerName, sectionName, trainerName, onReset }: Props) => {
  return (
    <div className={styles.reportToolbar}>
      <div className={styles.filters}>
        <div className={styles.datePicker}>
          <Button
            variant={ButtonVariant.Subtle}
            size={ButtonSize.Small}
            iconStart={<Calendar width={16} height={16} />}
          >
            01 - 31 Мая, 2025
          </Button>
        </div>

        <Input
          readOnly
          placeholder={centerName}
          rightIcon={<ChevronDown className={clsx(styles.chevron)} />}
          className={styles.input}
        />

        <Input
          readOnly
          placeholder={sectionName}
          rightIcon={<ChevronDown className={clsx(styles.chevron)} />}
          className={styles.input}
        />

        <Input
          readOnly
          placeholder={trainerName}
          rightIcon={<ChevronDown className={clsx(styles.chevron)} />}
          className={styles.input}
        />

        <Button size={ButtonSize.Small} variant={ButtonVariant.Neutral} onClick={onReset}>
          Сбросить
        </Button>
      </div>
    </div>
  )
}
