export interface Reservation {
  id: string
  roomId: string
  guestId: string
  checkIn: string
  checkOut: string
  createdAt: string
}

export interface ReservationsResponse {
  reservations: Reservation[]
}

export interface CreateReservationResponse {
  newReservation: Reservation
}

export interface UpdateReservationResponse {
  updatedReservation: Reservation
}

export interface ReservationsContextProps {
  children: ReactNode
}

export type ReservationWithoutId = Omit<Reservation, 'id' | 'createdAt'>

export interface ReservationsContextType {
  reservations: Reservation[]
  setReservationsValues(reservations: Reservation[]): void
  createReservation(data: ReservationWithoutId): Promise<void>
  updateReservation(data: Reservation): Promise<void>
  deleteReservation(id: string): Promise<void>
}
