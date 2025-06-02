import { BarChart } from "@/shared/assets/svg/BarChart"
import { Calendar } from "@/shared/assets/svg/Calendar"
import { Columns } from "@/shared/assets/svg/Columns"
import { RoutePath } from "@/shared/consts/routerPaths"
import { RolePermissionKey, RolePermissionKeys } from "@/shared/types/role"
export interface SidebarItem {
  path: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
  permission: RolePermissionKey
}

export const sidebarItems: SidebarItem[] = [
  {
    path: RoutePath.MAIN,
    icon: Calendar,
    label: "Расписания",
    permission: RolePermissionKeys.SCHEDULE_VIEW
  },
  {
    path: RoutePath.VISITS,
    icon: Columns,
    label: "Посещения",
    permission: RolePermissionKeys.VISIT_VIEW
  },
  {
    path: RoutePath.REPORT,
    icon: BarChart,
    label: "Отчеты",
    permission: RolePermissionKeys.REPORT_VIEW
  }
]
