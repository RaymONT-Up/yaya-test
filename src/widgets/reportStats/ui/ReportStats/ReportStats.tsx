import { Stats } from "@/shared/ui/Stats/Stats"
import { Icon } from "@/shared/ui/Icon/Icon"
import { User } from "@/shared/assets/svg/User"
import { UserCheck } from "@/shared/assets/svg/UserCheck"
import { Dollar } from "@/shared/assets/svg/Dollar"
import { Hash } from "@/shared/assets/svg/Hash"
import s from "./ReportStats.module.scss"
import { selectCurrentCenter } from "@/entities/center"
import { useAppSelector } from "@/app/config/store"
import { useGeneralStats, useReportFilters } from "@/entities/report"
import { Text, TextVariant } from "@/shared/ui/Text/Text"
import { FileText } from "@/shared/assets/svg/FileText"

export const ReportStats = () => {
  const { id: centerId } = useAppSelector(selectCurrentCenter)
  const { date_from, date_to, centers, lessons, trainers } = useAppSelector(useReportFilters)

  const { data, isLoading } = useGeneralStats({
    centerId,
    filters: {
      date_from,
      date_to,
      centers,
      lessons,
      trainers
    }
  })

  const [, stats] = data ?? []

  return (
    <>
      <div className={s.smallStats}>
        <div className={s.smallStat}>
          <div className={s.icon}>
            <Icon icon={<Hash width={16} height={16} color="#fff" />} backgroundColor="#9A79AE" />
          </div>
          <div className={s.info}>
            {isLoading ? (
              <div className={s.skeleton} />
            ) : (
              <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
                {stats ? `${stats.merchant_name} (${stats.merchant_iban.slice(-10)})` : "–"}
              </Text>
            )}
            <Text className={s.text} fontWeight={600}>
              Наименование юр лица (БИН)
            </Text>
          </div>
        </div>
        <div className={s.smallStat}>
          <div className={s.icon}>
            <Icon
              icon={<FileText width={16} height={16} color="#fff" />}
              backgroundColor="#3F68FF"
            />
          </div>
          <div className={s.info}>
            {isLoading ? (
              <div className={s.skeleton} />
            ) : (
              <Text variant={TextVariant.HEADING} headingLevel="h8" className={s.title}>
                {stats?.merchant_iban ?? "–"}
              </Text>
            )}
            <Text className={s.text} fontWeight={600}>
              Расчетный счет
            </Text>
          </div>
        </div>
      </div>
      <div className={s.stats}>
        <Stats
          title={stats?.unique_children ?? "–"}
          loading={isLoading}
          text="Количество уникальных детей"
          icon={
            <Icon icon={<User width={16} height={16} color="#fff" />} backgroundColor="#3F68FF" />
          }
        />
        <Stats
          title={stats?.total_visits ?? "–"}
          loading={isLoading}
          text="Количество посещений"
          icon={
            <Icon
              icon={<UserCheck width={16} height={16} color="#fff" />}
              backgroundColor="#F2B705"
            />
          }
        />
        <Stats
          title={stats ? `${stats.total_earned.toLocaleString()} ₸` : "–"}
          loading={isLoading}
          text="Всего заработали"
          icon={
            <Icon icon={<Dollar width={16} height={16} color="#fff" />} backgroundColor="#2FB866" />
          }
        />
        {/* <Stats
          title={stats ? `${stats.merchant_name} (${stats.merchant_iban.slice(-10)})` : "–"}
          loading={isLoading}
          text="Наименование юр лица (БИН)"
          icon={
            
          }
        /> */}
        {/* <Stats
          title={stats?.merchant_iban ?? "–"}
          loading={isLoading}
          text="Расчетный счет"
          icon={
            <Icon icon={<FileText width={16} height={16} color="#fff" />} backgroundColor="#3F68FF" />
          }
        /> */}
      </div>
    </>
  )
}
