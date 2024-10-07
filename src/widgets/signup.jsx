import { useState } from "react"
import { Card, TextInput, Label, Button } from "flowbite-react"
import useUser from "../hooks/useUser"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"

export default function SignupWidget() {
  const { addToast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const { setUser } = useUser()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password || !passwordConfirmation) {
      addToast("All fields are required", "danger")
      return false
    }
    if (password !== passwordConfirmation) {
      addToast("Passwords do not match", "danger")
      return false
    }
    return true
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const { data, error, status } = await Api.register(email, password)

    if (error) {
      const errorMessage =
        typeof error === "object" && error.message
          ? error.message
          : typeof error === "object"
          ? Object.entries(error)
              .map(
                ([key, value]) =>
                  `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
              )
              .join("; ")
          : "An unexpected error occurred"
      addToast(errorMessage, "danger")
    } else if (status === 201) {
      setUser(data.user)
      addToast("Signup successful!", "success")
      navigate("/dreams")
    } else {
      addToast("An unexpected error occurred", "danger")
    }
  }

  return (
    <Card className="max-w-sm mx-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Sign Up
      </h5>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="some@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirm-password" value="Confirm password" />
          </div>
          <TextInput
            id="confirm-password"
            type="password"
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <Label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </Label>
        </div>

        <Button type="submit">Sign Up</Button>
      </form>
    </Card>
  )
}
