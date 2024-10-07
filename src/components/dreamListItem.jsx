import React from "react"
import { Card, Button } from "flowbite-react"
import { Rating } from "flowbite-react"
import UiDreamBadge from "./ui/uiDreamBadge"
import UiDateTitle from "./ui/uiDateTitle"

const DreamListItem = ({ dream, onDreamClick, onDeleteClick, onEditClick }) => {
  return (
    <Card key={dream.id} className="shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <UiDateTitle date={dream.datedream} />
        </div>
        <div>
          <UiDreamBadge isLucid={dream.lucid} />
        </div>
      </div>
      <p className="mt-2 line-clamp-3 text-sm sm:text-base dark:text-white">
        {dream.description || "No description available."}
      </p>
      <div className="flex justify-between items-center gap-2 mt-4">
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
        <div className="flex gap-2">
          <Button
            color="gray"
            onClick={() => onDreamClick(dream)}
            className="flex items-center"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Button>
          <Button
            color="gray"
            onClick={() => onEditClick(dream)}
            className="flex items-center"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
              />
            </svg>
          </Button>
          <Button
            color="gray"
            onClick={() => onDeleteClick(dream.id)}
            className="flex items-center"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DreamListItem
