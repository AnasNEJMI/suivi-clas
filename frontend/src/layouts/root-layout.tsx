import { StrictMode, useEffect } from 'react'
import {QueryClientProvider} from '@tanstack/react-query'
import AuthProvider from '@/contexts/auth/auth-provider';
import { queryClient } from '@/lib/query/client';
import AuthLayout from './auth-layout';

const RootLayout = () => {

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      console.log('page show event :',event);
      // event.persisted is true if the page was loaded from the BFCache
      if (event.persisted) {
        // Force a reload to ensure the latest auth state is checked
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

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