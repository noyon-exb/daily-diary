import { forwardRef, useEffect, useRef, useState } from "react"
import "@fontsource/patrick-hand"
import "@fontsource/playfair-display"
import "@fontsource/noto-sans-bengali"
import { cn } from "@/lib/utils"
import { DIARY_NOTE, SCHOOL_NAME } from "@/constants/diary"
import type { DiaryFormData } from "@/types/diary"

const MAX_WIDTH = 800
const MAX_HEIGHT = 1100

const formatDateShort = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

interface DiaryCardProps {
  data: DiaryFormData
  className?: string
}

const DiaryCard = forwardRef<HTMLDivElement, DiaryCardProps>(
  ({ data, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(MAX_WIDTH)

    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const updateWidth = () => {
        setContainerWidth(container.clientWidth || MAX_WIDTH)
      }

      updateWidth()

      const observer = new ResizeObserver((entries) => {
        const entry = entries[0]
        if (entry) setContainerWidth(entry.contentRect.width)
      })

      observer.observe(container)
      return () => observer.disconnect()
    }, [])

    const scale = Math.min(containerWidth / MAX_WIDTH, 1)

    return (
      <div ref={containerRef} className="w-full">
        <div
          className="mx-auto"
          style={{ width: MAX_WIDTH * scale, height: MAX_HEIGHT * scale }}
        >
          <div
            className="overflow-hidden"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: MAX_WIDTH,
              height: MAX_HEIGHT,
            }}
          >
            <div
              ref={ref}
              className={cn("relative overflow-hidden", className)}
              style={{
                width: MAX_WIDTH,
                minHeight: MAX_HEIGHT,
                fontFamily:
                  "'Patrick Hand', 'Playfair Display', 'Noto Sans Bengali', sans-serif",
                color: "#171717",
              }}
            >
              {/* Paper background */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#FFFDF5" }}
              />

              {/* Top-right sticky note */}
              <div
                className="absolute pointer-events-none"
                style={{ top: "12px", right: "20px", transform: "rotate(5deg)", opacity: "0.7" }}
              >
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
                  <rect x="2" y="2" width="106" height="106" rx="4" fill="rgba(80,60,80,0.08)" />
                  <rect x="0" y="0" width="110" height="108" rx="4" fill="#F6C5A5" opacity="0.65" />
                  <rect x="0" y="0" width="110" height="6" rx="2" fill="#F6C5A5" opacity="0.45" />
                  <path d="M96 4 L92 12 Q88 18 90 22" stroke="#4B3D3A" strokeWidth="1.5" fill="none" opacity="0.5" />
                  <text x="55" y="34" textAnchor="middle" fontSize="16" fill="#4B3D3A" opacity="0.8" fontFamily="'Patrick Hand'">Grow</text>
                  <text x="55" y="52" textAnchor="middle" fontSize="16" fill="#4B3D3A" opacity="0.8" fontFamily="'Patrick Hand'">every</text>
                  <text x="55" y="70" textAnchor="middle" fontSize="16" fill="#4B3D3A" opacity="0.8" fontFamily="'Patrick Hand'">day!</text>
                  <text x="55" y="92" textAnchor="middle" fontSize="16" fill="#F5A7C7" opacity="0.8">♥</text>
                </svg>
              </div>

              {/* Center content — reduced top margin */}
              <div className="relative z-10 flex flex-col items-center" style={{ marginTop: "55px", padding: "0 35px" }}>

                {/* Title "Diary" */}
                <div className="flex justify-center" style={{ marginBottom: "6px" }}>
                  <svg width="320" height="95" viewBox="0 0 320 95" fill="none">
                    <text
                      x="160"
                      y="70"
                      textAnchor="middle"
                      fontSize="72"
                      fontWeight="900"
                      fontFamily="'Patrick Hand', sans-serif"
                      fill="#F7D96B"
                      stroke="#4B3D3A"
                      strokeWidth="2.5"
                      paintOrder="stroke fill"
                    >
                      Diary
                    </text>
                  </svg>
                </div>

                {/* School name */}
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: 600,
                    color: "#4A7891",
                    marginBottom: "6px",
                  }}
                  className="font-bold font-mono"
                >
                  {SCHOOL_NAME}
                </p>

                {/* Decorative divider */}
                <div className="flex items-center gap-2" style={{ marginBottom: "10px" }}>
                  <span style={{ color: "#C9E8D0", fontSize: "18px" }}>❀</span>
                  <div style={{ width: "80px", height: "2px", backgroundColor: "#F5A7C7", borderRadius: "2px" }} />
                  <span style={{ color: "#C9E8D0", fontSize: "18px" }}>❀</span>
                </div>

                {/* Info pills — using SVG icons instead of emoji */}
                <div className="flex flex-wrap justify-center gap-3" style={{ marginBottom: "12px" }}>
                  {[
                    { icon: "calendar", label: "Date", value: formatDateShort(data.date) },
                    { icon: "calendar", label: "Day", value: data.day },
                    { icon: "clock", label: "Class", value: data.className },
                  ].map((info) => (
                    <div
                      key={info.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#F9D7E5",
                        borderRadius: "16px",
                        padding: "8px 18px",
                        border: "2px solid #F5A7C7",
                        boxShadow: "0 3px 8px rgba(80,60,80,0.08)",
                        minWidth: "120px",
                      }}
                    >
                      <span
                      className="text-blud-900"
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                          opacity: 0.7,
                        }}
                      >
                        {info.label}
                      </span>
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "#171717",
                        }}
                      >
                        {info.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Table */}
                <div className="w-full" style={{ marginBottom: "14px" }}>
                  <table
                    className="w-full border-collapse"
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: "2px solid #8F78C5",
                      backgroundColor: "#EEE9F8",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#B47DDB" }}>
                        {["Period", "Subject", "Lesson Details"].map((header) => (
                          <th
                            key={header}
                            style={{
                              textAlign: "center",
                              padding: "8px 6px",
                              fontSize: "24px",
                              fontWeight: 700,
                              color: "#171717",
                              width:
                                header === "Period"
                                  ? "20%"
                                  : header === "Subject" ? "25%" : "55%",
                              borderBottom: "2px solid #8F78C5",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.periods.map((period, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom:
                              idx < data.periods.length - 1
                                ? "1.5px solid #8F78C5"
                                : "none",
                          }}
                        >
                          {/* Period cell with SVG icon */}
                          <td
                            style={{
                              textAlign: "center",
                              padding: "8px 6px",
                              borderRight: "1.5px solid #8F78C5",
                              verticalAlign: "middle",
                            }}
                          >
                            <div style={{ fontSize: "20px" }}>
                              {idx === 0 ? (
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                  <circle cx="11" cy="11" r="9" fill="#F9D7E5" stroke="#4B3D3A" strokeWidth="1.2"/>
                                  <circle cx="11" cy="11" r="1.5" fill="#4B3D3A"/>
                                  <line x1="11" y1="11" x2="11" y2="4" stroke="#4B3D3A" strokeWidth="1.2"/>
                                  <line x1="11" y1="11" x2="16" y2="11" stroke="#4B3D3A" strokeWidth="0.8"/>
                                </svg>
                              ) : idx === 1 ? (
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                  <circle cx="11" cy="11" r="8" fill="#F5A7C7" opacity="0.6"/>
                                  <circle cx="11" cy="11" r="5" fill="#F7D96B" opacity="0.5"/>
                                  <circle cx="11" cy="11" r="2" fill="#4B3D3A" opacity="0.4"/>
                                  <circle cx="16" cy="6" r="3" fill="#C9E8D0" opacity="0.5"/>
                                  <circle cx="6" cy="16" r="3" fill="#C9E8D0" opacity="0.4"/>
                                </svg>
                              ) : (
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                  <polygon points="11,0 3,8 19,8" fill="#F7D96B" opacity="0.6"/>
                                  <polygon points="11,0 3,8 19,8" fill="none" stroke="#4B3D3A" strokeWidth="0.8" opacity="0.5"/>
                                  <circle cx="11" cy="11" r="2" fill="#F7D96B" opacity="0.7"/>
                                </svg>
                              )}
                            </div>
                            <div style={{ fontSize: "20px", fontWeight: 700, color: "#171717", marginTop: "2px" }}>
                              {idx === 0 ? "1st" : idx === 1 ? "2nd" : "3rd"}
                            </div>
                          </td>

                          {/* Subject */}
                          <td
                            style={{
                              textAlign: "center",
                              padding: "12px 10px",
                              fontSize: "22px",
                              fontWeight: 700,
                              color: "#171717",
                              borderRight: "1.5px solid #8F78C5",
                            }}
                          >
                            {period.subject}
                          </td>

                          {/* Lesson Details */}
                          <td
                            style={{
                              padding: "12px 10px",
                              fontSize: "20px",
                              fontWeight: 600,
                              color: "#171717",
                              lineHeight: 1.4,
                              wordBreak: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {period.lessonDetails}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Note box */}
                <div
                  className="w-full bg-green-300"
                  style={{
                    //backgroundColor: "#F9D7E5",
                    borderRadius: "16px",
                    padding: "10px 16px",
                    border: "2px solid #F5A7C7",
                    boxShadow: "0 3px 10px rgba(80,60,80,0.08)",
                    marginBottom: "10px",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <p
                    className="font-bold"
                      style={{
                        fontSize: "30px",
                        color: "#171717",
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {DIARY_NOTE}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "100px",
                    height: "2px",
                    backgroundColor: "#C9E8D0",
                    borderRadius: "2px",
                    marginBottom: "6px",
                  }}
                />

                {/* Prepared By — nicer with background */}
                <div className="italic inline-flex flex-row items-center justify-center gap-3 rounded-[14px] text-[32px] text-blue-900 font-bold  border-2 border-[#F5A7C7] bg-blue-200 px-5 py-2 text-center shadow-[0_3px_8px_rgba(80,60,80,0.08)]">
                    Prepared by: {data.preparedBy}
                </div>
              </div>

              {/* Bottom desk scene — compact, moved up */}
              <div
                className="absolute pointer-events-none"
                style={{ bottom: "8px", left: "50%", transform: "translateX(-50%)", opacity: "0.55" }}
              >
                <svg width="320" height="80" viewBox="0 0 320 80" fill="none">
                  <rect x="10" y="45" width="300" height="30" rx="6" fill="rgba(80,60,80,0.04)" />

                  {/* Books stack */}
                  <rect x="18" y="46" width="32" height="28" rx="3" fill="#F5A7C7" opacity="0.6" />
                  <rect x="20" y="36" width="28" height="10" rx="2" fill="#C9E8D0" opacity="0.5" />
                  <rect x="16" y="26" width="36" height="10" rx="2" fill="#B9A6E5" opacity="0.4" />

                  {/* Pencil holder */}
                  <rect x="80" y="30" width="24" height="36" rx="4" fill="#F9D7E5" opacity="0.45" />
                  <line x1="88" y1="20" x2="84" y2="34" stroke="#4B3D3A" strokeWidth="1.2" opacity="0.45" />
                  <line x1="96" y1="18" x2="92" y2="32" stroke="#F5A7C7" strokeWidth="1.5" opacity="0.35" />

                  {/* Flower pot */}
                  <rect x="140" y="40" width="24" height="30" rx="3" fill="#F6C5A5" opacity="0.5" />
                  <circle cx="148" cy="30" r="7" fill="#C9E8D0" opacity="0.45" />
                  <circle cx="156" cy="28" r="5" fill="#F9D7E5" opacity="0.45" />
                  <circle cx="150" cy="14" r="2" fill="#F7D96B" opacity="0.5" />

                  {/* Bunny reading */}
                  <ellipse cx="238" cy="42" rx="14" ry="18" fill="#F9D7E5" opacity="0.5" />
                  <circle cx="238" cy="22" r="11" fill="#F9D7E5" opacity="0.5" />
                  <ellipse cx="228" cy="10" rx="4" ry="10" fill="#F9D7E5" opacity="0.45" />
                  <ellipse cx="250" cy="12" rx="3.5" ry="8" fill="#F9D7E5" opacity="0.45" />
                  <circle cx="234" cy="20" r="1.5" fill="#4B3D3A" opacity="0.45" />
                  <circle cx="244" cy="20" r="1.5" fill="#4B3D3A" opacity="0.45" />
                  <rect x="218" y="38" width="38" height="24" rx="3" fill="#C9E8D0" opacity="0.4" />
                  <circle cx="238" cy="24" r="1" fill="#F5A7C7" opacity="0.5" />

                  {/* Stars */}
                  <text x="290" y="16" fontSize="8" fill="#F7D96B" opacity="0.4">✦</text>
                  <text x="300" y="50" fontSize="6" fill="#F7D96B" opacity="0.3">✦</text>
                  <text x="10" y="10" fontSize="10" fill="#F7D96B" opacity="0.35">✦</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

DiaryCard.displayName = "DiaryCard"

export default DiaryCard