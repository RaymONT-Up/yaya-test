import { Calendar } from '@/shared/assets/svg/Calendar'
import { Columns } from '@/shared/assets/svg/Columns'
import { RoutePath } from '@/shared/consts/routerPaths'
export interface SidebarItem {
  path: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

export const sidebarItems: SidebarItem[] = [
  {
    path: RoutePath.MAIN,
    icon: Calendar,
    label: 'Расписания'
  },
  {
    path: RoutePath.VISITS,
    icon: Columns,
    label: 'Посещения'
  }
]
