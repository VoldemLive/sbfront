import React, { useEffect } from "react"
import { Dropdown, useThemeMode, Avatar } from "flowbite-react"
import useUser from "../hooks/useUser" // Import the useUser hook
import Api from "../API/api" // Import the Api class
import { Link } from "react-router-dom"
import DropDownItem from "./ui/dropDownItem"

export default function UserDropdown() {
  const { user, removeUser } = useUser() // Destructure user state and actions from the hook
  const { mode, toggleMode } = useThemeMode()

  const handleSignOut = async () => {
    console.log("signing out")
    await Api.logout()
    removeUser()
  }

  const getGreeting = () => {
    if (user) {
      return (
        <div>
          Welcome back, <br /> <span className="font-bold">{user.email}</span>
        </div>
      )
    }
    return "login or signup"
  }

  return (
    <div className="mr-2">
      {user ? (
        <>
          <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
            <Dropdown.Header>
              <span className="block text-sm"></span>
              <span className="block truncate min-w-[170px] max-w-[170px] text-sm font-medium">
                {getGreeting()}
              </span>
            </Dropdown.Header>
            <DropDownItem title="New Dreams" path="/create-dream" />
            <DropDownItem title="Dreams" path="/dreams" />
            <Dropdown.Divider />
            <Dropdown.Item onClick={toggleMode}>
              {mode === "light" ? "Make it Dark" : "Make it Light"}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        </>
      ) : (
        <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
          <div>
            <Dropdown.Header>
              <span className="opacity-50 block truncate min-w-[170px] max-w-[170px] text-sm font-medium">
                login or signup
              </span>
            </Dropdown.Header>
            <DropDownItem title="Sign In" path="/signin" />
            <DropDownItem title="Sign Up" path="/signup" />
            <Dropdown.Divider />
            <Dropdown.Item onClick={toggleMode}>
              {mode === "light" ? "Make it Dark" : "Make it Light"}
            </Dropdown.Item>
          </div>
        </Dropdown>
      )}
    </div>
  )
}
