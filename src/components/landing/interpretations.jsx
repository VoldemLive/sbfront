import React from "react"
import { Card } from "flowbite-react"

export default function Interpretations() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <h3 className="text-4xl font-semibold text-center mb-10 text-purple-900">
        Our Interpretation Methods
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="bg-purple-900 dark:bg-purple-900 text-slate-200">
          <div>
            <h5 className="text-2xl text-center font-bold tracking-tight">
              Jungian Perspective
            </h5>
            <p className="font-normal text-gray-300">
              Explore the collective unconscious and archetypal symbols in your
              dreams. Uncover personal growth opportunities and gain a deeper
              understanding of your psyche.
            </p>
          </div>
        </Card>
        <Card className="bg-purple-900 dark:bg-purple-900 text-slate-200">
          <div>
            <h5 className="text-2xl text-center font-bold tracking-tight text-white">
              Freudian Perspective
            </h5>
            <p className="font-normal text-gray-300">
              Delve into your subconscious desires and repressed thoughts.
              Understand how your dreams relate to your waking life and personal
              relationships.
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
