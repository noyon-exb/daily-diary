import type { PeriodData } from "@/types/diary"

export const SCHOOL_NAME = "MIRZA AHMED ISPAHANI HIGH SCHOOL"

export const COLOR = {
  paper: "#FFFDF5",
  lavender: "#B9A6E5",
  lightLavender: "#EEE9F8",
  pink: "#F5A7C7",
  lightPink: "#F9D7E5",
  mint: "#C9E8D0",
  softYellow: "#F7D96B",
  peach: "#F6C5A5",
  darkText: "#171717",
  outline: "#4B3D3A",
  border: "#8F78C5",
  mutedBlue: "#4A7891",
} as const

export const PERIOD_LABELS = ["1st Period", "2nd Period", "3rd Period"] as const

export const DEFAULT_PERIODS: PeriodData[] = PERIOD_LABELS.map((period) => ({
  period,
  subject: "",
  lessonDetails: "",
}))

export const DIARY_NOTE =
  "Note: As per the routine, students should bring the required books, 3 copies, and handwriting practive book every day."

export const COLUMN_WIDTHS = {
  period: "20%",
  subject: "25%",
  lessonDetails: "55%",
} as const