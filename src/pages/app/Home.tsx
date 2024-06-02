import { Ticket, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main className="min-h-screen max-w-[1400px] m-auto w-full flex items-center justify-center">
      <div className="grid grid-cols-3 w-[900px] h-[400px] gap-8">
        <Link
          to={'/room'}
          className="bg-zinc-100 rounded hover:scale-105 hover:duration-500 transition ease-in-out overflow-hidden relative"
        >
          <img
            src="./room-img.avif"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-4 left-8">
            <p className="text-zinc-900 font-bold text-lg">Quartos</p>
          </div>
        </Link>
        <Link
          to={'/room'}
          className="bg-zinc-100 rounded hover:scale-105 hover:duration-500 transition ease-in-out flex items-center justify-center"
        >
          <div className="p-3 bg-zinc-300 rounded-full">
            <div className="p-3 bg-zinc-400 rounded-full">
              <User className="h-6 w-6" />
            </div>
          </div>
        </Link>
        <Link
          to={'/room'}
          className="bg-zinc-100 rounded hover:scale-105 hover:duration-500 transition ease-in-out flex items-center justify-center"
        >
          <div className="p-3 bg-zinc-300 rounded-full">
            <div className="p-3 bg-zinc-400 rounded-full">
              <Ticket className="h-6 w-6" />
            </div>
          </div>
        </Link>
      </div>
    </main>
  )
}
