import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react"
import CustomToast from "../components/toast"

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const toastTimers = useRef({})

  const addToast = useCallback((text, type = "success", timeout = 3000) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, text, type, timeout }])
    toastTimers.current[id] = setTimeout(() => {
      removeToast(id)
    }, timeout)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))

    if (toastTimers.current[id]) {
      clearTimeout(toastTimers.current[id])
      delete toastTimers.current[id]
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col-reverse items-end space-y-reverse space-y-2">
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            text={toast.text}
            type={toast.type}
            duration={toast.timeout}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
