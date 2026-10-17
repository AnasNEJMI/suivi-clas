import  { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import AssocVisitTabDataWrapper from './visits-data-wrapper'
import AssocTabSkelton from '../../../universal-tab-skeleton'

const AssocVisitsTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};

    useEffect(() =>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='Visites' description="Récapitulatif des visites faites par les élèves et leurs parents de leur espace élève"/>
        <ErrorBoundary fallback = {<SectionError/>}>
            <Suspense fallback = {<AssocTabSkelton/>}>
                <AssocVisitTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocVisitsTab