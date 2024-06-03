import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { RoomsContextProvider } from './contexts/RoomsContext'
import { GuestsContextProvider } from './contexts/GuestsContext'

export function App() {
  return (
    <>
      <RoomsContextProvider>
        <GuestsContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </GuestsContextProvider>
      </RoomsContextProvider>
    </>
  )
}
