import React, { useState, useEffect } from "react"
import { Navbar, useThemeMode } from "flowbite-react"
import Logo from "../../components/logo"
import { Link } from "react-router-dom"
import { Button } from "flowbite-react"

export default function Navbarmenu() {
  return (
    <div className="h-[78px] top-0 w-full z-50">
      <Navbar fluid className="bg-transparent dark:bg-transparent">
        <Navbar.Brand href="/">
          <Logo color="white" />
        </Navbar.Brand>

        <div className="relative gap-2 md:order-2 flex flex-row">
          <Link to="/signin">
            <Button color="black">Login</Button>
          </Link>
          <Link to="/signup">
            <Button color="dark">Sign up</Button>
          </Link>
        </div>
      </Navbar>
    </div>
  )
}
