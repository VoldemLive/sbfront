import React from "react"
import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"
export default function Action() {
  const navigate = useNavigate()
  return (
    <section className="text-center flex flex-col items-center">
      <hr className="w-1/2 my-8" />
      <h3 className="text-4xl font-bold mb-6">Ready to Explore Your Dreams?</h3>
      <p className="text-xl mb-8">
        Join SomniBay today and unlock the power of your subconscious mind.
      </p>
      <Button
        size="xl"
        className="text-lg px-8 py-4"
        onClick={() => {
          navigate("/signup")
        }}
      >
        Get Started for Free
      </Button>
    </section>
  )
}
