import type { User } from '@/api/auth';
import Header from '@/components/header';
import BaseLayout from '@/layouts/base-layout';
import {useRouteLoaderData } from 'react-router'
import AssociationMemberHeroSection from './hero-section';
import { ErrorBoundary } from 'react-error-boundary';
import SectionError from '../student-page/section-error';
import BilansSkeleton from '../student-page/bilans/bilans-skeleton';
import { Suspense } from 'react';
import PresenceStatsSection from './presence-stats/presence-section';


const AssociationPage = () => {
  const {user} = useRouteLoaderData('association') as {user : User};
    
  
  return (
    <BaseLayout>
        <Header/>
        <AssociationMemberHeroSection assocMember={user}/>
        <ErrorBoundary fallback = {<SectionError desc = 'des bilans de présence'/>}>
            <Suspense fallback = {<BilansSkeleton/>}>
                <PresenceStatsSection/>
            </Suspense>
        </ErrorBoundary>
    </BaseLayout>
  )
}

export default AssociationPage