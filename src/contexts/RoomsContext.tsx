import {
  Room,
  RoomWithOptionalAvaibility,
  RoomsContextProps,
  CreateRoomResponse,
  UpdateRoomResponse,
  RoomsResponse,
  RoomWithoutId,
  RoomsContextType,
} from '@/@types/room'
import { api } from '@/lib/axios'
import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

export const RoomsContext = createContext({} as RoomsContextType)

export function RoomsContextProvider({ children }: RoomsContextProps) {
  const [rooms, setRooms] = useState<Room[]>([])
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
    try {
      await api.delete(`/rooms/${id}`)

      setRooms((state) => state.filter((room) => room.id !== id))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.error

        return new Error(errorMessage)
      } else if (error instanceof Error) {
        return error
      }
    }
  }

  async function fetchRooms() {
    const { data } = await api.get<RoomsResponse>('/rooms')
    setRoomsValues(data.rooms)
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
      value={{
        rooms,
        setRoomsValues,
        createRoom,
        updateRoom,
        deleteRoom,
        openToast,
        closeToast,
        toastTrigger,
        fetchRooms,
      }}
    >
      {children}
    </RoomsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRooms = () => {
  return useContext(RoomsContext)
}
