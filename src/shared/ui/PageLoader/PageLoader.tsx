import { ComponentLoader } from "../ComponentLoader/ComponentLoader"
import s from "./PageLoader.module.scss"

export const PageLoader = () => {
  return (
    <div className={s.pageLoader}>
      <ComponentLoader size={64} />
    </div>
  )
}
