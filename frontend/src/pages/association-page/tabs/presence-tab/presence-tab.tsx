import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import AssocPresenceTabDataWrapper from './presence-data-wrapper'
import AssocTabSkelton from '../../../universal-tab-skeleton'

const AssocPresenceTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='Présence' description="Récapitulatif de la présence des élèves lors des séances réalisées"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AssocTabSkelton/>}>
                <AssocPresenceTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocPresenceTab