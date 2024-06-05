import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { z } from 'zod'
import { useReservations } from '@/contexts/ReservationsContext'
import { useRooms } from '@/contexts/RoomsContext'
import { useGuests } from '@/contexts/GuestsContext'
import { X } from 'lucide-react'
import { useState } from 'react'
import { SelectInput } from '@/components/Select'
import { SelectItem } from '@/components/Select/SelectItem'

const CreateReservationSchema = z.object({
  roomId: z.string(),
  guestId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
})

type CreateReservationInputs = z.infer<typeof CreateReservationSchema>

export function AddReservationDialog() {
  const [modalState, setModalState] = useState(false)
  const { createReservation: createNewReservation } = useReservations()
  const { rooms, fetchRooms } = useRooms()
  const { guests } = useGuests()

  const roomsWithoutUnavailable = rooms.filter((room) => {
    return room.avaibility !== 'unavailable'
  })

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateReservationInputs>({
    resolver: zodResolver(CreateReservationSchema),
  })

  async function createReservation(data: CreateReservationInputs) {
    await createNewReservation(data)
    await fetchRooms()
    setModalState(false)
    reset()
  }

  return (
    <Dialog.Root open={modalState} onOpenChange={setModalState}>
      <Dialog.Trigger asChild>
        <button
          className="text-zinc-100 bg-blue-500 py-2 px-4 rounded"
          onClick={() => setModalState(true)}
        >
          Adicionar Reserva
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/80 data-[state=open]:animate-overlayShow fixed inset-0"
          onClick={() => setModalState(false)}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-zinc-800 m-0 text-lg font-medium">
            Criar Reserva
          </Dialog.Title>
          <form onSubmit={handleSubmit(createReservation)}>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="roomId">
                Quarto
              </label>
              <Controller
                name="roomId"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => (
                  <SelectInput
                    placeholder="Selecione o quarto"
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    {roomsWithoutUnavailable.map((room) => (
                      <SelectItem
                        key={room.id}
                        value={room.id}
                        text={room.number.toString()}
                      />
                    ))}
                  </SelectInput>
                )}
              ></Controller>
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="guestId">
                Hóspede
              </label>
              <Controller
                name="guestId"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => (
                  <SelectInput
                    placeholder="Selecione o hóspede"
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    {guests.map((guest) => (
                      <SelectItem
                        key={guest.id}
                        value={guest.id}
                        text={guest.name}
                      />
                    ))}
                  </SelectInput>
                )}
              />
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="checkIn">
                Check-In
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="datetime-local"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('checkIn')}
                />
              </div>
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="checkOut">
                Check-Out
              </label>
              <div className="flex gap-3 bg-zinc-100 w-full p-2 rounded border border-zinc-200 group focus-within:ring-2 focus-within:ring-blue-500 flex-1">
                <input
                  type="datetime-local"
                  className="bg-transparent w-full focus:outline-none text-zinc-600"
                  {...register('checkOut')}
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
