import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import PresenceTabDataWrapper from './animators-data-wrapper'
import AssocTabSkelton from '../../../universal-tab-skeleton'

const AssocAnimatorsTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='Séances' description="Récapitulatif des séances réalisées par chacun des animateurs participants"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AssocTabSkelton/>}>
                <PresenceTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocAnimatorsTab