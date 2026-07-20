import { SiteHeader } from '../../components/site-header'
import { useRouteLoaderData } from 'react-router'
import type { AnimatorBaseData } from '@/api/animator/types'

const AnimatorSkills = () => {
  const {baseData} = useRouteLoaderData("animator") as {baseData : AnimatorBaseData}
  return (
    <>
        <SiteHeader title='Compétences'/>
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="min-h-svh w-full flex items-center justify-center p-6">
                    <pre>{JSON.stringify(baseData, null, 2)}</pre>
                    {/* <AddSkillForm
                      className=''
                      users={loaderData.users}
                      skills={loaderData.skills}
                    /> */}
              </div>
        </div>
        </div>
    </>
  )
}

export default AnimatorSkills