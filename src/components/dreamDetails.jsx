import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"
import { Card, Rating } from "flowbite-react"
import api from "../API/api"
import UiDreamBadge from "./ui/uiDreamBadge"
import UiDateTitle from "./ui/uiDateTitle"

const DreamDetails = () => {
  const { addToast } = useToast()
  const [dream, setDream] = useState(null)
  const { pathname } = useLocation()
  const dreamId = pathname.split("/").pop()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const fetchDream = async () => {
      const { data, error } = await api.getDream(dreamId)
      if (error) {
        addToast("No dream found.", { type: "error" })
      } else {
        setDream(data.dreams)
      }
    }
    fetchDream()
  }, [dreamId, addToast])

  if (!dream) {
    return <div>No dream found.</div>
  }

  const isDescriptionLong = dream.description && dream.description.length > 100 // Adjust the length as needed
  const isTextShort = dream.description && dream.description.length <= 150 // Adjust this limit based on your design

  return (
    <Card>
      <div className="flex justify-between items-center gap-2">
        <div>
          <UiDateTitle date={dream.datedream} />
        </div>
        <div>
          <UiDreamBadge isLucid={dream.lucid} />
        </div>
      </div>
      <div className="relative w-full">
        <p
          className={`mt-2 text-justify text-sm sm:text-base text-slate-600 dark:text-white ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {dream.description || "No description available."}
        </p>
        {isDescriptionLong && !isTextShort && (
          <div className="flex justify-end">
            <button
              className="mt-2 self-end text-slate-400 border-2 border-slate-200 hover:border-slate-300 bg-slate-150 hover:bg-slate-100 duration-300 rounded-md p-1"
              onClick={() => setIsExpanded(!isExpanded)} // Toggle expanded state
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <Rating>
            {[...Array(5)].map((_, index) => (
              <Rating.Star
                className="h-6 w-6"
                key={index}
                filled={index < dream.quality}
              />
            ))}
          </Rating>
        </div>
        <div className="flex items-center">
          <span className="mr-1">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
              />
            </svg>
          </span>
          <p className="text-gray-800 dark:text-white">
            {dream.hours} {dream.hours > 1 ? "hours" : "hour"}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default DreamDetails
