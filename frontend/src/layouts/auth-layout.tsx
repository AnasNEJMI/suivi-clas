import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/auth/use-auth';
import AppLoader from '@/pages/app-loader';
import { Outlet } from 'react-router'

const AuthLayout = () => {
  const {isLoading} = useAuth();

  if(isLoading){
    return (
      <AppLoader/>
    )
  }

  return (
    <>
        <Outlet/>
        <Toaster />
    </>
  )
}

export default AuthLayout