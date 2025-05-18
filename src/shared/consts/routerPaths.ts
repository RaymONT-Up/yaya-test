export enum AppRoutes {
  MAIN = "MAIN",
  LOGIN = "LOGIN",
  SELECT_CENTER = "SELECT_CENTER",
  VISITS = "VISITS",
  REPORT = "REPORT",
  ERROR = "ERROR"
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.LOGIN]: "/auth/login",
  [AppRoutes.SELECT_CENTER]: "/select-center",
  [AppRoutes.VISITS]: "/visits",
  [AppRoutes.REPORT]: "/report",
  [AppRoutes.ERROR]: "/error"
}
