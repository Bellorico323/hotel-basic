import { useGuests } from '@/contexts/GuestsContext'
import * as Dialog from '@radix-ui/react-dialog'
import { Trash2, X } from 'lucide-react'

interface GuestDialogProps {
  id: string
}

export function DeleteGuestDialog({ id }: GuestDialogProps) {
  const { deleteGuest } = useGuests()

  const guestId = id

  async function handleDeleteGuest(id: string) {
    deleteGuest(id)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center justify-center gap-2 text-rose-500 w-full hover:bg-rose-100 p-1 rounded-md hover:text-rose-700 group">
          <Trash2 className="h-4 w-4 text-rose-500 group-hover:text-rose-700" />
          Deletar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-800 m-0 text-lg font-medium">
            Deletar Hóspede
          </Dialog.Title>
          <div className="mt-5">
            <p>
              Essa ação irá deletar esse hóspede permanentemente, você tem
              certeza?
            </p>
          </div>

          <div className="mt-[25px] flex justify-end">
            <button
              className="text-zinc-100 bg-blue-500 py-2 px-4 rounded disabled:bg-blue-200"
              onClick={() => handleDeleteGuest(guestId)}
            >
              Deletar
            </button>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
