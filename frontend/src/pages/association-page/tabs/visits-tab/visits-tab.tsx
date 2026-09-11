import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import AssocVisitTabDataWrapper from './visits-data-wrapper'

const AssocVisitsTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};
  return (
    <>
        <TabHeader student={association} title = 'Éspace association' subTitle='Visites' description="Récapitulatif des visites faites par les élèves et leurs parents de leur espace élève"/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <AssocVisitTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocVisitsTab