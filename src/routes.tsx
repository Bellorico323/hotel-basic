import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/app/Home'
import { AppLayout } from './pages/_layouts/AppLayout'
import { Room } from './pages/app/rooms'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room',
        element: <Room />,
      },
    ],
  },
])
