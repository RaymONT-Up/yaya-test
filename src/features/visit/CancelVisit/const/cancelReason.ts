export enum CancelReason {
  TEACHER_SICK = "Преподаватель заболел",
  LESSON_CANCELED = "Занятие отменено",
  USER_REQUESTED = "Пользователь попросил отменить",
  GROUP_FULL = "Группа переполнена"
}

export const cancelReasonsList = Object.values(CancelReason)
