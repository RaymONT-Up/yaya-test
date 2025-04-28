export enum AppRoutes {
  MAIN = 'MAIN',
  LOGIN = 'LOGIN',
  VISITS = 'VISITS',
  REPORT = 'REPORT'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/auth/login',
  [AppRoutes.VISITS]: '/visits',
  [AppRoutes.REPORT]: '/report'
}
