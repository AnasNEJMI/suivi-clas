import type { User } from '@/api/auth';
import { useAuth } from '@/contexts/auth/use-auth';
import AdminboardLayout from '@/layouts/adminboard-layout'
import { Navigate, Outlet, useLoaderData } from 'react-router'

const Adminboard = () => {
  const loaderData = useLoaderData() as {user : User};
  const {user : contextUser, isAuthenticated} = useAuth();

  if(!loaderData?.user && !isAuthenticated){
    return <Navigate to='/' replace/>;
  }

  const user = loaderData.user || contextUser;

  if(!user){
    return <Navigate to='/' replace/>;
  }

  return (
    <AdminboardLayout>
        <Outlet/>
    </AdminboardLayout>
  )
}

export default Adminboard