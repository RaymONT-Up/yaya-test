import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.item}>
            <span className={styles.icon}>🏠</span>
            <span className={styles.label}>Посещения</span>
          </li>
          <li className={styles.item}>
            <span className={styles.icon}>⚙️</span>
            <span className={styles.label}>Расписания</span>
          </li>
          <li className={styles.item}>
            <span className={styles.icon}>📄</span>
            <span className={styles.label}>Отчеты</span>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
