import RecentlyAddedBilans from '@/components/adminboard/recently-added-bilans'
import { SiteHeader } from '../../components/site-header'
import AddBilanForm from '@/components/adminboard/add-bilan-form'
import type { User } from '@/api/auth'
import type { Bilan, Lesson } from '@/api/admin'
import { useRouteLoaderData } from 'react-router'

const AdminboardBilans = () => {
  const loaderData = useRouteLoaderData("admin") as {users : User[], bilans : Bilan[],lessons : Lesson[], subjects : string[]}
  
  
  return (
    <>
        <SiteHeader title='Bilans'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 checkered-bg">
              <div className="min-h-svh w-full p-6">
                  <RecentlyAddedBilans
                    bilans = {loaderData.bilans}
                  />
                  <div className='flex flex-col lg:flex-row gap-6 mt-12'>
                    <AddBilanForm
                      className='flex-1'
                      users={loaderData.users}
                      lessons={loaderData.lessons}
                      subjects={loaderData.subjects}
                    />
                    <div className='flex-1 bg-lime-300 h-40'></div>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default AdminboardBilans