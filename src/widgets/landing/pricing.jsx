import React from "react"
import { Button, Card } from "flowbite-react"

const plans = [
  {
    title: "Free",
    price: "$0",
    features: [
      "5 dream interpretations/month",
      "Basic dream journaling",
      "Ad-supported",
    ],
  },
  {
    title: "Dreamer",
    price: "$9.99/mon",
    features: [
      "Unlimited interpretations",
      "Advanced dream journaling",
      "Ad-free experience",
      "Priority support",
    ],
  },
  {
    title: "Visionary",
    price: "$19.99/mon",
    features: [
      "Everything in Dreamer",
      "Personalized insights",
      "Dream pattern analysis",
      "1-on-1 dream counseling session/month",
    ],
  },
]

export default function Pricing() {
  return (
    <section className="mb-20">
      <h3 className="text-3xl font-semibold text-center mb-10">
        Start Your Dream Journey
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`border-none ${
              index === 1
                ? "bg-gradient-to-b from-purple-600 to-indigo-600"
                : "bg-purple-800"
            }`}
          >
            <h5 className="text-2xl font-bold tracking-tight text-white mb-2">
              {plan.title}
            </h5>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <ul className="list-disc list-inside mb-4">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <Button className="w-full">Choose Plan</Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
