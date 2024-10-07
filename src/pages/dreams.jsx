import React, { useState, useEffect } from "react"
import DreamsList from "../widgets/dreamsList"

const Dreams = () => {
  return (
    <div className="dream-page max-w-screen-xl mx-auto my-8 px-1 md:mb-10 md:px-4">
      <h1 className="text-gray-600 ml-4 text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
        My Dreams
      </h1>
      <DreamsList />
    </div>
  )
}

export default Dreams
