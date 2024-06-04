import logo from '@/assets/Logo.svg'
import { Bookmark, Users, BookOpenCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Sidebar() {
  return (
    <aside className="pt-7 px-3 w-full space-y-8">
      <Link className="w-full flex " to={'/'}>
        <img src={logo} alt="" className="object-cover" />
      </Link>

      <div className="block">
        <Link
          className="w-full flex items-center rounded-md hover:bg-blue-50 text-lg p-1 pl-5 gap-2 text-zinc-700 hover:text-blue-500"
          to={'/room'}
        >
          <Bookmark className="h-4 w-4" />
          Quartos
        </Link>
        <Link
          className="w-full flex items-center rounded-md hover:bg-blue-50 text-lg p-1 pl-5 gap-2 text-zinc-700 hover:text-blue-500"
          to={'/guest'}
        >
          <Users className="h-4 w-4" />
          Hóspedes
        </Link>
        <Link
          className="w-full flex items-center rounded-md hover:bg-blue-50 text-lg p-1 pl-5 gap-2 text-zinc-700 hover:text-blue-500"
          to={'/reservations'}
        >
          <BookOpenCheck className="h4 w-4" />
          Reservas
        </Link>
      </div>
    </aside>
  )
}
