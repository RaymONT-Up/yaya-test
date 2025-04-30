import { FC, useEffect } from 'react'
import { WelcomeLayout } from '@/widgets/layout'
import { SelectCenterForm } from '@/features/center/selectCenter'
import { useAppDispatch, useAppSelector } from '@/app/config/store'
import { fetchCenters, selectCenterLoading, selectCenters, setCenterId } from '@/entities/center'
import { ContactUs } from './ContactUs'
import { Loader } from '@/shared/ui/Loader/Loader'
import { RoutePath } from '@/shared/consts/routerPaths'
import { useNavigate } from 'react-router-dom'

export const SelectCenterPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const centers = useAppSelector(selectCenters)
  // const error = useAppSelector(selectCenterError)
  const isLoading = useAppSelector(selectCenterLoading)

  useEffect(() => {
    if (centers.length === 0) {
      dispatch(fetchCenters())
    }
  }, [dispatch, centers.length])
  useEffect(() => {
    if (centers.length === 1) {
      setCenterId(centers[0].id)
      navigate(RoutePath.MAIN)
    }
  }, [centers, navigate])
  if (isLoading) {
    // !TODO добавить pageLoader для всех страниц общий
    return <Loader />
  }
  return (
    <WelcomeLayout>{centers.length === 0 ? <ContactUs /> : <SelectCenterForm />}</WelcomeLayout>
  )
}
