import { Text, TextVariant } from "@/shared/ui/Text/Text"
import s from "./VisitPage.module.scss"
import { VisitToolbar } from "../VisitToolbar/VisitToolbar"
import { Kanban } from "../Kanban/Kanban"
const VisitPage = () => {
  return (
    <section className={s.visitPage}>
      <Text variant={TextVariant.HEADING} headingLevel="h5" className={s.title}>
        Посещения
      </Text>
      <VisitToolbar />
      <Kanban />
    </section>
  )
}

export default VisitPage
