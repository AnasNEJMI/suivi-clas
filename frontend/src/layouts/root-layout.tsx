import { StrictMode } from 'react'
import { Outlet } from 'react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <Outlet/>
        <Toaster />
      </StrictMode>
    </QueryClientProvider>
  )
}

export default RootLayout