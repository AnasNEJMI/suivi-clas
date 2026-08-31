import { StrictMode} from 'react'
import {QueryClientProvider} from '@tanstack/react-query'
import AuthProvider from '@/contexts/auth/auth-provider';
import { queryClient } from '@/lib/query/client';
import AuthLayout from './auth-layout';
import { HelmetProvider } from 'react-helmet-async';

const RootLayout = () => {

  return (
    <StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthLayout/>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  )
}

export default RootLayout