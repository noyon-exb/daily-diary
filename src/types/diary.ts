export interface PeriodData {
  period: string
  subject: string
  lessonDetails: string
}

export interface DiaryFormData {
  date: Date
  day: string
  className: string
  periods: [PeriodData, PeriodData, PeriodData]
  preparedBy: string
}