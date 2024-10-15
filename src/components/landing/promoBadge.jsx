import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function PromoBadge() {
  const [isVisible, setIsVisible] = useState(true)

  const hidePromoBadge = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="relative bg-yellow-300 text-black text-center p-4">
      <h4 className="text-lg font-semibold">
        <Link to="/signup">
          <span className="underline font-semibold">Sign Up Today!</span>
        </Link>
      </h4>
      <p className="mt-2">Get an additional 5 credits when you join us now!</p>
      <div
        className="absolute top-1 right-1 cursor-pointer"
        onClick={hidePromoBadge}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}
