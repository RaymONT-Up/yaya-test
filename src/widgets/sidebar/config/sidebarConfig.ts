import { RoutePath } from '@/shared/consts/routerPaths'
import { ReactNode } from 'react'

export interface SidebarItem {
  path: string
  icon: ReactNode
  label: string
}

export const sidebarItems: SidebarItem[] = [
  {
    path: RoutePath.MAIN,
    icon: '🏠',
    label: 'Посещения'
  },
  {
    path: RoutePath.MAIN,
    icon: '⚙️',
    label: 'Расписания'
  },
  {
    path: RoutePath.MAIN,
    icon: '📄',
    label: 'Отчеты'
  }
]
