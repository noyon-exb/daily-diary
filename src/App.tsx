import { useEffect, useRef, useState } from "react"
import DiaryForm from "@/components/diary-form"
import DiaryCard from "@/components/diary-card"
import DownloadButtons from "@/components/download-buttons"
import type { DiaryFormData } from "@/types/diary"

function App() {
  const [diaryData, setDiaryData] = useState<DiaryFormData | null>(null)
  const diaryRef = useRef<HTMLDivElement>(null)
  const COOLDOWN_SECS = 3
  const [coolDownSeconds, setCoolDownSeconds] = useState(0)

  useEffect(() => {
    if (coolDownSeconds === 0) return
    const timer = window.setTimeout(() => {
      setCoolDownSeconds((s) => s - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [coolDownSeconds])

  const canProceed = () => {
    if (coolDownSeconds > 0) return false
    setCoolDownSeconds(COOLDOWN_SECS)
    return true
  }

  const handleFormSubmit = (data: DiaryFormData) => {
    setDiaryData(data)
  }

  const handleReset = () => {
    setDiaryData(null)
  }

  return (
    <div
      className="flex flex-col max-w-md mx-auto"
      style={{ backgroundColor: "#faf5f0", minHeight: "100dvh" }}
    >
      {!diaryData ? (
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <DiaryForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center justify-center px-4">
            <DiaryCard ref={diaryRef} data={diaryData} />
          </div>
          <div className="p-4" style={{ paddingBottom: "32px" }}>
            <DownloadButtons
              diaryRef={diaryRef}
              data={diaryData}
              coolDownSeconds={coolDownSeconds}
              onActionStart={canProceed}
            />
            <div className="mt-2 text-center">
              <button
                onClick={handleReset}
                className="text-sm underline cursor-pointer"
                style={{ color: "#b8867a" }}
              >
                Edit information
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App