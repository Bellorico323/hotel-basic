import { EllipsisVertical, Search } from 'lucide-react'
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

  console.log(rooms)
  return (
    <>
      <header className="pt-7 pb-4">
        <div className="flex gap-3 bg-zinc-100 w-[376px] p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-violet-500">
          <Search className="text-zinc-600" />
          <input
            type="text"
            className="bg-transparent w-full focus:outline-none text-zinc-600"
            placeholder="Search for rooms and offers"
          />
        </div>
      </header>
      <main className="mt-2">
        <h2 className="text-sm text-zinc-700">Rooms</h2>
        <div className="flex p-5 justify-end pr-8">
          <button className="text-zinc-100 bg-blue-500 py-2 px-4 rounded">
            Add Room
          </button>
        </div>
        <div className="pr-8">
          <div className=" border border-zinc-200 rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-100 box-border border-b border-zinc-200">
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm w-[346px]">
                    Id
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Number
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Price per night
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Avaibility
                  </th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => {
                  return (
                    <tr
                      className="last:border-0 box-border border-b border-zinc-200"
                      key={room.id}
                    >
                      <td className="text-start py-2 px-4 text-zinc-600">
                        {room.id}
                      </td>
                      <td className="text-start py-2 px-4 text-zinc-600">
                        {room.number}
                      </td>
                      <td className="text-start py-2 px-4 text-zinc-600">
                        {room.pricePerNight}
                      </td>
                      <td className="text-start py-2 px-4 text-zinc-600">
                        {room.avaibility}
                      </td>
                      <td className="text-center py-2 px-4 text-zinc-600">
                        <button className="h-full w-full flex items-center justify-center">
                          <EllipsisVertical className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
