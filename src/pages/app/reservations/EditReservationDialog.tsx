import { Reservation, useReservations } from '@/contexts/ReservationsContext'
import { useRooms } from '@/contexts/RoomsContext'
import { useGuests } from '@/contexts/GuestsContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, X } from 'lucide-react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { SelectInput } from '@/components/Select'
import { SelectItem } from '@/components/Select/SelectItem'

const EditReservationSchema = z.object({
  roomId: z.string(),
  guestId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
})

type EditReservationInputs = z.infer<typeof EditReservationSchema>

interface ReservationDialogProps {
  reservation: Reservation
}

export function EditReservationDialog({ reservation }: ReservationDialogProps) {
  const [modalState, setModalState] = useState(false)
  const { updateReservation } = useReservations()
  const { rooms } = useRooms()
  const { guests } = useGuests()

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting },
  } = useForm<EditReservationInputs>({
    resolver: zodResolver(EditReservationSchema),
    defaultValues: {
      roomId: reservation.roomId,
      guestId: reservation.guestId,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
    },
  })

  const reservationId = reservation.id

  async function editReservation(data: EditReservationInputs) {
    await updateReservation({
      id: reservationId,
      ...data,
      createdAt: '',
    })
    setModalState(false)
  }

  return (
    <Dialog.Root open={modalState} onOpenChange={setModalState}>
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
            Editar Reserva
          </Dialog.Title>
          <form onSubmit={handleSubmit(editReservation)}>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="roomId">
                Quarto
              </label>
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <SelectInput placeholder="Selecione o quarto" {...field}>
                    {rooms.map((room) => (
                      <SelectItem
                        key={room.id}
                        value={room.id}
                        text={room.number.toString()}
                      />
                    ))}
                  </SelectInput>
                )}
              />
            </fieldset>
            <fieldset className="mb-6 flex items-center gap-5 mt-6">
              <label className="w-[90px] text-center" htmlFor="guestId">
                Hóspede
              </label>
              <Controller
                name="guestId"
                control={control}
                render={({ field }) => (
                  <SelectInput placeholder="Selecione o hóspede" {...field}>
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
                  type="date"
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
                  type="date"
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
