import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/AppLayout'
import { Room } from './pages/app/rooms'
import { Guests } from './pages/app/guests'
import { Home } from './pages/app/Home'
import { Reservations } from './pages/app/reservations'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/room',
        element: <Room />,
      },
      {
        path: '/guest',
        element: <Guests />,
      },
      {
        path: '/reservations',
        element: <Reservations />,
      },
    ],
  },
])
