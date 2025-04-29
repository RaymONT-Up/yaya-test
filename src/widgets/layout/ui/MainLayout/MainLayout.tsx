import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'
import styles from './MainLayout.module.scss'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
