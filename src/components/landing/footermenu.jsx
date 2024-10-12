import React from "react"
import { Footer } from "flowbite-react"
import Logo from "../../components/logo"
import { Link } from "react-router-dom"
export default function Footermenu() {
  return (
    <Footer
      container
      className="rounded-none bg-transparent dark:bg-transparent"
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <Logo color="white" />
          </Link>
          <Footer.LinkGroup className="text-white">
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
          <Footer.Divider className="text-white" />
          <Footer.Copyright
            className="text-white"
            href="#"
            by="Somnibay project for CTD™"
            year={new Date().getFullYear().toString()}
          />
        </div>
      </div>
    </Footer>
  )
}
