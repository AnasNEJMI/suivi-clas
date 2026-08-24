import type { Animator, AnimatorBaseDataResponse } from '@/api/animator/types'
import { SiteHeader } from '@/components/site-header'
import { useRouteLoaderData, useSearchParams } from 'react-router'
import LessonEvalGeneralInfoCard from './general-info-card'
import LessonEvalCard from './lesson-eval-card'

const AnimatorLessonEvaluationsPage = () => {
    const {animator, baseData} = useRouteLoaderData("animator") as {animator : Animator, baseData : AnimatorBaseDataResponse}
  
    const [searchParams] = useSearchParams();

    const scolarYearId = Number(searchParams.get('scolarYearId'));
    const classId = Number(searchParams.get('classId'));
    const studentId = Number(searchParams.get('studentId'));
    
    const lessonEvalParams = scolarYearId && classId && studentId
    ? {
      animatorId : animator.id,
      scolarYearId,
      classId,
      studentId,
    }
    : null;
    
    return (
    <>
        <SiteHeader title='Leçons'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-4 md:gap-6 md:py-6 px-6">
              <h1 className='font-semibold text-2xl md:text-3xl mt-4'>Évaluation du niveau de maîtrise des leçons</h1>
              <div className='flex flex-col gap-6'>
                <LessonEvalGeneralInfoCard
                  scolarYears={baseData.scolarYears}
                />
                {
                  lessonEvalParams &&
                  <LessonEvalCard
                    scolarYears = {baseData.scolarYears}
                    params = {lessonEvalParams}
                    lessonsByLevel={baseData.lessonsByLevel}
                  />
                }
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AnimatorLessonEvaluationsPage