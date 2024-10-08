import React from "react"
import { HiExclamationCircle } from "react-icons/hi"

const EmptyListItem = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-gray-400 dark:text-gray-500">
      <HiExclamationCircle className="h-12 w-12 mb-2" />
      <p className="text-lg">No dreams found. Let&apos;s add some!</p>
    </div>
  )
}

export default EmptyListItem
