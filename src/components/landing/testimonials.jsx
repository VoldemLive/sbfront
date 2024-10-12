import React from "react"
import { Card, Rating } from "flowbite-react"

const testimonials = [
  {
    name: "Alex M.",
    stars: 5,
    quote:
      "Using Somnibay has opened my eyes to the hidden meanings in my dreams. The insights I've gained have truly changed my perspective on life!",
  },
  {
    name: "Sarah L.",
    stars: 5,
    quote:
      "The combination of Jungian and Freudian perspectives gives a well-rounded interpretation. I've learned so much about myself.",
  },
  {
    name: "Jamie K.",
    stars: 5,
    quote:
      "Somnibay has transformed my understanding of dreams! The insights I receive help me navigate my daily life with more clarity and purpose.",
  },
]

export default function Testimonials() {
  return (
    <section className="">
      <h3 className="text-3xl font-semibold text-center mb-10">
        What Our Dreamers Say
      </h3>
      <div className="grid md:grid-cols-3 gap-8 text-slate-800 dark:text-slate-800">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="bg-slate-100 dark:bg-slate-100 border-none"
          >
            <p className="mb-4">&quot;{testimonial.quote}&quot;</p>
            <Rating size="sm">
              {Array.from({ length: testimonial.stars }).map((_, index) => (
                <Rating.Star className="text-orange-500" key={index} />
              ))}
            </Rating>
            <p className="text-right text-md font-semibold">
              - {testimonial.name}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
