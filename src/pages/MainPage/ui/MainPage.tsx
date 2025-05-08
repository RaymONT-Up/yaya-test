import { ScheduleCalendar } from '@/widgets/scheduleCalendar'
import { FC } from 'react'
import s from './MainPage.module.scss'
import { Text, TextVariant } from '@/shared/ui/Text/Text'

const MainPage: FC = () => {
  return (
    <section className={s.mainPage}>
      <Text variant={TextVariant.HEADING} headingLevel="h5" className={s.title}>
        Расписание
      </Text>
      <ScheduleCalendar />
    </section>
  )
}

export default MainPage
