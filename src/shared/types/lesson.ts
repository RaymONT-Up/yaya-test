export enum LessonTypeEnum {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  ONLINE_COURSES = "ONLINE_COURSES"
}
export enum LessonLanguageEnum {
  EN = "Анг",
  RU = "Рус",
  KZ = "Каз"
}
export enum LessonLevelEnum {
  CLASS = "1-4 класс",
  Beginner = "Начинающий"
}

export interface Lesson {
  id: number
  name: string
  center_id: number
  min_age_str: string
  max_age_str: string
  duration: number
  type: LessonTypeEnum
  languages?: [LessonLanguageEnum]
  level: LessonLevelEnum | null
  color?: string | null
}
