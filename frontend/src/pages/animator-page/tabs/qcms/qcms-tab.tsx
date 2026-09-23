import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import AnimQcmsTabDataWrapper from './qcms-data-wrapper'
import QcmsTabSkeleton from './skeleton'

const AnimQcmsTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='Profile' description="Récapitulatif de l'année."/>
        <ErrorBoundary fallback = {<SectionError desc = 'du profile'/>}>
            <Suspense fallback = {<QcmsTabSkeleton/>}>
                <AnimQcmsTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimQcmsTab