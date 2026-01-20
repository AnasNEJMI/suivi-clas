import { Toaster } from '@/components/ui/sonner'
import { useAuth } from '@/contexts/auth/use-auth';
import LoadingSplashScreen from '@/pages/loading-splash-screen';
import { Outlet } from 'react-router'

const AuthLayout = () => {
  const {user,isLoading} = useAuth();

  if(isLoading){
    return (
      <LoadingSplashScreen/>
    )
  }

  console.log('finished loading, user is : ', user)
  return (
    <>
        <Outlet/>
        <Toaster />
    </>
  )
}

export default AuthLayout