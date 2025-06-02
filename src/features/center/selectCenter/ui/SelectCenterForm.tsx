import { CenterItem } from "@/entities/center/ui/CenterItem/CenterItem"
import s from "./SelectCenterForm.module.scss"
import defaultCenterImage from "@/shared/assets/png/defaultCenter.png"
import { WelcomeHeader } from "@/shared/ui/WelcomeHeader/WelcomeHeader"
import { useAppSelector } from "@/app/config/store"
import { selectCenters, setCenterId } from "@/entities/center"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "@/shared/consts/routerPaths"

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
        {centers.map((item) => (
          <CenterItem
            key={item.id}
            id={item.id}
            address={item.address}
            imageSrc={defaultCenterImage}
            name={item.name}
            handleSelect={handleCenterSelect}
          />
        ))}
      </div>
    </section>
  )
}
