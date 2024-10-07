import React from "react"

export default function Logo({ color = "gradient", className = "" }) {
  const textColorClass =
    color === "white"
      ? "text-white"
      : "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500"

  return (
    <div
      className={`flex items-center gap-2 text-2xl lg:text-3xl font-bold ${className}`}
    >
      <span className={textColorClass}>somnibay</span>
    </div>
  )
}
