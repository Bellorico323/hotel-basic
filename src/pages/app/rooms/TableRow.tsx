import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import { Room } from '.'
import * as Popover from '@radix-ui/react-popover'

interface RoomsTableRowProps {
  room: Room
}

export function RoomsTableRow({ room }: RoomsTableRowProps) {
  return (
    <tr
      className="last:border-0 box-border border-b border-zinc-200"
      key={room.id}
    >
      <td className="text-start py-2 px-4 text-zinc-600">{room.id}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{room.number}</td>
      <td className="text-start py-2 px-4 text-zinc-600">
        {room.pricePerNight}
      </td>
      <td className="text-start py-2 px-4 text-zinc-600">{room.avaibility}</td>
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
                <button className="flex items-center justify-center gap-2 text-amber-500 hover:bg-amber-100 w-full p-1 rounded-md hover:text-amber-700 group">
                  <Pencil className="h-4 w-4 text-amber-500 group-hover:text-amber-700" />
                  Editar
                </button>
                <button className="flex items-center justify-center gap-2 text-rose-500 w-full hover:bg-rose-100 p-1 rounded-md hover:text-rose-700 group">
                  <Trash2 className="h-4 w-4 text-rose-500 group-hover:text-rose-700" />
                  Deletar
                </button>
              </div>
              <Popover.Arrow className="fill-zinc-300" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </td>
    </tr>
  )
}
