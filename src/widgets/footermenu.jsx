import React from "react"
import { Footer } from "flowbite-react"
import Logo from "../components/logo"
export default function Footermenu() {
  return (
    <Footer container className="rounded-none ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Divider />
          <Footer.Copyright
            href="#"
            by="Somnibay project for CTD™"
            year={new Date().getFullYear().toString()}
          />
        </div>
      </div>
    </Footer>
  )
}
