import type { Animator } from '@/api/animator/types';
import AdminboardLayout from '@/layouts/adminboard-layout'
import { Navigate, Outlet, useRouteLoaderData } from 'react-router'

const AnimatorPage = () => {
  const {animator} = useRouteLoaderData('animator') as {animator: Animator};
  if(!animator){
        return <Navigate to='/' replace/>;
  }

  return (
    <AdminboardLayout>
        <Outlet/>
    </AdminboardLayout>
  )
}

export default AnimatorPage