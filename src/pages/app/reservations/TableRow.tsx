import { EllipsisVertical } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { Reservation } from '@/contexts/ReservationsContext'
import { EditReservationDialog } from './EditReservationDialog'
import { DeleteReservationDialog } from './DeleteReservationDialog'
import { useRooms } from '@/contexts/RoomsContext'
import { useGuests } from '@/contexts/GuestsContext'

interface ReservationsTableRowProps {
  reservation: Reservation
}

export function ReservationsTableRow({
  reservation,
}: ReservationsTableRowProps) {
  const { rooms } = useRooms()
  const { guests } = useGuests()

  const room = rooms.find((room) => room.id === reservation.roomId)
  const guest = guests.find((guest) => guest.id === reservation.guestId)

  return (
    <tr
      className="last:border-0 box-border border-b border-zinc-200"
      key={reservation.id}
    >
      <td className="text-start py-2 px-4 text-zinc-600">{reservation.id}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{room?.number}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{guest?.name}</td>
      <td className="text-start py-2 px-4 text-zinc-600">
        {reservation.checkIn}
      </td>
      <td className="text-start py-2 px-4 text-zinc-600">
        {reservation.checkOut}
      </td>
      <td className="text-center py-2 px-4 text-zinc-600">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="h-full w-full flex items-center justify-center">
              <EllipsisVertical className="h-5 w-5" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="rounded w-[166px] py-2 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] border border-zinc-200">
              <div className="flex flex-col items-center justify-center p-2">
                <EditReservationDialog reservation={reservation} />
                <DeleteReservationDialog id={reservation.id} />
              </div>
              <Popover.Arrow className="fill-zinc-300" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </td>
    </tr>
  )
}
