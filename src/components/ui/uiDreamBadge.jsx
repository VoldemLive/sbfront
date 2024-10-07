import React from "react"

const UiDreamBadge = ({ isLucid }) => {
  return (
    <div
      className={`flex items-center justify-center sm:w-20 sm:h-7 w-16 h-6 rounded-full border-2 ${
        isLucid ? "bg-black text-white" : "bg-gray-300 text-black"
      }`}
    >
      <p className="text-center">{isLucid ? "Lucid" : "Normal"}</p>
    </div>
  )
}

export default UiDreamBadge
