import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../API/api"
import { useToast } from "../contexts/ToastContext"
import { Button, Alert, Card, Tabs } from "flowbite-react"

const InterpretationView = () => {
  const [interpretation, setInterpretation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const { addToast } = useToast()

  useEffect(() => {
    const fetchInterpretation = async () => {
      try {
        const response = await api.getInterpretation(id)
        console.log(response)
        if (response.data) {
          setInterpretation(response.data[0])
        } else {
          setError("No interpretation found")
        }
      } catch (err) {
        console.error("Error fetching interpretation:", err)
        setError("Error fetching interpretation")
        addToast("Error fetching interpretation", { type: "error" })
      } finally {
        setLoading(false)
      }
    }
    fetchInterpretation()
  }, [id, addToast])

  const handleGenerateInterpretation = async () => {
    setLoading(true)
    try {
      const response = await api.createInterpretation(id)
      console.log(response)
      if (response.data) {
        setInterpretation(response.data)
      } else {
        throw new Error("No data returned from createInterpretation")
      }
    } catch (err) {
      console.error("Error generating interpretation:", err)
      setError("Error generating interpretation")
      addToast(
        "Error generating interpretation, try detailed description of your dream",
        { type: "error" }
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      {!interpretation ? (
        <div>
          <Button
            onClick={handleGenerateInterpretation}
            className="w-full mt-10"
            color="success"
          >
            <span className="mr-2">
              <svg
                className=" dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"
                />
              </svg>
            </span>
            Interpret Dream
          </Button>
        </div>
      ) : (
        <div>
          <div className="my-4">
            <h2 className="text-slate-600 dark:text-white text-3xl font-bold mb-4">
              Interpretation
            </h2>
          </div>
          <Card className="my-3">
            <h5 className="text-2xl font-bold tracking-tight text-slate-600 dark:text-white">
              Meaning
            </h5>
            <p className="text-gray-600 dark:text-white">
              {interpretation.meaning}
            </p>
          </Card>

          <Card className="my-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col p-3">
                <h3 className="text-slate-600 dark:text-white text-2xl font-bold mb-1">
                  Jungian Perspective
                </h3>
                <p className="text-gray-600 dark:text-white">
                  {interpretation.jungian_perspective}
                </p>
                <div className="my-1"></div>
              </div>
              <div className="hidden sm:flex flex-1">
                <div className=" min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
              </div>
              <hr className="sm:hidden my-1 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
              <div className="flex flex-col p-3">
                <h3 className="text-slate-600 dark:text-white text-2xl font-bold mb-1">
                  Freudian Perspective
                </h3>
                <p className="text-gray-600 dark:text-white">
                  {interpretation.freudian_perspective}
                </p>
              </div>
            </div>
          </Card>

          <Card className="my-3">
            <h3 className="text-slate-600 dark:text-white text-2xl font-bold mb-4">
              Reflection Questions
            </h3>
            {interpretation.questions && interpretation.questions.length > 0 ? (
              interpretation.questions.map((question, index) => (
                <div key={index}>
                  <h4 className="text-slate-600 dark:text-white font-semibold">
                    <li>{question}</li>
                  </h4>
                </div>
              ))
            ) : (
              <Alert color="warning" withBorderAccent>
                <span>
                  <span className="font-medium">Info alert!</span> No questions
                  available.
                </span>
              </Alert>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}

export default InterpretationView // Ensure this line is present
