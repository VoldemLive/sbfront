import React from "react"
import { Card } from "flowbite-react"

const testimonials = [
  {
    name: "Alex M.",
    quote:
      "SomniBay has helped me understand recurring dreams that I've had for years. It's been a transformative experience!",
  },
  {
    name: "Sarah L.",
    quote:
      "The combination of Jungian and Freudian perspectives gives a well-rounded interpretation. I've learned so much about myself.",
  },
  {
    name: "Jamie K.",
    quote:
      "The token system is great! I can get quick interpretations daily and save up for more in-depth analyses when I need them.",
  },
]

export default function Testimonials() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-semibold text-center mb-10">
        What Our Dreamers Say
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-purple-800 border-none">
            <p className="mb-4">"{testimonial.quote}"</p>
            <p className="font-semibold">- {testimonial.name}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
