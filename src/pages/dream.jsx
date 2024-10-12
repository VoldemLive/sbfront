import React from "react"
import DreamDetails from "../components/dreamDetails"
import InterpretationView from "../components/interpretationView"
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi"
import { useParams, Link } from "react-router-dom"
const DreamPage = () => {
  const { id } = useParams()
  return (
    <div className="max-w-screen-xl mx-auto my-8 px-1 md:mb-10 md:px-4">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="px-5 py-3 rounded-lg dark:bg-gray-800"
      >
        <Breadcrumb.Item icon={HiHome}>
          <Link to="/dreams">Dreams</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dream {id}</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-gray-600 ml-4 text-2xl sm:text-3xl font-bold mb-8 dark:text-white">
        Dream Details
      </h1>
      <DreamDetails />
      <InterpretationView />
    </div>
  )
}

export default DreamPage
