import { CenterItem } from '@/entities/center/ui/CenterItem/CenterItem'
import s from './SelectCenterForm.module.scss'
import scr from '@/shared/assets/png/Login-img.png'
import { WelcomeHeader } from '@/shared/ui/WelcomeHeader/WelcomeHeader'

const res = [
  {
    id: 1368,
    name: 'DamuZone Online',
    address: 'Микрорайон Орбита 1, 33'
  },
  {
    id: 417,
    name: 'Dojo',
    address: 'ЖК RIVIERA   Улица Сатпаева, 90/544 блок; 206 помещение'
  },
  {
    id: 1352,
    name: 'HiLondon (Куанышбаева)',
    address: 'улица Калибека Куанышбаева, 15'
  },
  {
    id: 1380,
    name: 'S3',
    address: 'Брусиловского 163'
  },
  {
    id: 712,
    name: 'Тест Уведомления',
    address: 'тест1'
  }
]
export const SelectCenterForm = () => {
  return (
    <>
      <WelcomeHeader title="Выберите центр" description="Под каким центром вы хотите войти? " />
      <div className={s.container}>
        {/* !TODO доработать так как сейчас центры не получается получить из за CORS +  у них нет изображений */}
        {res.map((item) => (
          <CenterItem id={item.id} address={item.address} imageSrc={scr} name={item.name} />
        ))}
      </div>
    </>
  )
}
