import { StrictMode } from 'react'
import { Outlet } from 'react-router'
import {QueryClientProvider} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/contexts/auth/auth-provider';
import { queryClient } from '@/lib/query/client';

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <AuthProvider>
          <Outlet/>
          <Toaster />
        </AuthProvider>

      </StrictMode>
    </QueryClientProvider>
  )
}

export default RootLayout