export enum LessonTypeEnum {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  ONLINE_COURSES = 'ONLINE_COURSES'
}
export enum LessonLanguageEnum {
  EN = 'Анг',
  RU = 'Рус',
  KZ = 'Каз'
}

export interface Lesson {
  id: number
  name: string
  center_id: number
  min_age_str: string
  max_age_str: string
  duration: number
  type: LessonTypeEnum
  language: LessonLanguageEnum
  level: string | null
}
