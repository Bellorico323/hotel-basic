import { RoomsTableRow } from './TableRow'
import { Search } from 'lucide-react'
import { AddRoomDialog } from './AddRoomDialog'
import { useRooms } from '@/contexts/RoomsContext'

export function Room() {
  const { rooms } = useRooms()

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
        <h2 className="text-sm text-zinc-700">Quartos</h2>
        <div className="flex p-5 justify-end pr-8">
          <AddRoomDialog />
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
                  return <RoomsTableRow key={room.id} room={room} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
