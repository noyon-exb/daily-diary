import { useState, useRef } from "react"
import { toPng, toJpeg } from "html-to-image"
import type { DiaryFormData } from "@/types/diary"

interface DownloadButtonsProps {
  diaryRef: React.RefObject<HTMLDivElement | null>
  data: DiaryFormData
  coolDownSeconds: number
  onActionStart: () => boolean
}

type ExportStatus = "idle" | "loading" | "ready" | "error"

export default function DownloadButtons({
  diaryRef,
  data,
  coolDownSeconds,
  onActionStart,
}: DownloadButtonsProps) {
  const [status, setStatus] = useState<ExportStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const generatingRef = useRef(false)

  const sanitize = (str: string) =>
    str.replace(/[^a-zA-Z0-9-_. ]/g, "").replace(/\s+/g, "-").toLowerCase()

  const dateStr = data.date.toISOString().split("T")[0]
  const filenameBase = `class-diary-${sanitize(data.className)}-${dateStr}`

  const dataUrlToBlob = (dataUrl: string, mime: string) => {
    const parts = dataUrl.split(",")
    const byteString = atob(parts[1])
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], { type: mime })
  }

  const exportImage = async (format: "png" | "jpeg") => {
    if (!diaryRef.current || generatingRef.current) return
    if (!onActionStart()) return

    generatingRef.current = true
    setStatus("loading")
    setErrorMsg("")

    try {
      const node = diaryRef.current
      if (!node) return

      let dataUrl: string
      const mime = format === "png" ? "image/png" : "image/jpeg"

      if (format === "png") {
        dataUrl = await toPng(node, { quality: 1, pixelRatio: 2, cacheBust: true })
      } else {
        dataUrl = await toJpeg(node, { quality: 0.92, pixelRatio: 2, cacheBust: true })
      }

      const blob = dataUrlToBlob(dataUrl, mime)

      // Mobile share sheet
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        const file = new File([blob], `${filenameBase}.${format}`, { type: mime })
        try {
          await navigator.share({ files: [file] })
          setStatus("ready")
          return
        } catch {
          // fall through
        }
      }

      // Browser download
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${filenameBase}.${format}`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)

      setStatus("ready")
    } catch {
      setErrorMsg("Unable to generate the diary image. Please try again.")
      setStatus("error")
    } finally {
      generatingRef.current = false
    }
  }

  const btnDisabled = status === "loading" || coolDownSeconds > 0

  return (
    <div className="mx-auto max-w-md">
      <div className="flex gap-3 w-full justify-center">
        {(["png", "jpeg"] as const).map((format) => (
          <button
            key={format}
            onClick={() => exportImage(format)}
            disabled={btnDisabled}
            className="cursor-pointer py-2 px-4 text-sm font-semibold rounded-lg"
            style={{
              backgroundColor: btnDisabled ? "#e0c8be" : "#e8738e",
              color: "white",
              border: "none",
              opacity: btnDisabled ? "0.5" : "1",
            }}
          >
            {status === "loading" ? (
              "Generating..."
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                Download {format.toUpperCase()}
                {coolDownSeconds > 0 && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      padding: "2px 6px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {coolDownSeconds}s
                  </span>
                )}
              </span>
            )}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <p className="text-sm text-center mt-2" style={{ color: "#b8867a" }}>
          Generating diary...
        </p>
      )}
      {status === "ready" && (
        <p className="text-sm font-medium text-center mt-2" style={{ color: "green" }}>
          Diary Ready
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-center mt-2" style={{ color: "red" }}>
          {errorMsg}
        </p>
      )}
    </div>
  )
}