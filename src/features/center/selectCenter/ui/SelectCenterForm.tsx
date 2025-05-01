import { CenterItem } from '@/entities/center/ui/CenterItem/CenterItem'
import s from './SelectCenterForm.module.scss'
import scr from '@/shared/assets/png/Login-img.png'
import { WelcomeHeader } from '@/shared/ui/WelcomeHeader/WelcomeHeader'
import { useAppSelector } from '@/app/config/store'
import { selectCenters, setCenterId } from '@/entities/center'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@/shared/consts/routerPaths'

export const SelectCenterForm = () => {
  const navigate = useNavigate()
  const centers = useAppSelector(selectCenters)
  const handleCenterSelect = (id: number) => {
    setCenterId(id)
    navigate(RoutePath.MAIN)
  }
  return (
    <section className={s.selectCenter}>
      <WelcomeHeader title="Выберите центр" description="Под каким центром вы хотите войти? " />
      <div className={s.container}>
        {/* !TODO доработать так как сейчас центры не получается получить из за CORS +  у них нет изображений */}
        {centers.map((item) => (
          <CenterItem
            key={item.id}
            id={item.id}
            address={item.address}
            imageSrc={scr}
            name={item.name}
            handleSelect={handleCenterSelect}
          />
        ))}
      </div>
    </section>
  )
}
