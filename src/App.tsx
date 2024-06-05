import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { RoomsContextProvider } from './contexts/RoomsContext'
import { GuestsContextProvider } from './contexts/GuestsContext'
import { ReservationsContextProvider } from './contexts/ReservationsContext'

export function App() {
  return (
    <>
      <ReservationsContextProvider>
        <RoomsContextProvider>
          <GuestsContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </GuestsContextProvider>
        </RoomsContextProvider>
      </ReservationsContextProvider>
    </>
  )
}
