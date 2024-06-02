import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDown, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Select from '@radix-ui/react-select'

const CreateRoomSchema = z.object({
  number: z.string().transform(Number),
  pricePerNight: z.string().transform(Number),
  avaibility: z.string(),
})

type CreateRoomInputs = z.infer<typeof CreateRoomSchema>

export function AddRoomDialog() {
  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<CreateRoomInputs>({
    resolver: zodResolver(CreateRoomSchema),
  })

  async function createRoom(data: CreateRoomInputs) {
    await api.post('/rooms', data)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-zinc-100 bg-blue-500 py-2 px-4 rounded">
          Add Room
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0" />
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
            <fieldset className="mb-6 flex items-center gap-6 mt-6">
              <label className=" w-[90px] text-start" htmlFor="name">
                Disponibilidade
              </label>

              <Controller
                name="avaibility"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <Select.Root>
                      <Select.Trigger className="flex justify-between bg-zinc-100  p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 w-full">
                        <Select.Value placeholder="Selecione" />
                        <Select.Icon>
                          <ChevronDown />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Content className='overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"'>
                        <Select.Viewport>
                          <Select.Item value="teste">Teste</Select.Item>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Root>
                  )
                }}
              ></Controller>
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
