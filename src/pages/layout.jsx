"use client"

import React from "react"
import { Outlet } from "react-router-dom"
import Navbarmenu from "../widgets/navbarmenu"
import Footermenu from "../widgets/footermenu"

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-r from-[#e6e7ff] to-[#efe8ff] dark:bg-gradient-to-r dark:from-[#1a1a2e] dark:to-[#16213e] transition-all duration-1000">
      <header>
        <Navbarmenu />
      </header>
      <article className="mb-auto">
        <div className="h-[75px]"></div>
        <div className="relative left-[50%] translate-x-[-50%] w-full">
          <h /> {/* Replace @src with your h component */}
          <Outlet />
        </div>
      </article>
      <footer>
        <Footermenu />
      </footer>
    </div>
  )
}
