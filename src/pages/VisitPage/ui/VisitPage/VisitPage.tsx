import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./VisitPage.module.scss"
import { Kanban } from "@/widgets/kanban"

const VisitPage = () => {
  return (
    <section className={s.visitPage}>
      <title>Yaya for Partners | Посещения</title>

      <Text variant={TextVariant.HEADING} headingLevel="h5" className={s.title}>
        Посещения
      </Text>
      <Kanban />
    </section>
  )
}

export default VisitPage
