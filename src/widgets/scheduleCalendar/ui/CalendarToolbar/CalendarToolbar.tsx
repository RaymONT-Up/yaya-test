import { Button, ButtonSize, ButtonVariant } from "@/shared/ui/Button"
import styles from "./CalendarToolbar.module.scss"
import { ChevronLeft } from "@/shared/assets/svg/ChevronLeft"
import { ChevronRight } from "@/shared/assets/svg/ChevronRight"
import { Calendar } from "@/shared/assets/svg/Calendar"
import FullCalendar from "@fullcalendar/react"
import { formatDateRange } from "@/shared/libs/formaDate"
import { Settings } from "@/shared/assets/svg/Settings"
import { ChevronDown } from "@/shared/assets/svg/ChevronDown"
import { Plus } from "@/shared/assets/svg/Plus"
import { useRef, useState } from "react"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { XSquare } from "@/shared/assets/svg/XSquare"
import { startOfWeek } from "date-fns"
import { CustomDatePicker } from "@/shared/ui/CustomDatePicker/CustomDatePicker"
import { LessonFilter } from "@/features/lesson/selectLesson"
import { useClickOutside } from "@/shared/libs/useClickOutside"

type DateRange = {
  startDate: string
  endDate: string
}

type Props = {
  calendarRef: React.RefObject<FullCalendar | null>
  dateRange: DateRange
  setModalOpen: (open: boolean) => void
  setDuplicateModalOpen: (open: boolean) => void
  setCancelModalOpen: (open: boolean) => void
  onLessonIdsChange: (lessonIds: number[]) => void
  selectedLessonIds: number[]
  hasEditSchedulePermission: boolean
}
export const CalendarToolbar: React.FC<Props> = ({
  calendarRef,
  dateRange,
  setDuplicateModalOpen,
  setCancelModalOpen,
  setModalOpen,
  onLessonIdsChange,
  selectedLessonIds,
  hasEditSchedulePermission
}) => {
  const [start, setStart] = useState<Date | null>(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev)
  }
  const [showPopover, setShowPopover] = useState(false)
  const togglePopover = () => {
    setShowPopover((prev) => !prev)
  }
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const closePopover = () => {
    setShowPopover(false)
  }
  const closeDatePicker = () => {
    setShowDatePicker(false)
  }

  const handleOptionClick = (action: "duplicate" | "cancel") => {
    if (action === "duplicate") {
      setDuplicateModalOpen(true)
    } else {
      setCancelModalOpen(true)
    }
    closePopover()
  }
  const handleWeekChange = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 2 })
    calendarRef.current?.getApi().gotoDate(start)
    setStart(start)
  }
  useClickOutside<HTMLDivElement>({
    ref: popoverRef,
    close: closePopover
  })
  const selectDateRef = useRef<HTMLDivElement>(null)
  useClickOutside<HTMLDivElement>({
    ref: selectDateRef,
    close: closeDatePicker
  })
  return (
    <div className={styles.calendarToolbar}>
      <div className={styles.left}>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Subtle}
          onClick={() => calendarRef.current?.getApi().today()}
        >
          Сегодня
        </Button>
        <div className={styles.changeDate}>
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            onClick={() => calendarRef.current?.getApi().prev()}
            iconEnd={<ChevronLeft color="#262527" width={16} height={16} />}
          />
          <div className={styles.dateWrapper} ref={selectDateRef}>
            <Button
              size={ButtonSize.Small}
              iconStart={<Calendar width={16} height={16} />}
              variant={ButtonVariant.Subtle}
              onClick={toggleDatePicker}
            >
              {formatDateRange(dateRange.startDate, dateRange.endDate)}
            </Button>
            {showDatePicker && (
              <div className={styles.pickerWrapper}>
                <CustomDatePicker
                  showWeekPicker
                  selected={start}
                  onChange={(date) => date && handleWeekChange(date as Date)}
                  dateFormat="dd.MM.yyyy"
                />
              </div>
            )}
          </div>
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            onClick={() => calendarRef.current?.getApi().next()}
            iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
          />
        </div>

        <div className={styles.lessonWrapper}>
          <LessonFilter
            selectName="lesson_filter"
            selectedIds={selectedLessonIds}
            onSelect={(values) => onLessonIdsChange(values.map(Number))}
          />
        </div>
      </div>
      <div className={styles.center}></div>
      {hasEditSchedulePermission && (
        <div className={styles.right}>
          <div className={styles.popoverContainer} ref={popoverRef}>
            <Button
              iconStart={<Settings />}
              iconEnd={<ChevronDown />}
              size={ButtonSize.Small}
              variant={ButtonVariant.Neutral}
              onClick={togglePopover}
            >
              Редактировать
            </Button>

            {showPopover && (
              <div className={styles.popoverContent}>
                <div className={styles.option} onClick={() => handleOptionClick("duplicate")}>
                  <Calendar width={20} height={20} />
                  <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                    Дублирование расписания
                  </Text>
                  <span className={styles.title}></span>
                </div>
                <div className={styles.option} onClick={() => handleOptionClick("cancel")}>
                  <XSquare width={20} height={20} />

                  <Text variant={TextVariant.LABEL} labelSize="medium" className={styles.title}>
                    Отмена расписания
                  </Text>
                </div>
              </div>
            )}
          </div>
          <Button
            iconStart={<Plus />}
            size={ButtonSize.Small}
            variant={ButtonVariant.Primary}
            onClick={() => setModalOpen(true)}
          >
            Добавить занятие
          </Button>
        </div>
      )}
    </div>
  )
}
