import { create } from "zustand"

const useUser = create((set) => ({
  user: null,
  token: null,
  setUser: (newUser, token) => set(() => ({ user: newUser, token: token })),
  removeUser: () => set(() => ({ user: null, token: null })),
}))

export default useUser
