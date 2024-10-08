import React from "react"
import { HiTrash } from "react-icons/hi"

const EmptyDeletedListItem = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-gray-400 dark:text-gray-500">
      <HiTrash className="h-12 w-12 mb-2" />
      <p className="text-lg">No deleted dreams found.</p>
    </div>
  )
}

export default EmptyDeletedListItem
