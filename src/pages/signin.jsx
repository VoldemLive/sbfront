import React from "react"
import SigninWidget from "../widgets/signin"
import Navbarmenu from "../components/landing/navbarmenu"
import Footermenu from "../components/landing/footermenu"
export default function Signin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="absolute top-0 w-full z-10">
        <Navbarmenu />
      </div>
      <div className="w-full min-h-screen flex justify-center items-center mx-auto">
        <SigninWidget />
      </div>
      <Footermenu />
    </div>
  )
}
