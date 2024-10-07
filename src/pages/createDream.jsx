import React from "react"
import DreamForm from "../components/dreamForm"

const CreateDream = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-8 px-1 md:mb-10 md:px-4">
      <h1 className="text-gray-600 text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
        New Dream
      </h1>
      <DreamForm />
    </div>
  )
}

export default CreateDream
