import { StrictMode } from 'react'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <StrictMode>
      <Outlet/>
    </StrictMode>
  )
}

export default RootLayout