import { StrictMode } from 'react'
import {QueryClientProvider} from '@tanstack/react-query'
import AuthProvider from '@/contexts/auth/auth-provider';
import { queryClient } from '@/lib/query/client';
import AuthLayout from './auth-layout';

const RootLayout = () => {

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthLayout/>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default RootLayout