import { ReservationsTableRow } from './TableRow'
import { Search } from 'lucide-react'
import { AddReservationDialog } from './AddReservationDialog'
import { useReservations } from '@/contexts/ReservationsContext'
import { ReservationsSkeletonTableRow } from './SkeletonTableRow'

export function Reservations() {
  const { reservations } = useReservations()

  return (
    <>
      <header className="pt-7 pb-4">
        <div className="flex gap-3 bg-zinc-100 w-[376px] p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-violet-500">
          <Search className="text-zinc-600" />
          <input
            type="text"
            className="bg-transparent w-full focus:outline-none text-zinc-600"
            placeholder="Search for reservations"
          />
        </div>
      </header>
      <main className="mt-2">
        <h2 className="text-sm text-zinc-700">Reservas</h2>
        <div className="flex p-5 justify-end pr-8">
          <AddReservationDialog />
        </div>
        <div className="pr-8">
          <div className="border border-zinc-200 rounded">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-100 box-border border-b border-zinc-200">
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm w-[346px]">
                    Id
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Quarto
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Hóspede
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Check-In
                  </th>
                  <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                    Check-Out
                  </th>
                  <th className="py-2 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0
                  ? Array.from({ length: 10 }).map((_item, index) => (
                      <ReservationsSkeletonTableRow key={index} />
                    ))
                  : reservations.map((reservation) => (
                      <ReservationsTableRow
                        key={reservation.id}
                        reservation={reservation}
                      />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
