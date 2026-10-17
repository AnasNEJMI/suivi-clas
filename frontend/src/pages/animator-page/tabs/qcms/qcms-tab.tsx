import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import SectionError from '../../../section-error'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '../../../tab-header'
import AnimQcmsTabDataWrapper from './qcms-data-wrapper'
import QcmsTabSkeleton from './skeleton'

const AnimQcmsTab = () => {
    const {user : animator} = useRouteLoaderData('animator') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={animator} title = 'Éspace animateur' subTitle='QCM' description="Retrouvez les données des QCM soumis cette année"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<QcmsTabSkeleton/>}>
                <AnimQcmsTabDataWrapper animator = {animator}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AnimQcmsTab