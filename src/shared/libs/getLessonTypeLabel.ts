import { LessonTypeEnum } from "@/shared/types/lesson"

export function getLessonTypeLabel(type: LessonTypeEnum): string {
  switch (type) {
    case LessonTypeEnum.OFFLINE:
      return "Офлайн"
    case LessonTypeEnum.ONLINE:
      return "Онлайн"
    case LessonTypeEnum.ONLINE_COURSES:
      return "Онлайн курсы"
    default:
      return type
  }
}
