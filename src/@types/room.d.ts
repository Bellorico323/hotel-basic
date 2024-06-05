export interface Room {
  id: string
  number: number
  pricePerNight: number
  avaibility: string
}

export interface RoomWithOptionalAvaibility {
  id: string
  number: number
  pricePerNight: number
  avaibility?: string
}

export interface RoomsResponse {
  rooms: Room[]
}

export interface CreateRoomResponse {
  data: {
    newRoom: Room
  }
}

export interface UpdateRoomResponse {
  data: {
    updatedRoom: Room
  }
}

export interface RoomsContextProps {
  children: ReactNode
}

export type RoomWithoutId = Omit<Room, 'id'>

export interface RoomsContextType {
  rooms: Room[]
  setRoomsValues(rooms: Room[]): void
  createRoom(data: RoomWithoutId): void
  updateRoom(data: RoomWithOptionalAvaibility): void
  deleteRoom(id: string): Promise<Error | undefined>
  fetchRooms(): void

  toastTrigger: boolean
  openToast(): void
  closeToast(): void
}
