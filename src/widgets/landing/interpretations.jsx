import React from "react"
import { Card } from "flowbite-react"

export default function Interpretations() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-semibold text-center mb-10">
        Our Interpretation Methods
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-purple-800 border-none">
          <h5 className="text-2xl font-bold tracking-tight text-white">
            Jungian Perspective
          </h5>
          <p className="font-normal text-gray-300">
            Explore the collective unconscious and archetypal symbols in your
            dreams. Uncover personal growth opportunities and gain a deeper
            understanding of your psyche.
          </p>
        </Card>
        <Card className="bg-purple-800 border-none">
          <h5 className="text-2xl font-bold tracking-tight text-white">
            Freudian Perspective
          </h5>
          <p className="font-normal text-gray-300">
            Delve into your subconscious desires and repressed thoughts.
            Understand how your dreams relate to your waking life and personal
            relationships.
          </p>
        </Card>
      </div>
    </section>
  )
}
