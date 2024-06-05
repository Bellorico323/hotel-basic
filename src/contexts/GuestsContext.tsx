import {
  GuestsContextType,
  GuestsContextProps,
  Guest,
  GuestWithoutId,
  CreateGuestResponse,
  UpdateGuestResponse,
  GuestsResponse,
} from '@/@types/guest'
import { api } from '@/lib/axios'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

export const GuestsContext = createContext({} as GuestsContextType)

export function GuestsContextProvider({ children }: GuestsContextProps) {
  const [guests, setGuests] = useState<Guest[]>([])
  const [toastTrigger, setToastTrigger] = useState(false)

  function openToast() {
    setToastTrigger(true)

    setTimeout(() => {
      setToastTrigger(false)
    }, 2000)
  }

  function closeToast() {
    setToastTrigger(false)
  }

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
    try {
      await api.delete(`/guests/${id}`)

      setGuests((state) => state.filter((guest) => guest.id !== id))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error

        return new Error(errorMessage)
      } else if (error instanceof Error) {
        return error
      }
    }
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
      value={{
        guests,
        setGuestsValues,
        createGuest,
        updateGuest,
        deleteGuest,
        openToast,
        closeToast,
        toastTrigger,
      }}
    >
      {children}
    </GuestsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGuests = () => {
  return useContext(GuestsContext)
}
