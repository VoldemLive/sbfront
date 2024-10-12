import { useState } from "react"
import { Card, TextInput, Label, Button } from "flowbite-react"
import useUser from "../hooks/useUser"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import { useToast } from "../contexts/ToastContext"
import { Link } from "react-router-dom"

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
    <Card className="min-w-[320px] mx-auto bg-gradient-to-b from-purple-600 to-indigo-600 border-none">
      <h5 className="text-2xl font-bold tracking-tight text-white">Sign In</h5>
      <form className="flex flex-col gap-2" onSubmit={handleSignin}>
        <div className="flex flex-col gap-2">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="email"
                value="Your email"
              />
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
              <Label
                className="text-white"
                htmlFor="password"
                value="Your password"
              />
            </div>
            <TextInput
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full mt-4" color="dark" type="submit">
          Sign In
        </Button>
        <p className="text-center text-white mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-300 underline">
            Create one here.
          </Link>
        </p>
      </form>
    </Card>
  )
}
