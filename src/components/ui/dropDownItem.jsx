import React from "react"
import { Link } from "react-router-dom"
import { Dropdown } from "flowbite-react"

const DropDownItem = ({ title, path }) => {
  return (
    <Dropdown.Item>
      <Link to={path} className="w-full text-left">
        {title}
      </Link>
    </Dropdown.Item>
  )
}

export default DropDownItem
