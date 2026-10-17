import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import AssocQCMTabDataWrapper from './qcm-data-wrapper'
import AssocTabSkelton from '../../../universal-tab-skeleton'

const AssocQcmTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='QCM' description="Récapitulatif de la complétion des QCM par les élèves"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AssocTabSkelton/>}>
                <AssocQCMTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocQcmTab