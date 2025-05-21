import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./VisitToolbar.module.scss"
import { ChevronRight } from "@/shared/assets/svg/ChevronRight"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useSelectManager } from "@/shared/ui/PopoverSelect/useSelectManager"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import { LessonFilter } from "@/features/lesson/selectLesson"
import { CounterVariant } from "@/shared/ui/Counter/Counter"

type Props = {
  date: Date
  onChangeDate: (date: Date) => void
  onLessonIdsChange: (lessonIds: number[]) => void
  selectedLessonIds: number[]
}
export const VisitToolbar = ({
  date,
  onChangeDate,
  onLessonIdsChange,
  selectedLessonIds
}: Props) => {
  const {
    isOpen: showDatePicker,
    toggle: toggleDatePicker,
    close
  } = useSelectManager("date_picker_visit")

  const goToPrevDay = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() - 1)
    onChangeDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + 1)
    onChangeDate(newDate)
  }

  const handleSelectDate = (newDate: Date) => {
    onChangeDate(newDate)
    close()
  }
  return (
    <div className={styles.visitToolbar}>
      <div className={styles.left}>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Subtle}
          onClick={() => onChangeDate(new Date())}
        >
          Сегодня
        </Button>
        <div className={styles.changeDate}>
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
            onClick={goToPrevDay}
          />
          <div className={styles.dateWrapper}>
            <Button
              size={ButtonSize.Small}
              iconStart={<Calendar width={16} height={16} />}
              variant={ButtonVariant.Subtle}
              onClick={toggleDatePicker}
            >
              {format(date, "dd MMM, yyyy", { locale: ru })}
            </Button>
            {showDatePicker && (
              <div className={styles.pickerWrapper}>
                <CustomDatePicker
                  selected={date}
                  onChange={(selected) => selected && handleSelectDate(selected)}
                  dateFormat="dd.MM.yyyy"
                />
              </div>
            )}
          </div>
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
            onClick={goToNextDay}
          />
        </div>

        <div className={styles.filterWrapper}>
          <LessonFilter
            onSelect={(values) => onLessonIdsChange(values.map(Number))}
            selectedIds={selectedLessonIds}
            selectName="lesson_filter_visits"
            filterLabel="Занятия"
            counterVariant={CounterVariant.Neutral}
          />
        </div>
      </div>
    </div>
  )
}
