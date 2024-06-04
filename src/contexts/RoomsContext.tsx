import { api } from '@/lib/axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

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

interface RoomsResponse {
  rooms: Room[]
}

interface CreateRoomResponse {
  data: {
    newRoom: Room
  }
}

interface UpdateRoomResponse {
  data: {
    updatedRoom: Room
  }
}

interface RoomsContextProps {
  children: ReactNode
}

type RoomWithoutId = Omit<Room, 'id'>

interface RoomsContextType {
  rooms: Room[]
  setRoomsValues(rooms: Room[]): void
  createRoom(data: RoomWithoutId): void
  updateRoom(data: RoomWithOptionalAvaibility): void
  deleteRoom(id: string): void
}

export const RoomsContext = createContext({} as RoomsContextType)

export function RoomsContextProvider({ children }: RoomsContextProps) {
  const [rooms, setRooms] = useState<Room[]>([])

  function setRoomsValues(rooms: Room[]) {
    setRooms(rooms)
  }

  async function createRoom(data: RoomWithoutId) {
    const response = await api.post<RoomWithoutId, CreateRoomResponse>(
      '/rooms',
      data,
    )

    const room = response.data.newRoom

    setRooms((state) => [room, ...state])
  }

  async function updateRoom(data: RoomWithOptionalAvaibility) {
    const response = await api.put<RoomWithoutId, UpdateRoomResponse>(
      `/rooms/${data.id}`,
      {
        number: data.number,
        pricePerNight: data.pricePerNight,
        avaibility: data.avaibility,
      },
    )

    const updatedRoom = response.data.updatedRoom

    setRooms((state) =>
      state.map((room) => {
        if (room.id === updatedRoom.id) {
          return updatedRoom
        } else {
          return room
        }
      }),
    )
  }

  async function deleteRoom(id: string) {
    await api.delete(`/rooms/${id}`)

    setRooms((state) => state.filter((room) => room.id !== id))
  }

  useEffect(() => {
    async function getRooms() {
      const { data } = await api.get<RoomsResponse>('/rooms')
      setRoomsValues(data.rooms)
    }

    getRooms()
  }, [])

  return (
    <RoomsContext.Provider
      value={{ rooms, setRoomsValues, createRoom, updateRoom, deleteRoom }}
    >
      {children}
    </RoomsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRooms = () => {
  return useContext(RoomsContext)
}
