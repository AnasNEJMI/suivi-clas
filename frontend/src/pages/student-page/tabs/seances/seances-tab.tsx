import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import StudentSeancesTabDataWrapper from './seances-data-wrapper'
import UniversalTabSkeleton from '@/pages/universal-tab-skeleton'

const StudentSeancesTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={student} title = 'Éspace élève' subTitle='Séances' description='Retrouve tes dernières séances et poursuis ton apprentissage.'/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<UniversalTabSkeleton/>}>
                <StudentSeancesTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default StudentSeancesTab