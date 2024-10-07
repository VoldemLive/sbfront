import { useState, useEffect } from "react"
import { Card, Toast, TextInput, Label, Button } from "flowbite-react"
import useUser from "../hooks/useUser"
import Api from "../API/api"
import { useNavigate } from "react-router-dom"
import { HiX } from "react-icons/hi"
import { useToast } from "../contexts/ToastContext"

export default function SigninWidget() {
  const { addToast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  })
  const { setUser } = useUser()
  const navigate = useNavigate()

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type })
  }

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prevToast) => ({ ...prevToast, show: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const validateForm = () => {
    if (!email || !password) {
      showToast("All fields are required")
      return false
    }
    return true
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const { data, error, status } = await Api.login(email, password)

    if (error) {
      if (typeof error === "object") {
        if (error.message) {
          addToast(error.message, "danger")
        } else {
          const errorMessages = Object.entries(error)
            .map(
              ([key, value]) =>
                `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
            )
            .join("; ")
          addToast(errorMessages, "danger")
        }
      } else {
        addToast("An unexpected error occurred", "danger")
      }
    } else if (status === 201) {
      setUser(data.user)
      addToast("Signin successful!", "success")
      setTimeout(() => navigate("/dreams"), 1500)
    } else {
      addToast("An unexpected error occurred", "danger")
    }
  }

  return (
    <>
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
      {toast.show && (
        <Toast className="fixed bottom-5 right-5">
          <div
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              toast.type === "error"
                ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
            }`}
          >
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <Toast.Toggle
            onDismiss={() =>
              setToast((prevToast) => ({ ...prevToast, show: false }))
            }
          />
        </Toast>
      )}
    </>
  )
}
