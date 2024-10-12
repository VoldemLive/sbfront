import React from "react"
import { Spinner } from "flowbite-react"

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <Spinner aria-label="Loading..." size="xl" />
    </div>
  )
}

export default Loader
