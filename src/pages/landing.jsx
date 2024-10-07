import React from "react"
import Navbarmenu from "../widgets/landing/navbarmenu"
import Footermenu from "../widgets/landing/footermenu"
import HeroVFX from "../widgets/landing/herovfx"
import KeyFeatures from "../widgets/landing/keyFeatures"
import Interpretations from "../widgets/landing/interpretations"
import Testimonials from "../widgets/landing/testimonials"
import Pricing from "../widgets/landing/pricing"
import Action from "../widgets/landing/action"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="absolute top-0 w-full z-10">
        <Navbarmenu />
      </div>
      <div className="absolute top-0 w-full z-9">
        <HeroVFX />
      </div>
      <div className="block min-h-screen w-full"></div>
      <main className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        {/* Hero Section */}

        {/* Key Features Section */}
        <KeyFeatures />

        {/* Interpretation Methods Section */}
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <Interpretations />
        </div>

        {/* Testimonials Section */}
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
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
