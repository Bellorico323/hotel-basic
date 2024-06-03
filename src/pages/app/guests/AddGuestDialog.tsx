import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { useGuests } from '@/contexts/GuestsContext'
import { X } from 'lucide-react'

const CreateGuestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type CreateGuestInputs = z.infer<typeof CreateGuestSchema>

export function AddGuestDialog() {
  const { createGuest: createNewGuest } = useGuests()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<CreateGuestInputs>({
    resolver: zodResolver(CreateGuestSchema),
  })

  async function createGuest(data: CreateGuestInputs) {
    createNewGuest(data)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-zinc-100 bg-blue-500 py-2 px-4 rounded">
          Add Guest
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-800 m-0 text-lg font-medium">
            Criar Hóspede
          </Dialog.Title>
          <form onSubmit={handleSubmit(createGuest)}>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="name">
                Nome
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="text"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('name')}
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
                />
              </div>
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button
                className="text-zinc-100 bg-blue-500 py-2 px-4 rounded disabled:bg-blue-200"
                type="submit"
                disabled={isSubmitting}
              >
                Criar
              </button>
            </div>
          </form>
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
