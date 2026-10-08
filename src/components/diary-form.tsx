import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PERIOD_LABELS, SCHOOL_NAME } from "@/constants/diary"
import type { DiaryFormData } from "@/types/diary"
import { BookOpen } from "lucide-react"

interface DiaryFormProps {
  onSubmit: (data: DiaryFormData) => void
}

const today = new Date()
const todayStr = today.toISOString().split("T")[0]

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr + "T12:00:00")
  return date.toLocaleDateString("en-US", { weekday: "long" })
}

export default function DiaryForm({ onSubmit }: DiaryFormProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const formData = new FormData(form)

      const dateVal = formData.get("date") as string
      if (!dateVal) return

      const date = new Date(dateVal + "T12:00:00")
      const day = getDayName(dateVal)
      const className = (formData.get("className") as string).trim()
      const preparedBy = (formData.get("preparedBy") as string).trim()

      const subjects = [
        (formData.get("subject-0") as string).trim(),
        (formData.get("subject-1") as string).trim(),
        (formData.get("subject-2") as string).trim(),
      ]
      const details = [
        (formData.get("details-0") as string).trim(),
        (formData.get("details-1") as string).trim(),
        (formData.get("details-2") as string).trim(),
      ]

      if (!dateVal || !className || !preparedBy) return
      if (subjects.some((s) => !s) || details.some((d) => !d)) return

      onSubmit({
        date,
        day,
        className,
        preparedBy,
        periods: [
          { period: PERIOD_LABELS[0], subject: subjects[0], lessonDetails: details[0] },
          { period: PERIOD_LABELS[1], subject: subjects[1], lessonDetails: details[1] },
          { period: PERIOD_LABELS[2], subject: subjects[2], lessonDetails: details[2] },
        ],
      })
    },
    [onSubmit],
  )

  return (
    <Card className="w-full max-w-lg border-[#f0e0d6] shadow-lg">
      <CardHeader className="text-center pb-2">
        <BookOpen className="mx-auto size-8 text-[#e8738e]" />
        <CardTitle className="text-2xl text-[#5c3a3a]">
          Class Diary Generator
        </CardTitle>
        <CardDescription className="text-[#b8867a]">
          {SCHOOL_NAME}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          {/* Date + Class row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#5c3a3a] font-medium">
                Date <span className="text-red-400">*</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={todayStr}
                required
                className="border-[#e0c8be] focus-visible:ring-[#e8738e]"
                onChange={(e) => {
                  const dayEl = document.getElementById("day-display")
                  if (dayEl && e.target.value) {
                    dayEl.textContent = getDayName(e.target.value)
                  }
                }}
              />
              <p className="text-xs text-[#b8867a]">
                Day: <span id="day-display">{getDayName(todayStr)}</span>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="className" className="text-[#5c3a3a] font-medium">
                Class <span className="text-red-400">*</span>
              </Label>
              <Input
                id="className"
                name="className"
                placeholder='e.g. Nursery D'
                required
                className="border-[#e0c8be] focus-visible:ring-[#e8738e]"
              />
            </div>
          </div>

          {/* Periods */}
          {PERIOD_LABELS.map((label, idx) => (
            <div key={idx} className="space-y-3 p-4 bg-[#fdf8f0] rounded-lg border border-[#f0e0d6]">
              <p className="text-sm font-semibold text-[#5c3a3a] tracking-wider">
                {label}
              </p>
              <div className="space-y-2">
                <div>
                  <Label
                    htmlFor={`subject-${idx}`}
                    className="text-xs text-[#b8867a] font-medium"
                  >
                    Subject <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id={`subject-${idx}`}
                    name={`subject-${idx}`}
                    placeholder="e.g. English"
                    required
                    className="border-[#e0c8be] focus-visible:ring-[#e8738e] mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`details-${idx}`}
                    className="text-xs text-[#b8867a] font-medium"
                  >
                    Lesson Details <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id={`details-${idx}`}
                    name={`details-${idx}`}
                    placeholder="e.g. Fill in the blanks (Aa–Tt)"
                    required
                    className="border-[#e0c8be] focus-visible:ring-[#e8738e] mt-1"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Prepared By */}
          <div className="space-y-2">
            <Label htmlFor="preparedBy" className="text-[#5c3a3a] font-medium">
              Prepared By <span className="text-red-400">*</span>
            </Label>
            <Input
              id="preparedBy"
              name="preparedBy"
              placeholder="e.g. Mrs. Rahman"
              required
              className="border-[#e0c8be] focus-visible:ring-[#e8738e]"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-[#c0a080] text-[#7a5a4a] hover:bg-[#f0e6d6] cursor-pointer"
              onClick={() => {
                const setVal = (id: string, val: string) => {
                  const el = document.getElementById(id) as HTMLInputElement | null
                  if (el) el.value = val
                }
                setVal("date", "2026-10-07")
                const dayEl = document.getElementById("day-display")
                if (dayEl) dayEl.textContent = "Wednesday"
                setVal("className", "Nursery D")
                setVal("subject-0", "English")
                setVal("details-0", "Fill in the blanks (Aa\u2013Tt)")
                setVal("subject-1", "Bangla")
                setVal("details-1", "কারচিহ্ন দিয়ে বর্ণের লেখা")
                setVal("subject-2", "Mathematics")
                setVal("details-2", "Numbers 1\u201320")
                setVal("preparedBy", "Mrs. Rahman")
              }}
            >
              Fill with Sample
            </Button>
            <Button
              type="submit"
              className="w-full bg-[#e8738e] hover:bg-[#d4627a] text-white font-semibold py-5 cursor-pointer"
            >
              Generate Diary
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}