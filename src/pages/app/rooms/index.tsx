import { useEffect, useState } from 'react'

interface Room {
  id: string
  number: number
  pricePerNight: number
  avaibility: string
}

async function fetchRooms() {
  const response = await fetch('http://localhost:3333/rooms')
  const data = await response.json()
  return data.rooms
}

export function Room() {
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    async function getRooms() {
      const result = await fetchRooms()
      setRooms(result)
    }

    getRooms()
  }, [])

  return (
    <div>
      {rooms.map((room) => {
        return <p key={room.id}>{`Quarto: ${room.number}`}</p>
      })}
    </div>
  )
}
