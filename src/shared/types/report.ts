export type GeneralStatsTableRow = [string, string | number]

export interface GeneralStatsObject {
  unique_children: number
  total_visits: number
  total_earned: number
  merchant_name: string
  merchant_iban: string
}

export type GeneralStatsResponse = [GeneralStatsTableRow[], GeneralStatsObject]

export interface PartnerReport {
  child_name: string
  center_name: string
  lesson_name: string
  trainer_name: string | null
  datetime_str: string // формат "22-05-2025 18:15"
  end_time: string // формат "19:15"
  earned: number
}

export interface PartnerReportResponse {
  count: number
  next: string | null
  previous: string | null
  results: PartnerReport[]
  page_count: number
}

export interface ReportFilters {
  date_from: string // в формате "DD.MM.YYYY"
  date_to: string // в формате "DD.MM.YYYY"
  lessons?: number[]
  trainers?: number[]
  centers?: number[]
  page?: number
  page_size?: number
  page_count?: number
}

export type ReportStatsFilters = Omit<ReportFilters, "page" | "page_size">
export type ReportDownloadFilters = Omit<
  ReportFilters,
  "page" | "page_size" | "page_count" | "centers"
>
