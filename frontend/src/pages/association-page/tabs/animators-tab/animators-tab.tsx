import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import AnimatorsTabDataWrapper from './animators-data-wrapper'

const AssocAnimatorsTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};
  return (
    <>
        <TabHeader student={association} title = 'Éspace association' subTitle='Séances' description="Récapitulatif des séances réalisées par chacun des animateurs participants"/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <AnimatorsTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocAnimatorsTab