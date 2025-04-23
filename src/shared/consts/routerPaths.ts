export enum AppRoutes {
  MAIN = 'MAIN',
  LOGIN = 'LOGIN'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.LOGIN]: '/auth/login'
}
