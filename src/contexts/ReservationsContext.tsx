import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface Reservation {
  id: string
  roomId: string
  guestId: string
  checkIn: string
  checkOut: string
  createdAt: string
}

interface ReservationsResponse {
  reservations: Reservation[]
}

interface CreateReservationResponse {
  newReservation: Reservation
}

interface UpdateReservationResponse {
  updatedReservation: Reservation
}

interface ReservationsContextProps {
  children: ReactNode
}

type ReservationWithoutId = Omit<Reservation, 'id' | 'createdAt'>

interface ReservationsContextType {
  reservations: Reservation[]
  setReservationsValues(reservations: Reservation[]): void
  createReservation(data: ReservationWithoutId): Promise<void>
  updateReservation(data: Reservation): Promise<void>
  deleteReservation(id: string): Promise<void>
}

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
