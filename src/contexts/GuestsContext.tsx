import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface Guest {
  id: string
  name: string
  email: string
  phone: string
}

interface GuestsResponse {
  guests: Guest[]
}

interface CreateGuestResponse {
  data: {
    newGuest: Guest
  }
}

interface UpdateGuestResponse {
  data: {
    updatedGuest: Guest
  }
}

interface GuestsContextProps {
  children: ReactNode
}

type GuestWithoutId = Omit<Guest, 'id'>

interface GuestsContextType {
  guests: Guest[]
  setGuestsValues(guests: Guest[]): void
  createGuest(data: GuestWithoutId): void
  updateGuest(data: Guest): void
  deleteGuest(id: string): void
}

export const GuestsContext = createContext({} as GuestsContextType)

export function GuestsContextProvider({ children }: GuestsContextProps) {
  const [guests, setGuests] = useState<Guest[]>([])

  function setGuestsValues(guests: Guest[]) {
    setGuests(guests)
  }

  async function createGuest(data: GuestWithoutId) {
    const response = await api.post<GuestWithoutId, CreateGuestResponse>(
      '/guests',
      data,
    )

    const guest = response.data.newGuest

    setGuests((state) => [guest, ...state])
  }

  async function updateGuest(data: Guest) {
    const response = await api.put<GuestWithoutId, UpdateGuestResponse>(
      `/guests/${data.id}`,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    )

    const updatedGuest = response.data.updatedGuest

    setGuests((state) =>
      state.map((guest) => {
        if (guest.id === updatedGuest.id) {
          return updatedGuest
        } else {
          return guest
        }
      }),
    )
  }

  async function deleteGuest(id: string) {
    await api.delete(`/guests/${id}`)

    setGuests((state) => state.filter((guest) => guest.id !== id))
  }

  useEffect(() => {
    async function getGuests() {
      const { data } = await api.get<GuestsResponse>('/guests')
      setGuestsValues(data.guests)
    }

    getGuests()
  }, [])

  return (
    <GuestsContext.Provider
      value={{ guests, setGuestsValues, createGuest, updateGuest, deleteGuest }}
    >
      {children}
    </GuestsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGuests = () => {
  return useContext(GuestsContext)
}
