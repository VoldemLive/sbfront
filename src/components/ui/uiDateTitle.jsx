import React from "react"

const UiDateTitle = ({ date }) => {
  return (
    <h3 className="text-gray-600 text-xl sm:text-2xl font-semibold dark:text-white">
      {new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </h3>
  )
}

export default UiDateTitle
