import { SiteHeader } from '../../../components/site-header'
import { useRouteLoaderData, useSearchParams } from 'react-router'
import type { Animator, AnimatorBaseDataResponse} from '@/api/animator/types'
import BilansGeneralInfoCard from './seance/general-info-card'
import SeancePanel from './seance/seance-panel'
import { isValid, parse } from 'date-fns'

const AnimatorBilansPage = () => {
  const {animator, baseData} = useRouteLoaderData("animator") as {animator : Animator, baseData : AnimatorBaseDataResponse}
 
  const [searchParams] = useSearchParams();

  const scolarYearId = Number(searchParams.get('scolarYearId'));
  const classId = Number(searchParams.get('classId'));
  const dateStr = searchParams.get('date');

  const parsedDate = dateStr ? parse(dateStr, 'yyyy-MM-dd', new Date()) : null
  const validDate  = parsedDate && isValid(parsedDate) ? parsedDate : null

  const seanceParams = scolarYearId && classId && validDate
    ? {
      animatorId : animator.id,
      scolarYearId,
      classId,
      date : validDate,
    }
    : null;
  

  return (
    <>
        <SiteHeader title='Bilans'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-4 md:gap-6 md:py-6 px-6">
              <h1 className='font-semibold text-2xl md:text-3xl mt-4'>Soumettre un bilan de séance</h1>
              <div className='flex flex-col gap-6'>
                <BilansGeneralInfoCard
                  scolarYears={baseData.scolarYears}
                />
                {
                  seanceParams &&
                  <SeancePanel
                    params = {seanceParams}
                    lessonsByLevel={baseData.lessonsByLevel}
                    seanceDurations = {baseData.seanceDurations}
                  />
                }
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AnimatorBilansPage