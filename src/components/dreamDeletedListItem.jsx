import React from "react"
import { Card, Button } from "flowbite-react"
import { Rating } from "flowbite-react"
import UiDreamBadge from "./ui/uiDreamBadge"
import UiDateTitle from "./ui/uiDateTitle"

const DreamDeletedListItem = ({ dream, onRestoreClick, onDeleteClick }) => {
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
            color="green"
            onClick={() => onRestoreClick(dream)}
            className="flex items-center"
          >
            Restore
          </Button>
          <Button
            color="red"
            onClick={() => onDeleteClick(dream.id)}
            className="flex items-center"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DreamDeletedListItem
