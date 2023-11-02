import { type StateCreator, create } from "zustand";
import { customSessionStorage } from "../storages/session-storage";
import { persist } from "zustand/middleware";
import { firebaseStorage } from "../storages/firebase-storage";


interface PersonState {
  firstName: string;
  lastName: string;

  
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeApi: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (value) => set(state => ({ firstName: value })),
  setLastName: (value) => set(state => ({ lastName: value })),
})




export const usePersonStore = create<PersonState & Actions>()(
  persist(
    storeApi, {
      name: 'person-storage',
      // storage: customSessionStorage,
      storage: firebaseStorage,
    }
  )
)