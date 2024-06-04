import { useGuests, Guest } from '@/contexts/GuestsContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateGuestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type CreateGuestInputs = z.infer<typeof CreateGuestSchema>

interface GuestDialogProps {
  guest: Guest
}

export function EditGuestDialog({ guest }: GuestDialogProps) {
  const [modalState, setModalState] = useState(false)
  const { updateGuest } = useGuests()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CreateGuestInputs>({
    resolver: zodResolver(CreateGuestSchema),
    defaultValues: {
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
    },
  })

  const guestId = guest.id

  async function editGuest(data: CreateGuestInputs) {
    updateGuest({
      id: guestId,
      ...data,
    })
    setModalState(false)
  }

  return (
    <Dialog.Root open={modalState}>
      <Dialog.Trigger asChild>
        <button
          className="flex items-center justify-center gap-2 text-amber-500 hover:bg-amber-100 w-full p-1 rounded-md hover:text-amber-700 group"
          onClick={() => setModalState(true)}
        >
          <Pencil className="h-4 w-4 text-amber-500 group-hover:text-amber-700" />
          Editar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setModalState(false)}
          className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0"
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-800 m-0 text-lg font-medium">
            Editar Hóspede
          </Dialog.Title>
          <form onSubmit={handleSubmit(editGuest)}>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="name">
                Nome
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="text"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('name')}
                  defaultValue={guest.name}
                />
              </div>
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="email">
                Email
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="email"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('email')}
                  defaultValue={guest.email}
                />
              </div>
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="phone">
                Telefone
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="text"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('phone')}
                  defaultValue={guest.phone}
                />
              </div>
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                className="text-zinc-100 bg-blue-500 py-2 px-4 rounded disabled:bg-blue-200"
                type="submit"
                disabled={isSubmitting}
              >
                Editar
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setModalState(false)}
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
