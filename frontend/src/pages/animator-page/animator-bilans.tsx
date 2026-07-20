import { SiteHeader } from '../../components/site-header'
import { useRouteLoaderData } from 'react-router'
import type { AnimatorBaseData } from '@/api/animator/types'

const AnimatorBilans = () => {
  const {baseData} = useRouteLoaderData("animator") as {baseData : AnimatorBaseData}
  return (
    <>
        <SiteHeader title='Bilans'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="min-h-svh w-full p-6">
                  <pre>{JSON.stringify(baseData, null, 2)}</pre>
                  {/* <RecentlyAddedBilans
                    bilans = {loaderData.bilans}
                  />
                  <div className='flex flex-col lg:flex-row gap-6 mt-12'>
                    <AddBilanForm
                      className='flex-1'
                      users={loaderData.users}
                      lessons={loaderData.lessons}
                      subjects={loaderData.subjects}
                    />
                  </div> */}
              </div>
          </div>
        </div>
    </>
  )
}

export default AnimatorBilans