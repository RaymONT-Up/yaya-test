import { FC } from 'react'
import { WelcomeLayout } from '@/widgets/layout'
import { SelectCenterForm } from '@/features/center/selectCenter'
import { useAppSelector } from '@/app/config/store'
import { selectCenters } from '@/entities/center'
import { ContactUs } from './ContactUs'

export const SelectCenterPage: FC = () => {
  //!TODO доработать добавить логику запроса центров
  const centerList = useAppSelector(selectCenters)
  return (
    <WelcomeLayout>{centerList.length === 0 ? <ContactUs /> : <SelectCenterForm />}</WelcomeLayout>
  )
}
