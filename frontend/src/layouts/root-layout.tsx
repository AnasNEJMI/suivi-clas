import AuthProvider from '@/contexts/auth/auth-provider';
import AuthLayout from './auth-layout';
const RootLayout = () => {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  )
}

export default RootLayout