import { StateCreator, create } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";


export interface AuthState {

  status: AuthStatus;
  token?: string;
  user?: User

  loginUser: (email: string, password: string) => Promise<void>
  checkAuthStatus: () => Promise<void>
  logoutUser: () => void

}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",

  loginUser: async (email, password) => {

    try {
      const { token, ...restUser } = await AuthService.login(email, password)
      set({ status: "authorized", user: {...restUser}, token })

    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined })
      throw 'Unauthorized'
    }

  },

  checkAuthStatus: async() => {

    try {
      const {token, email, id } = await AuthService.checkStatus()
      set({ status: "authorized", token, user: {
        email,
        id,
        password: email
      } })

    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined })
    }

  },

  logoutUser: () => set({ status: "unauthorized", token: undefined, user: undefined })

})

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      { name: "auth-store" }
    )  
  )
)