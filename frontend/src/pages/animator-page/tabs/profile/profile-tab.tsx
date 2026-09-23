import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import AnimProfileTabDataWrapper from './profile-data-wrapper'
import ProfileTabSkeleton from './skeleton'

const AnimProfileTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Profile' description="Récapitulatif de l'année."/>
        <ErrorBoundary fallback = {<SectionError desc = 'du profile'/>}>
            <Suspense fallback = {<ProfileTabSkeleton/>}>
                <AnimProfileTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimProfileTab