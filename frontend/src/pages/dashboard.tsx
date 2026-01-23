import type { User } from '@/api/auth';
import { useAuth } from '@/contexts/auth/use-auth';
import DashboardLayout from '@/layouts/dashboard-layout'
import { Navigate, Outlet, useLoaderData } from 'react-router'

const Dashboard = () => {
  const loaderData = useLoaderData() as {user : User};
  const {user : contextUser, isAuthenticated} = useAuth();

  if(!loaderData?.user && !isAuthenticated){
    return <Navigate to='/login' replace/>;
  }

  const user = loaderData.user || contextUser;

  if(!user){
    return <Navigate to='/login' replace/>;
  }
  
  return (
    <DashboardLayout>
        <Outlet/>
    </DashboardLayout>
  )
}

export default Dashboard