import { StrictMode } from 'react'
import { Outlet } from 'react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/contexts/auth/auth-provider';

const queryClient = new QueryClient();

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