import React from "react"
import DreamListDeleted from "../widgets/dreamListDeleted"

const DeletedDreams = () => {
  return (
    <div className="deleted-dreams-page max-w-screen-xl mx-auto my-8 px-1 md:mb-10 md:px-4">
      <h1 className="text-gray-600 ml-4 text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
        Deleted Dreams
      </h1>
      <DreamListDeleted />
    </div>
  )
}

export default DeletedDreams
