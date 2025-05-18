import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./VisitToolbar.module.scss"
import { ChevronRight } from "@/shared/assets/svg/ChevronRight"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { Filter } from "@/shared/assets/svg/Filter"
import { Calendar } from "@/shared/assets/svg/Calendar"

export const VisitToolbar = () => {
  return (
    <div className={styles.visitToolbar}>
      <div className={styles.left}>
        <Button size={ButtonSize.Small} variant={ButtonVariant.Subtle}>
          Сегодня
        </Button>
        <div className={styles.changeDate}>
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
          />
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
          />
        </div>
        <div className={styles.dateWrapper}>
          <Button
            size={ButtonSize.Small}
            iconStart={<Calendar width={16} height={16} />}
            variant={ButtonVariant.Subtle}
          >
            09 Фев, 2025
          </Button>
          {/* {showDatePicker && (
            <div className={styles.pickerWrapper}>
              <CustomDatePicker
                showWeekPicker
                selected={start}
                onChange={(date) => date && handleWeekChange(date as Date)}
                dateFormat="dd.MM.yyyy"
              />
            </div>
          )} */}
        </div>
        <div className={styles.filterWrapper}>
          <Button
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            iconStart={<Filter width={16} height={16} />}
          >
            Занятия
          </Button>
        </div>
      </div>
    </div>
  )
}
