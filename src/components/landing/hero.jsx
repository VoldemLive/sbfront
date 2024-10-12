import React from "react"
import { Button } from "flowbite-react"

export default function Hero() {
  return (
    <section className="text-center">
      <h2 className="text-5xl font-bold mb-6">
        Unlock the Secrets of Your Dreams
      </h2>
      <p className="text-xl mb-8">
        Discover hidden meanings and gain insights into your subconscious mind.
      </p>
      <div className="flex justify-center">
        <Button color="dark" className="text-lg py-1 px-8">
          Start Your Dream Journey
        </Button>
      </div>
    </section>
  )
}
