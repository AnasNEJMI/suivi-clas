import  { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useRouteLoaderData } from 'react-router'
import type { User } from '@/api/auth'
import TabHeader from '@/pages/tab-header'
import SectionError from '@/pages/section-error'
import { Skeleton } from '@/components/ui/skeleton'
import ProfileTabDataWrapper from './profile-data-wrapper'

const AssocProfileTab = () => {
    const {user : association} = useRouteLoaderData('association') as {user: User};
  return (
    <>
        <TabHeader student={association} title = 'Éspace association' subTitle='Profile' description="Récapitulatif de l'année scolaire."/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans'/>}>
            <Suspense fallback = {<Skeleton/>}>
                <ProfileTabDataWrapper association = {association}/>
            </Suspense>
        </ErrorBoundary>
    </>
  )
}

export default AssocProfileTab