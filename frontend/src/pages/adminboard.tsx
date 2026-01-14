import AdminboardLayout from '@/layouts/adminboard-layout'
import { Outlet } from 'react-router'

const Adminboard = () => {
  return (
    <AdminboardLayout>
        <Outlet/>
    </AdminboardLayout>
  )
}

export default Adminboard