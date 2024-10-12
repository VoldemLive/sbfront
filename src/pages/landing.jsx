import React from "react"
import Navbarmenu from "../components/landing/navbarmenu"
import Footermenu from "../components/landing/footermenu"
import HeroVFX from "../components/landing/herovfx"
import KeyFeatures from "../components/landing/keyFeatures"
import Interpretations from "../components/landing/interpretations"
import Testimonials from "../components/landing/testimonials"
import Pricing from "../components/landing/pricing"
import Action from "../components/landing/action"
import PromoBadge from "../components/landing/promoBadge"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="absolute top-0 w-full z-10">
        <Navbarmenu />
      </div>
      {/* Hero Section */}
      <div className="absolute top-0 w-full z-9">
        <HeroVFX />
      </div>
      <div className="block min-h-screen w-full"></div>
      <main className="w-full mx-auto">
        <PromoBadge />
        {/* Key Features Section */}
        <div className="w-full mx-auto">
          <KeyFeatures />
        </div>

        {/* Interpretation Methods Section */}
        <div className="w-full bg-slate-300 mx-auto py-10 px-4">
          <Interpretations />
        </div>

        {/* Testimonials Section */}
        <div className="w-full max-w-screen-xl mx-auto py-10 px-4">
          <Testimonials />
        </div>

        {/* Pricing Section */}
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <Pricing />
        </div>

        {/* Call to Action */}
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <Action />
        </div>
      </main>
      <Footermenu />
    </div>
  )
}
