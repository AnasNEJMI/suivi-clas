import { SiteHeader } from '../../components/site-header'
import { useRouteLoaderData } from 'react-router'
import type { AnimatorBaseData } from '@/api/animator/types'

const AnimatorLessonDocuments = () => {
    const {baseData} = useRouteLoaderData("animator") as {baseData : AnimatorBaseData}
  return (
    <>
        <SiteHeader title='Leçons'/>
        <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <pre>{JSON.stringify(baseData, null, 2)}</pre>
                {/* <AddDocForm
                  lessons={loaderData.lessons}
                  docs={loaderData.docs}
                  subjects={loaderData.subjects}
                /> */}
            </div>
        </div>
        </div>
    </>
  )
}

export default AnimatorLessonDocuments