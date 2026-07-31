import { SiteHeader } from '../../../components/site-header'
import { useRouteLoaderData } from 'react-router'
import type { Animator, AnimatorBaseDataResponse, SeanceEntry} from '@/api/animator/types'
import { useState } from 'react'
import SeanceForm from './seance-form'
import BilansForm from './bilans-form'

const AnimatorBilansPage = () => {
  const {animator, baseData} = useRouteLoaderData("animator") as {animator : Animator, baseData : AnimatorBaseDataResponse}
  const [isFetchingSeance, setIsFetchingSeance] = useState(false)
  const [currentSeance, setCurrentSeance] = useState<SeanceEntry | null>(null);
  const [isSubmittingSeance, setIsSubmittingSeance] = useState(false);
  const [isDeletingSeance, setIsDeletingSeance] = useState(false);
  const [isGeneralInfoFormEnabled, setIsGeneralInfoFormEnabled] = useState(true);

  return (
    <>
        <SiteHeader title='Bilans'/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
              <h1 className='font-semibold text-3xl md:text-4xl mt-4'>Soumettre un bilan de séance</h1>
              <div className='mt-12'>
                <SeanceForm
                  isGeneralInfoFormEnabled = {isGeneralInfoFormEnabled}
                  setIsGeneralInfoFormEnabled = {setIsGeneralInfoFormEnabled}
                  animatorId = {animator.id}
                  scolarYears = {baseData.scolarYears}
                  isDeletingSeance = {isDeletingSeance}
                  setIsDeletingSeance = {setIsDeletingSeance}
                  isSubmittingSeance = {isSubmittingSeance}
                  setIsSubmittingSeance = {setIsSubmittingSeance}
                  isFetchingSeance = {isFetchingSeance}
                  setIsFetchingSeance = {setIsFetchingSeance}
                  currentSeance={currentSeance}
                  setCurrentSeance={setCurrentSeance}
                  />
                {/* <SeanceForm
                  className='mt-6'
                  animatorId = {animator.id}
                  isDeletingSeance = {isDeletingSeance}
                  setIsDeletingSeance = {setIsDeletingSeance}
                  isSubmittingSeance = {isSubmittingSeance}
                  setIsSubmittingSeance = {setIsSubmittingSeance}
                  currentSeance = {currentSeance}
                  setCurrentSeance = {setCurrentSeance}
                  /> */}
                <BilansForm
                  lessonsByLevel = {baseData.lessonsByLevel}
                  isGeneralInfoFormEnabled = {isGeneralInfoFormEnabled}
                  animatorId = {animator.id}
                  scolarYears = {baseData.scolarYears}
                  isDeletingSeance = {isDeletingSeance}
                  isSubmittingSeance = {isSubmittingSeance}
                  isFetchingSeance = {isFetchingSeance}
                  currentSeance={currentSeance}
                  setCurrentSeance={setCurrentSeance}
                />
                {/* <div className=' flex justify-between items-center'>
                  <h2 className='text-lg md:text-xl font-bold'>Année scolaire</h2>
                  {
                      baseData.scolarYears.length > 0 &&
                      <ScolarYearDropdown scolarYears = {baseData.scolarYears} selectedValue={selectedScolarYear.label} onValueChange = {setSelectedScolarYear}/>
                  }
                </div>
                <div className=' flex justify-between items-center mt-4'>
                  <h2 className='text-lg md:text-xl font-bold'>Date</h2>
                  {
                      baseData.scolarYears.length > 0 &&
                      <ScolarYearDropdown scolarYears = {baseData.scolarYears} selectedValue={selectedScolarYear.label} onValueChange = {setSelectedScolarYear}/>
                  }
                </div> */}
              </div>
              {/* <AnimatorBilanForm
                scolarYear={selectedScolarYear}
              /> */}
            </div>
              <div className="min-h-svh w-full p-6">
                  {/* <pre>{JSON.stringify(baseData, null, 2)}</pre> */}
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

export default AnimatorBilansPage