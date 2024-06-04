import { EllipsisVertical } from 'lucide-react'

export function GuestsSketonTableRow() {
  return (
    <tr className="last:border-0 box-border border-b border-zinc-200">
      <td className="text-start py-2 px-4 text-zinc-600">
        <div className="h-4 w-[300px] bg-zinc-300 rounded-2xl" />
      </td>
      <td className="text-start py-2 px-4 text-zinc-600">
        <div className="h-4 w-[100px] bg-zinc-300 rounded-2xl" />
      </td>
      <td className="text-start py-2 px-4 text-zinc-600">
        <div className="h-4 w-[140px] bg-zinc-300 rounded-2xl" />
      </td>
      <td className="text-start py-2 px-4 text-zinc-600">
        <div className="h-4 w-[140px] bg-zinc-300 rounded-2xl" />
      </td>
      <td className="text-center py-2 px-4 text-zinc-600 flex items-center justify-center">
        <button className="h-full w-full flex items-center justify-center">
          <EllipsisVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  )
}
