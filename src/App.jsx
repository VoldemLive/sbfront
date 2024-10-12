import { useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ToastProvider } from "./contexts/ToastContext"
import useUser from "./hooks/useUser"
import Layout from "./pages/layout"
import Home from "./pages/home"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Dreams from "./pages/dreams"
import Dashboard from "./pages/dashboard"
import CreateDream from "./pages/createDream"
import DreamPage from "./pages/dream"
import DeletedDreams from "./pages/deletedDreams"
import LandingPage from "./pages/landing"

function App() {
  const location = useLocation()
  const { user, setUser, removeUser } = useUser()

  useEffect(() => {
    const userData = localStorage.getItem("userData")
    const token = localStorage.getItem("token")
    if (userData && token) {
      setUser(JSON.parse(userData), token)
    } else {
      removeUser()
    }
  }, [setUser, removeUser])

  return (
    <ToastProvider>
      <Routes location={location}>
        {user ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dreams />} />
            <Route path="/dreams" element={<Dreams />} />
            <Route path="/deleted-dreams" element={<DeletedDreams />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-dream" element={<CreateDream />} />
            <Route path="/edit-dream/:id" element={<CreateDream />} />
            <Route path="/dreams/:id" element={<DreamPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </ToastProvider>
  )
}

export default App
