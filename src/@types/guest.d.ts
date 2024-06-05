export interface Guest {
  id: string
  name: string
  email: string
  phone: string
}

export interface GuestsResponse {
  guests: Guest[]
}

export interface CreateGuestResponse {
  data: {
    newGuest: Guest
  }
}

export interface UpdateGuestResponse {
  data: {
    updatedGuest: Guest
  }
}

export interface GuestsContextProps {
  children: ReactNode
}

export type GuestWithoutId = Omit<Guest, 'id'>

export interface GuestsContextType {
  guests: Guest[]
  setGuestsValues(guests: Guest[]): void
  createGuest(data: GuestWithoutId): void
  updateGuest(data: Guest): void
  deleteGuest(id: string): void

  toastTrigger: boolean
  openToast(): void
  closeToast(): void
}
