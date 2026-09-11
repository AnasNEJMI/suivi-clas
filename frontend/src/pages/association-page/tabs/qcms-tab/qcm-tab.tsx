import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import AssocQCMTabDataWrapper from './qcm-data-wrapper'

const AssocQcmTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};
  return (
    <>
        <TabHeader student={association} title = 'Éspace association' subTitle='QCMs' description="Récapitulatif de la complétion des QCMs par les élèves"/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <AssocQCMTabDataWrapper/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocQcmTab