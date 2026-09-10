import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import Skeleton from '../../bilans/bilans-skeleton'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import ProfileTabDataWrapper from './profile-data-wrapper'

const StudentProfileTab = () => {
    const {user : student} = useRouteLoaderData('student') as {user: User};
  return (
    <>
        <TabHeader student={student} title = 'Éspace élève' subTitle='Profile' description = "Les informations générales concernant ton profile."/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <ProfileTabDataWrapper student = {student}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default StudentProfileTab