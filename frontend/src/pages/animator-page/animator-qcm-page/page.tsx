import { SiteHeader } from '../../../components/site-header'
import { useRouteLoaderData, useSearchParams } from 'react-router'
import type { Animator, AnimatorBaseDataResponse } from '@/api/animator/types'
import QcmGeneralInfoCard from './qcm-general-info-card'
import QcmCard from './qcm-card'

const AnimatorQcmPage = () => {
  const {animator, baseData} = useRouteLoaderData("animator") as {animator : Animator, baseData : AnimatorBaseDataResponse}
  
    const [searchParams] = useSearchParams();

    const scolarYearId = Number(searchParams.get('scolarYearId'));
    const classId = Number(searchParams.get('classId'));
    const studentId = Number(searchParams.get('studentId'));
    
    const lessonEvalParams = scolarYearId && classId && studentId
    ? {
      animatorId : animator.id,
      studentId,
    }
    : null;
    
    return (
    <>
        <SiteHeader title='Qcms'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-4 md:gap-6 md:py-6 px-6">
              <h1 className='font-semibold text-2xl md:text-3xl mt-4'>Résultats des qcms</h1>
              <div className='flex flex-col gap-6'>
                <QcmGeneralInfoCard
                  scolarYears={baseData.scolarYears}
                />
                {
                  lessonEvalParams &&
                  <QcmCard
                    params = {lessonEvalParams}
                  />
                }
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AnimatorQcmPage