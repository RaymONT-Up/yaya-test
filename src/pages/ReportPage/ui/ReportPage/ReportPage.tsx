import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./ReportPage.module.scss"
import { ReportToolbar } from "@/widgets/report"
import { Stats } from "@/shared/ui/Stats/Stats"
import { Icon } from "@/shared/ui/Icon/Icon"
import { User } from "@/shared/assets/svg/User"
import { UserCheck } from "@/shared/assets/svg/UserCheck"
import { Dollar } from "@/shared/assets/svg/Dollar"
import { Hash } from "@/shared/assets/svg/Hash"
import { FileText } from "@/shared/assets/svg/FileText"

const ReportPage = () => {
  return (
    <section className={s.reportPage}>
      <Text variant={TextVariant.HEADING} headingLevel="h5" className={s.title}>
        Отчеты
      </Text>
      <ReportToolbar
        centerName="Центр музыкального образования"
        sectionName="Все секции"
        trainerName="Выберите тренеров"
        onReset={() => {}}
      />
      {/* временно просто тест отображения карточек потом вынесу в компонент */}
      <div className={s.stats}>
        <Stats
          title="123"
          text="Количество уникальных детей"
          icon={
            <Icon icon={<User width={16} height={16} color="#fff" />} backgroundColor="#3F68FF" />
          }
        />
        <Stats
          title="123"
          text="Количество посещений"
          icon={
            <Icon
              icon={<UserCheck width={16} height={16} color="#fff" />}
              backgroundColor="#F2B705"
            />
          }
        />
        <Stats
          title="54 700 ₸"
          text="Всего заработали"
          icon={
            <Icon icon={<Dollar width={16} height={16} color="#fff" />} backgroundColor="#2FB866" />
          }
        />
        <Stats
          title="ABC (001118600320)"
          text="Наименование юр лица (БИН)"
          icon={
            <Icon icon={<Hash width={16} height={16} color="#fff" />} backgroundColor="#9A79AE" />
          }
        />
        <Stats
          title="KZ054004505405405404"
          text="Расчетный счет"
          icon={
            <Icon
              icon={<FileText width={16} height={16} color="#fff" />}
              backgroundColor="#3F68FF"
            />
          }
        />
      </div>
    </section>
  )
}

export default ReportPage
