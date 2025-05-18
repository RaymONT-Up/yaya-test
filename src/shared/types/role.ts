export enum RoleType {
  OWNER = "OWNER",
  MANAGER = "MANAGER"
}

export type RolePermissions = {
  VISIT_VIEW: boolean
  CENTER_EDIT: boolean
  CENTER_VIEW: boolean
  REPORT_VIEW: boolean
  VISIT_CANCEL: boolean
  SCHEDULE_EDIT: boolean
  SCHEDULE_VIEW: boolean
}

export interface RoleResponse {
  role: RoleType
  role_display: string
  permissions: RolePermissions
}

export enum PermissionId {
  VISIT_VIEW = "VISIT_VIEW",
  VISIT_CANCEL = "VISIT_CANCEL",
  SCHEDULE_VIEW = "SCHEDULE_VIEW",
  SCHEDULE_EDIT = "SCHEDULE_EDIT",
  REPORT_VIEW = "REPORT_VIEW",
  CENTER_VIEW = "CENTER_VIEW",
  CENTER_EDIT = "CENTER_EDIT"
}

export interface Permission {
  id: PermissionId
  name: string
  description: string
}
