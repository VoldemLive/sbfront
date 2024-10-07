import React from "react"
import DreamDetails from "../components/dreamDetails"
import InterpretationView from "../components/interpretationView"
const DreamPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-8 px-1 md:mb-10 md:px-4">
      <h1 className="text-gray-600 ml-4 text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
        Dream Details
      </h1>
      <DreamDetails />
      <InterpretationView />
    </div>
  )
}

export default DreamPage
