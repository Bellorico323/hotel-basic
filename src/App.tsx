import { RouterProvider } from 'react-router-dom'
import './global.css'
import { router } from './routes'
import { RoomsContextProvider } from './contexts/RoomsContext'

export function App() {
  return (
    <>
      <RoomsContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </RoomsContextProvider>
    </>
  )
}
