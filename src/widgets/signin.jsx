import { useState } from "react"
import { Card, TextInput, Label, Button } from "flowbite-react"
import useUser from "../hooks/useUser"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"

export default function SigninWidget() {
  const { addToast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useUser()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password) {
      addToast("All fields are required", "danger")
      return false
    }
    return true
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const { data, error, status } = await Api.login(email, password)

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
    } else if (status === 200 || status === 201) {
      setUser(data.user)
      addToast("Signin successful!", "success")
      navigate("/dreams")
    } else {
      addToast("An unexpected error occurred", "danger")
    }
  }

  return (
    <Card className="max-w-sm mx-auto">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Sign In
      </h5>
      <form className="flex flex-col gap-4" onSubmit={handleSignin}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
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
        <Button type="submit">Sign In</Button>
      </form>
    </Card>
  )
}
