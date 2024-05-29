import { Sidebar } from '@/components/Sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-app">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
