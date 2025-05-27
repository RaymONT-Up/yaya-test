import { Header } from "@/widgets/header"
import { Sidebar } from "@/widgets/sidebar"
import styles from "./MainLayout.module.scss"
import { Outlet } from "react-router-dom"
import clsx from "clsx"

interface MainLayoutProps {
  shouldContentScroll?: boolean
}
export const MainLayout = ({ shouldContentScroll = false }: MainLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div
        className={clsx(styles.main, {
          [styles.scrollable]: shouldContentScroll
        })}
      >
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
