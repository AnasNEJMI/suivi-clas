import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/auth/use-auth';
import LoadingSplashScreen from '@/pages/loading-splash-screen';
import { Outlet } from 'react-router'

const AuthLayout = () => {
  const {isLoading} = useAuth();

  if(isLoading){
    return (
      <LoadingSplashScreen/>
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