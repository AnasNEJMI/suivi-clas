import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import ProfileTabDataWrapper from './profile-data-wrapper'
import UniversalTabSkeleton from '@/pages/universal-tab-skeleton'

const StudentProfileTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={student} title = 'Éspace élève' subTitle='Profile' description = "Les informations générales concernant ton profile."/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<UniversalTabSkeleton/>}>
                <ProfileTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default StudentProfileTab