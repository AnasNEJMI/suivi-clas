import { StrictMode } from 'react'
import { Outlet } from 'react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <Outlet/>
      </StrictMode>
    </QueryClientProvider>
  )
}

export default RootLayout