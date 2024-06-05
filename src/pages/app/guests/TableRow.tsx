import { EllipsisVertical } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import { EditGuestDialog } from './EditGuestDialog'
import { DeleteGuestDialog } from './DeleteGuestDialog'
import { Guest } from '@/@types/guest'

interface GuestsTableRowProps {
  guest: Guest
}

export function GuestsTableRow({ guest }: GuestsTableRowProps) {
  return (
    <tr
      className="last:border-0 box-border border-b border-zinc-200"
      key={guest.id}
    >
      <td className="text-start py-2 px-4 text-zinc-600">{guest.id}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{guest.name}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{guest.email}</td>
      <td className="text-start py-2 px-4 text-zinc-600">{guest.phone}</td>
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
                <EditGuestDialog guest={guest} />
                <DeleteGuestDialog id={guest.id} />
              </div>
              <Popover.Arrow className="fill-zinc-300" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </td>
    </tr>
  )
}
