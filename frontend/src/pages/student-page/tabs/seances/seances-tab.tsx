import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../section-error'
import Skeleton from '../../bilans/bilans-skeleton'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../tab-header'
import SeancesTabDataWrapper from './seances-data-wrapper'

const SeancesTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};
  return (
    <>
        <TabHeader student={student} tabLabel='Séances' description='Retrouve tes dernières séances et poursuis ton apprentissage.'/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <SeancesTabDataWrapper student = {student}/>
                {/* <BilansSection student = {student}/> */}
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default SeancesTab