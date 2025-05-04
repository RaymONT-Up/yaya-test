import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import styles from './CalendarToolbar.module.scss'
import { ChevronLeft } from '@/shared/assets/svg/ChevronLeft'
import { ChevronRight } from '@/shared/assets/svg/ChevronRight'
import { Calendar } from '@/shared/assets/svg/Calendar'
import { Filter } from '@/shared/assets/svg/Filter'
import FullCalendar from '@fullcalendar/react'
import { formatDateRange } from '@/shared/libs/formaDate'
import { Settings } from '@/shared/assets/svg/Settings'
import { ChevronDown } from '@/shared/assets/svg/ChevronDown'
import { Plus } from '@/shared/assets/svg/Plus'

type DateRange = {
  startDate: string
  endDate: string
}

type Props = {
  calendarRef: React.RefObject<FullCalendar | null>
  dateRange: DateRange
  setModalOpen: (open: boolean) => void
  setDuplicateModalOpen: (open: boolean) => void
}
export const CalendarToolbar: React.FC<Props> = ({
  calendarRef,
  dateRange,
  // setDuplicateModalOpen,
  setModalOpen
}) => {
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
          <Button
            isIconButton
            size={ButtonSize.Small}
            variant={ButtonVariant.Subtle}
            onClick={() => calendarRef.current?.getApi().next()}
            iconEnd={<ChevronRight color="#262527" width={16} height={16} />}
          />
        </div>
        <Button
          size={ButtonSize.Small}
          iconStart={<Calendar width={16} height={16} />}
          variant={ButtonVariant.Subtle}
        >
          {formatDateRange(dateRange.startDate, dateRange.endDate)}
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Subtle}
          isIconButton
          iconStart={<Filter width={16} height={16} />}
        />
      </div>
      <div className={styles.center}></div>
      <div className={styles.right}>
        <Button
          iconStart={<Settings />}
          iconEnd={<ChevronDown />}
          size={ButtonSize.Small}
          variant={ButtonVariant.Neutral}
          // onClick={() => setDuplicateModalOpen(true)}
        >
          Редактировать
        </Button>
        <Button
          iconStart={<Plus />}
          size={ButtonSize.Small}
          variant={ButtonVariant.Primary}
          onClick={() => setModalOpen(true)}
        >
          Добавить занятие
        </Button>
      </div>
    </div>
  )
}
