import React, { useState, useEffect } from "react"
import { Navbar, useThemeMode } from "flowbite-react"
import UserDropdown from "../components/userDropdown"
import Logo from "../components/logo"
import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"
import { Button } from "flowbite-react"
export default function Navbarmenu() {
  const { mode, toggleMode } = useThemeMode()
  const { user } = useUser()

  return (
    <div className="h-[78px] fixed top-0 w-full z-50">
      <Navbar
        fluid
        className={`w-full bg-opacity-50 ${
          mode === "dark" ? "custom-navbar-dark" : "custom-navbar"
        } navbar`}
      >
        <Navbar.Brand>
          <Link to="/">
            <Logo />
          </Link>
        </Navbar.Brand>

        {user ? (
          <div className="relative gap-2 md:order-2 flex flex-row">
            <UserDropdown />
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="relative gap-2 md:order-2 flex flex-row">
            <Button color="light">Sign in</Button>
            <Button>Sign up</Button>
          </div>
        )}
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/dreams">Dreams</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to="/create-dream">New Dream</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
