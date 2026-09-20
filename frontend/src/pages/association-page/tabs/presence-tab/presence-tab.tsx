import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import AssocPresenceTabDataWrapper from './presence-data-wrapper'

const AssocPresenceTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};
  return (
    <>
        <TabHeader user={association} title = 'Éspace association' subTitle='Présence' description="Récapitulatif de la présence des élèves lors des séances réalisées"/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <AssocPresenceTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocPresenceTab