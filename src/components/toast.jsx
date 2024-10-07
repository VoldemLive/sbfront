import React, { useEffect, useState } from "react"
import { Toast, Progress } from "flowbite-react"
import { HiX, HiCheck, HiExclamation } from "react-icons/hi"

const CustomToast = ({ text, type = "success", onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const intervalDuration = 10
    const totalSteps = duration / intervalDuration
    const decrement = 100 / totalSteps

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - decrement
      })
    }, intervalDuration)

    const hideTimer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, duration)

    return () => {
      clearInterval(timer)
      clearTimeout(hideTimer)
    }
  }, [duration, onClose])

  if (!visible) return null

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <HiX className="h-5 w-5" />
      case "warning":
        return <HiExclamation className="h-5 w-5" />
      case "success":
      default:
        return <HiCheck className="h-5 w-5" />
    }
  }

  const getText = (text) => {
    if (typeof text === "string") {
      return text
    } else if (Array.isArray(text)) {
      return text.join("\n")
    } else {
      return ""
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case "danger":
        return "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
      case "success":
      default:
        return "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
    }
  }

  return (
    <Toast className="m-0 p-0">
      <div className="flex flex-col">
        <div className="relative flex flex-row items-center p-2">
          <div
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${getBackgroundColor()}`}
          >
            {getIcon()}
          </div>
          <div className="ml-3 text-sm font-normal">{getText(text)}</div>
          <Toast.Toggle onDismiss={onClose} />
        </div>
        <div className="relative ml-1 mr-1">
          <Progress
            progress={progress}
            max={100}
            size="sm"
            color="cyan"
            className={`absolute top-0 left-0 h-[1px]`}
          />
        </div>
      </div>
    </Toast>
  )
}

export default CustomToast
