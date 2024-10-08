import React, { useState, useEffect } from "react"
import { Label, Button, Rating } from "flowbite-react"
import api from "../API/api"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"
import { Datepicker } from "flowbite-react"

const DreamForm = () => {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const { id } = useParams()

  const [datedream, setDatedream] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [description, setDescription] = useState("")
  const [quality, setQuality] = useState(5)
  const [hoveredQuality, setHoveredQuality] = useState(0)
  const [hours, setHours] = useState(8)
  const [lucid, setLucid] = useState(false)

  const resetForm = () => {
    setDatedream(new Date().toISOString().split("T")[0])
    setDescription("")
    setQuality(5)
    setHours(8)
    setLucid(false)
  }

  useEffect(() => {
    const fetchDream = async () => {
      if (id) {
        const { data } = await api.getDream(id)
        if (data) {
          console.log(data.dreams.datedream.split("T")[0])
          setDatedream(data.dreams.datedream.split("T")[0])
          setDescription(data.dreams.description)
          setQuality(data.dreams.quality)
          setHours(data.dreams.hours)
          setLucid(data.dreams.lucid)
        }
      }
    }

    fetchDream()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (description.length < 500) {
      addToast(
        "Dream description must be at least 500 characters long",
        "error"
      )
      return
    }
    const dreamData = { datedream, description, quality, hours, lucid }

    try {
      let result
      if (id) {
        result = await api.updateDream(id, dreamData)
      } else {
        result = await api.createDream(dreamData)
      }

      if (result.status === 201 || result.status === 200) {
        console.log("Dream saved:", result.data)
        resetForm()
        addToast("Dream saved successfully", "success")

        // Navigate to the newly created or updated dream
        const dreamId = id || result.data.id // Use existing id for updates, or new id for creations
        navigate(`/dreams/${dreamId}`)
      } else {
        console.error("Error saving dream:", result.error)
        addToast("Error saving dream", "error")
      }
    } catch (error) {
      console.error("Error saving dream:", error)
      addToast("Error saving dream", "error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="datedream" className="font-semibold" value="Date" />
        <Datepicker
          id="datedream"
          value={datedream}
          onSelectedDateChanged={(date) => {
            setDatedream(date.toISOString().split("T")[0])
          }}
          required
        />
      </div>
      <div>
        <Label
          htmlFor="description"
          className="font-semibold"
          value="Description (minimum 500 characters)"
        />
        <textarea
          id="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here... (minimum 500 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={500}
        />
        <p className="mt-1 text-sm text-gray-500">
          {description.length}/500 characters
        </p>
      </div>
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="lucid"
            checked={lucid}
            onChange={() => setLucid(!lucid)}
            className="sr-only peer"
          />
          <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
            Lucid Dream
          </span>
        </label>
      </div>
      <div>
        <Label value="Quality" />
        <Rating>
          {[...Array(5)].map((_, index) => (
            <Rating.Star
              className="w-8 h-8"
              key={index}
              filled={index < (hoveredQuality || quality)}
              onClick={() => setQuality(index + 1)}
              onMouseEnter={() => setHoveredQuality(index + 1)}
              onMouseLeave={() => setHoveredQuality(0)}
            />
          ))}
        </Rating>
      </div>
      <div>
        <Label htmlFor="hours" value="Duration (hours)" />
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            onClick={() => setHours(Math.max(1, hours - 1))}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            id="hours"
            type="text"
            value={hours}
            min={1}
            max={12}
            onChange={(e) =>
              setHours(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))
            }
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0"
            required
          />
          <button
            type="button"
            id="increment-button"
            onClick={() => setHours(Math.min(12, hours + 1))}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <Button className="w-full" type="submit">
        {id ? "Update Dream" : "Submit Dream"}
      </Button>
    </form>
  )
}

export default DreamForm
