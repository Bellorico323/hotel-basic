import {
  ReservationsContextType,
  ReservationsContextProps,
  Reservation,
  ReservationWithoutId,
  CreateReservationResponse,
  UpdateReservationResponse,
  ReservationsResponse,
} from '@/@types/reservation'
import { api } from '@/lib/axios'
import { createContext, useContext, useEffect, useState } from 'react'

export const ReservationsContext = createContext({} as ReservationsContextType)

export function ReservationsContextProvider({
  children,
}: ReservationsContextProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])

  function setReservationsValues(reservations: Reservation[]) {
    setReservations(reservations)
  }

  async function createReservation(data: ReservationWithoutId) {
    const response = await api.post<CreateReservationResponse>(
      '/reservations',
      data,
    )
    const { newReservation } = response.data
    setReservations((state) => [newReservation, ...state])
  }

  async function updateReservation(data: Reservation) {
    const response = await api.put<UpdateReservationResponse>(
      `/reservations/${data.id}`,
      data,
    )
    const { updatedReservation } = response.data
    setReservations((state) =>
      state.map((reservation) =>
        reservation.id === updatedReservation.id
          ? updatedReservation
          : reservation,
      ),
    )
  }

  async function deleteReservation(id: string) {
    await api.delete(`/reservations/${id}`)
    setReservations((state) =>
      state.filter((reservation) => reservation.id !== id),
    )
  }

  useEffect(() => {
    async function getReservations() {
      const { data } = await api.get<ReservationsResponse>('/reservations')
      setReservationsValues(data.reservations)
    }

    getReservations()
  }, [])

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        setReservationsValues,
        createReservation,
        updateReservation,
        deleteReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReservations = () => {
  return useContext(ReservationsContext)
}
