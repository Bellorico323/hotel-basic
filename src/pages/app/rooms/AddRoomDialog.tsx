import { useRooms } from '@/contexts/RoomsContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CreateRoomSchema = z.object({
  number: z.string().transform(Number),
  pricePerNight: z.string().transform(Number),
  avaibility: z.string().default('available'),
})

type CreateRoomInputs = z.infer<typeof CreateRoomSchema>

export function AddRoomDialog() {
  const [modalState, setModalState] = useState(false)

  const { createRoom: createNewRoom } = useRooms()

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateRoomInputs>({
    resolver: zodResolver(CreateRoomSchema),
  })

  async function createRoom(data: CreateRoomInputs) {
    createNewRoom(data)

    setModalState(false)
    reset()
  }

  return (
    <Dialog.Root open={modalState}>
      <Dialog.Trigger asChild>
        <button
          className="text-zinc-100 bg-blue-500 py-2 px-4 rounded"
          onClick={() => setModalState(true)}
        >
          Criar Quarto
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0"
          onClick={() => setModalState(false)}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-800 m-0 text-lg font-medium">
            Criar Quarto
          </Dialog.Title>
          <form onSubmit={handleSubmit(createRoom)}>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className=" w-[90px] text-center" htmlFor="name">
                Número do quarto
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="number"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('number')}
                />
              </div>
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className=" w-[90px] text-center" htmlFor="name">
                Preço por noite
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="number"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('pricePerNight')}
                />
              </div>
            </fieldset>
            {/* <fieldset className="mb-6 flex items-center gap-6 mt-6">
              <label className=" w-[90px] text-start" htmlFor="name">
                Disponibilidade
              </label>

              <Controller
                name="avaibility"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <SelectInput
                      placeholder="Selecione"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectItem text="Disponível" value="available" />
                      <SelectItem text="Indisponível" value="unavailable" />
                    </SelectInput>
                  )
                }}
              ></Controller>
            </fieldset> */}
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
