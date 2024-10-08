import React from "react"
import { Button, TextInput } from "flowbite-react"
import { HiMagnifyingGlass } from "react-icons/hi2"
const DreamListControl = ({
  searchTerm,
  setSearchTerm,
  navigate,
  onShowDreams,
}) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="relative mb-8">
      <div className="flex w-full gap-2 flex-col-reverse md:flex-row items-center">
        <TextInput
          id="search"
          type="text"
          placeholder="Search dreams..."
          value={searchTerm}
          onChange={handleSearch}
          icon={HiMagnifyingGlass}
          required
          className="w-full"
        />
        <div className="flex w-full md:w-auto flex-row gap-2 sm:mb-0 sm:items-center">
          <Button
            color="gray"
            onClick={() => navigate("/create-dream")}
            className="whitespace-nowrap w-full md:w-auto"
          >
            <div className="flex flex-row items-center gap-x-1">
              <svg
                className="w-[24px] h-[24px] text-gray-800 dark:text-white"
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
                  strokeWidth="1"
                  d="M5 12h14m-7 7V5"
                />
              </svg>

              <span className="block">Add Dream</span>
            </div>
          </Button>
          <Button
            color="blue"
            onClick={onShowDreams}
            className="whitespace-nowrap w-full md:w-auto"
          >
            <div className="flex flex-row items-center gap-1">
              <svg
                className="w-[24px] h-[24px] text-white dark:text-white"
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
                  strokeWidth="1"
                  d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                />
              </svg>

              <span className="block">Show Dreams</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DreamListControl
