import { GuestsTableRow } from './TableRow'
import { AddGuestDialog } from './AddGuestDialog'
import { useGuests } from '@/contexts/GuestsContext'
import { GuestsSkeletonTableRow } from './SkeletonTableRow'
import * as Toast from '@radix-ui/react-toast'

export function Guests() {
  const { guests, closeToast, toastTrigger } = useGuests()

  return (
    <>
      <Toast.Provider>
        <section className="h-full relative">
          <header className="pt-7 pb-4">
            <Toast.Root
              open={toastTrigger}
              className="bg-red-100 rounded-md  p-[15px] flex gap-5  border border-red-700 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide"
            >
              <div className="col-span1">
                <Toast.Title asChild>
                  <strong className="font-semibold text-lg text-red-950">
                    Alerta
                  </strong>
                </Toast.Title>
                <Toast.Description asChild>
                  <p className="test-md text-red-800">
                    Hospéde sendo usado em reservas.
                  </p>
                </Toast.Description>
              </div>
              <div className="flex items-end justify-center">
                <Toast.Action altText="da" />
                <Toast.Close asChild onClick={() => closeToast()}>
                  <button className="py-1 px-2  rounded bg-red-900 text-white font-semibold">
                    Fechar
                  </button>
                </Toast.Close>
              </div>
            </Toast.Root>
          </header>
          <main className="mt-2">
            <h2 className="text-2xl text-zinc-700">Hóspedes</h2>
            <div className="flex p-5 justify-end pr-8">
              <AddGuestDialog />
            </div>
            <div className="pr-8">
              <div className="border border-zinc-200 rounded">
                <table className="w-full">
                  <thead>
                    <tr className="bg-zinc-100 box-border border-b border-zinc-200">
                      <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm w-[346px]">
                        Id
                      </th>
                      <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                        Nome
                      </th>
                      <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                        Email
                      </th>
                      <th className="text-start py-2 px-4 text-zinc-500 font-semibold font-sm">
                        Telefone
                      </th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.length === 0
                      ? Array.from({ length: 10 }).map((_item, index) => (
                          <GuestsSkeletonTableRow key={index} />
                        ))
                      : guests.map((guest) => (
                          <GuestsTableRow key={guest.id} guest={guest} />
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
          <Toast.Viewport className="[--viewport-padding:_25px] fixed top-0 left-1/2 flex flex-col p-6 gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </section>
      </Toast.Provider>
    </>
  )
}
